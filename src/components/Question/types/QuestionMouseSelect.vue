<script setup>
import { ref } from 'vue';
import { real_url } from '../../../utils/useAPI';
import useEmitter from '../../../utils/useEmmiter';
import useGameManager from '../../../utils/useGameManager';
import ActionButton from "../../ActionButton.vue";

const gameManager = useGameManager()
const emitter = useEmitter()

emitter.subscribe("LIFELINE_STATS", lifeline_stats)
emitter.subscribe("LIFELINE_5050", lifeline_5050)
emitter.subscribe("CHECK_QUESTION", check);
emitter.subscribe('SHOW_ANSWER', showAnswer)

const answers = ref([])
initAnswers()

function showAnswer() {
  gameManager.question.answers.forEach((answer, i) => {
    if (answer.correct) select(i, answer.correct);
  })
  check()
}

function initAnswers() {
    const abc = 'אבגדהוזחטיכ'
    const newAnswers = [...gameManager.question.answers]
    newAnswers.forEach((a, i) => {
        a.letter = abc[i]
        a.coords = a.text.split(',').map(c => parseInt(c));
        if (a.coords.length == 2) // Old questions did not have all values. Those are defaults to use:
        {
            a.coords[2] = 685;
            a.coords[3] = 310;
            a.coords[4] = 685;
        }
        const org_padding = (a.coords[4] - a.coords[2]) / 2;
        let x = (a.coords[0] - org_padding) / a.coords[2];
        let y = a.coords[1] / a.coords[3];
        x = Math.round(x * 100)
        y = Math.round(y * 100)
        x = Math.min(Math.max(x, 0), 92)
        y = Math.min(Math.max(y, 0), 92)
        a.posx = x.toString() + "%"
        a.posy = y.toString() + "%"
    })
    answers.value = newAnswers
}


function getMouseSelectImageSrc(){
    return real_url + '/static/' + gameManager.question.mouseselectmedia; //.join('')
}
function select(answerIndex, val) {
    answers.value.forEach(a => a.selected = 0)
    answers.value[answerIndex].selected = val
}
function lifeline_stats(){
    answers.value.forEach(answer => answer.stats = answer.chosen)
}
function lifeline_5050(){
    let grayableAnswers = answers.value.filter(a => a.correct != 1).sort(() => Math.random() - 0.5)
    grayableAnswers.slice(0, Math.floor(answers.value.length / 2)).forEach(a => a.inactive = true)
}
function check(){
    let result = 0
    answers.value.forEach((a, i) => {
        if (a.selected == a.correct) {
            result++
            a.result = 'success'
        } else {
            a.result = 'fail'
        }
        a.inactive = true
    })
    result = (result == this.answers.length) ? 1 : 0

    selectedAnswer = this.answers.find(a => a.selected == 1)
    let answerlist
    if (selectedAnswer) answerlist = [{ id: selectedAnswer.id, res: result }]
    else answerlist = [{ id: -1, res: result }]

    gameManager.submitQuestion({ result, answerlist })
}
</script>


<template>
    <div class="flex flex-column gap05">
        <div style='position: relative; margin-bottom: 3em;'>
            <img id='mouseselectimage' v-bind:src="getMouseSelectImageSrc()">
            <div class='mouseselectmarker' v-for="(answer, answerIndex) in answers" style='position:absolute;'
                v-bind:style="{ top: answer.posy, left: answer.posx }">
                {{ answer.letter }}
            </div>
        </div>
        <div v-for="(answer, answerIndex) in answers">
            <div class="flex1">
                <ActionButton :border="true" :indicator="answer.selected == 1 ? answer.result : null"
                    :inactive="answer.inactive" :selected="answer.selected == 1" @click="select(answerIndex, 1)">
                    {{ answer.letter }}
                    <small v-if="answer.stats">&nbsp; ({{ answer.stats }})</small>
                </ActionButton>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'QuestionMouseSelect'
};
</script>


<style>
</style>