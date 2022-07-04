<script setup>
import { ref } from 'vue-demi';
import useGameManager from 'src/utils/useGameManager';
import useEmitter from 'src/utils/useEmmiter';
import useAPI from 'src/utils/useAPI';
import ActionButton from '../../ActionButton.vue';

const api = useAPI()
const gameManager = useGameManager()
const emitter = useEmitter()

let answers = ref([...gameManager.question.answers])
let options = ref([...gameManager.question.options])


emitter.subscribe('LIFELINE_STATS',lifeline_stats)
emitter.subscribe('LIFELINE_5050',lifeline_5050)
emitter.subscribe('CHECK_QUESTION',check)
emitter.subscribe('SHOW_ANSWER', showAnswer)

function showAnswer(){
  console.log('showAnswer at selection')
    answers.value.forEach((a, i) => {
      select(i,a.correct);
    })
    check()
}

async function lifeline_stats(){
  let newAnswers = [...answers.value]
    const res = await api.post("/quest/action/", { 'action': 'statistics', 'question_id': gameManager.question.q.id, })
    newAnswers.forEach(a=>a.stats = Array(options.value.length).fill(''))
    res.forEach(stat => {
        const optionIndex = options.value.findIndex((o, i) => o.num == stat.select)
        newAnswers.find((a, i) => a.id == stat.answer_id).stats[optionIndex] = stat.count
    })
    answers.value = newAnswers
}


function lifeline_5050(){
  let newAnswers = [...answers.value]
    let newOptions = [...options.value]
    newAnswers.forEach(a=>{
        a.inactive = Array(newOptions.length).fill(null)
        let grayableOptionIndexes = []
        newOptions.forEach((option,optionIndex) => {
            if (option.num != a.correct) grayableOptionIndexes.push(optionIndex)
        })
        grayableOptionIndexes.sort(() => Math.random() - 0.5)
        grayableOptionIndexes.slice(0,Math.floor((newOptions.length-1) / 2)).forEach(optionIndex=>
            a.inactive[optionIndex] = true
        )
    })
    answers.value = newAnswers
    options.value = newOptions
}

function check(){
    let newAnswers = [...answers.value]
    let result = 0
    newAnswers.forEach((a, i) => {
        if (a.selected == a.correct) {
            a.result='success'
            result++
        } else {
            a.result='fail'
        }
        a.inactive = Array(options.value.length).fill(true)
    })
    answers.value = newAnswers
    result = result / answers.value.length

    const answerlist =  answers.value.map(a=>{
        return {
            id: a.id,
            res: a.result=='success' ? 1 : 0,
            val: a.selected
        }
    })

    gameManager.submitQuestion({result,answerlist})
}

function select(answerIndex, val) {
    let newAnswers = [...answers.value]
    newAnswers[answerIndex].selected = val
    answers.value = newAnswers
}

</script>


<template>
  <div class="flex-column gap05">
    <div v-for="(answer, answerIndex) in answers" :key="answerIndex">
      <div style="flex: 1">
        <span v-html="answer.text"></span>
        <div class="flex gap05">
          <action-button v-for="(option, index) in options" :key="index"
            :border="true"
            :indicator="answer.selected==option.num ? answer.result : null"
            :inactive="answer.inactive ? answer.inactive[option.num] : null"
            :selected="answer.selected==option.num"
            class="flex1"
            @click="select(answerIndex, option.num)"
          >
            {{ option.text }}
            <small v-if="answer.stats">&nbsp; ({{ answer.stats[index] }})</small>
          </action-button>
        </div>
        <div v-if="answer.result"
          v-bind:style="{ color: answer.result == 'success' ? 'green' : 'red' }"
          v-html="answer.feedback_text.text"
        ></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "QuestionSelection",
};
</script>


<style>
</style>