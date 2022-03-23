<script setup>
import { ref } from 'vue-demi';
import useGameManager from '../../../utils/useGameManager';
import useEmitter from '../../../utils/useEmmiter';
import useAPI from '../../../utils/useAPI';

const gameManager = useGameManager()
const question = gameManager.question

let answers = ref([])
let options = ref([])

if (question.answers) answers.value = [...question.answers]
if (question.options) options.value = [...question.options]

const emitter = useEmitter()
const api = useAPI()

emitter.on('LIFELINE_STATS',async ()=>{
    let newAnswers = [...answers.value]
    const res = await api.post("/quest/action/", { 'action': 'statistics', 'question_id': question.q.id, })
    newAnswers.forEach(a=>a.stats = Array(options.value.length).fill(''))
    res.forEach(stat => {
        const optionIndex = options.value.findIndex((o, i) => o.num == stat.select)
        newAnswers.find((a, i) => a.id == stat.answer_id).stats[optionIndex] = stat.count
    })
    answers.value = newAnswers
})

emitter.on('LIFELINE_5050',()=>{
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
    option.value = newOptions
})

emitter.on('CHECK_QUESTION',()=>{
    let newAnswers = [...answers.value]
    let result = 0
    newAnswers.forEach((a, i) => {
        if (a.selected == a.correct) {
            a.result='success'
            result++
        } else {
            a.result='fail'
        }
        a.inactive = Array(this.options.length).fill(true)
    })
    answers.value = newAnswers
    result = result / this.answers.length

    const answerlist =  this.answers.map(a=>{
        return {
            id: a.id,
            res: a.result=='success' ? 1 : 0,
            val: a.selected
        }
    })

    gameManager.submitQuestion({result,answerlist})
})

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
        <span v-append="answer.text"></span>
        <div class="flex gap05">
          <button v-for="(option, index) in options" :key="index"
            class="flex1"
            @click="select(answerIndex, option.num)"
          >
            [[ option.text ]]
            <small v-if="answer.stats">&nbsp; ([[ answer.stats[index] ]])</small>
          </button>
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