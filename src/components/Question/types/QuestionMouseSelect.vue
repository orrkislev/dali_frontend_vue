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

//const answers = ref([])
initAnswers()

function showAnswer(params) {
  gameManager.question.answers.forEach((answer, i) => {
    if (answer.correct) select(i, answer.correct);
  })
  if (params['check']) check()
}

function initAnswers() {
    const abc = 'אבגדהוזחטיכ'
    let newAnswers = [...gameManager.question.answers]
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
    gameManager.question.answers = newAnswers
}


function getMouseSelectImageSrc(){
    return real_url + 'static/' + gameManager.question.mouseselectmedia; 
}
function select(answerIndex, val) {
    let newAnswers = [...gameManager.question.answers]
    newAnswers.forEach(a => a.selected = 0)
    newAnswers[answerIndex].selected = val
    gameManager.question.answers = newAnswers
    //answers.value.forEach(a => a.selected = 0)
    //answers.value[answerIndex].selected = val
}
function lifeline_stats(){
    let newAnswers = [...gameManager.question.answers];
    newAnswers.forEach((answer) => (answer.stats = answer.chosen));
    gameManager.question.answers = newAnswers;
    //gameManager.question.answers.value.forEach(answer => answer.stats = answer.chosen)
}
function lifeline_5050(){
    let newAnswers = [...gameManager.question.answers];
    let grayableAnswers = newAnswers
        .filter((a) => a.correct != 1)
        .sort(() => Math.random() - 0.5);
    grayableAnswers
        .slice(0, Math.floor(newAnswers.length / 2))
        .forEach((a) => (a.inactive = true));
    gameManager.question.answers = newAnswers;
    //let grayableAnswers = gameManager.question.answers.value.filter(a => a.correct != 1).sort(() => Math.random() - 0.5)
    //grayableAnswers.slice(0, Math.floor(answegameManager.question.answersrs.value.length / 2)).forEach(a => a.inactive = true)
}
function check(){
    let newAnswers = [...gameManager.question.answers];
    let result = 0
    newAnswers.forEach((a, i) => {
        if (a.selected == a.correct) {
            result++
            a.result = 'success'
        } else {
            a.result = 'fail'
        }
        a.inactive = true
    })
    gameManager.question.answers = newAnswers;
    result = result == gameManager.question.answers.length ? 1 : 0;

    //result = (result == this.answers.length) ? 1 : 0

    let answerlist = [];
    let selectedAnswer = gameManager.question.answers.find((a) => a.selected == 1);
    if (selectedAnswer) answerlist = [{ id: selectedAnswer.id, res: result }];

    //selectedAnswer = this.answers.find(a => a.selected == 1)
    //if (selectedAnswer) answerlist = [{ id: selectedAnswer.id, res: result }]
    //else answerlist = [{ id: -1, res: result }]

    gameManager.submitQuestion({ result, answerlist })
}
</script>


<template>
    <div class="flex flex-column gap05">
        <div style='position: relative; margin-bottom: 3em;'>
            <img id='mouseselectimage' v-bind:src="getMouseSelectImageSrc()">
            <div class='mouseselectmarker' v-for="(answer, answerIndex) in gameManager.question.answers" style='position:absolute;'
                v-bind:style="{ top: answer.posy, left: answer.posx }">
                {{ answer.letter }}
            </div>
        </div>
        <div v-for="(answer, answerIndex) in gameManager.question.answers" :key="answerIndex" class="question-section">
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
    components: { ActionButton },
    name: 'Question_mouseselect',
};
</script>


<style>
</style>