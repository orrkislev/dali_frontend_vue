<script setup>
import { ref } from 'vue-demi';
import useGameManager from 'src/utils/useGameManager';
import useEmitter from 'src/utils/useEmmiter';
import useAPI from 'src/utils/useAPI';
import ActionButton from '../../ActionButton.vue';

const api = useAPI()
const gameManager = useGameManager()
const emitter = useEmitter()

emitter.subscribe('LIFELINE_STATS', lifeline_stats)
emitter.subscribe('LIFELINE_5050', lifeline_5050)
emitter.subscribe('CHECK_QUESTION', check)
emitter.subscribe('SHOW_ANSWER', showAnswer)

function showAnswer(params) {
  console.log('showAnswer at selection')
  gameManager.question.answers.forEach((a, i) => {
    select(i, a.correct);
  })
  if (params['check']) check()
}

async function lifeline_stats() {
  let newAnswers = [...gameManager.question.answers]
  const res = await api.post("quest/action/", { 'action': 'statistics', 'question_id': gameManager.question.q.id, })
  newAnswers.forEach(a => a.stats = Array(gameManager.question.options.length).fill(''))
  res.forEach(stat => {
    const optionIndex = gameManager.question.options.findIndex((o, i) => o.num == stat.select)
    newAnswers.find((a, i) => a.id == stat.answer_id).stats[optionIndex] = stat.count
  })
  gameManager.question.answers = newAnswers
}


function lifeline_5050() {
  const newAnswers = [...gameManager.question.answers]
  newAnswers.forEach((a,i) => a.answerIndex = i)
  newAnswers.sort(() => Math.random() - 0.5)
  for (let i = 0; i < newAnswers.length/2; i++) {
    select(newAnswers[i].answerIndex,newAnswers[i].correct)
  }
}

function check() {
  let newAnswers = [...gameManager.question.answers]
  let result = 0
  newAnswers.forEach((a, i) => {
    if (a.selected == a.correct) {
      a.result = 'success'
      result++
    } else {
      a.result = 'fail'
    }
    a.inactive = Array(gameManager.question.options.length).fill(true)
  })
  gameManager.question.answers = newAnswers
  result = result / gameManager.question.answers.length

  const answerlist = gameManager.question.answers.map(a => {
    return {
      id: a.id,
      res: a.result == 'success' ? 1 : 0,
      val: a.optionid
    }
  })

  gameManager.submitQuestion({ result, answerlist })
}

function select(answerIndex, val,id) {
  gameManager.question.answers[answerIndex].selected = val
  gameManager.question.answers[answerIndex].optionid = id
}

const options = ref([])
function getOptions(anserIndex){
  if (options.value[anserIndex]) return options.value[anserIndex]
  else{
    options.value[anserIndex] = [...gameManager.question.options].sort((a,b)=>Math.random()-0.5)
    //console.log(anserIndex)
    return options.value[anserIndex]
  }
}

function selectionText(option,answer) {
  let text = option.text
  if (answer.stats)
    text += "&nbsp; (" + answer.stats[option.num-1] + ")"
  return text
}
</script>


<template>
  <div class="flex flex-column gap05">
    <div v-for="(answer, answerIndex) in gameManager.question.answers" :key="answerIndex" class="question-section">
      <div style="flex: 1">
        <span v-html="answer.text"></span>
        <div class="flex gap05">
            <action-button v-for="(option, index) in getOptions(answerIndex)" :key="index" :border="true"
            :indicator="answer.selected == option.num ? answer.result : null"
            :inactive="answer.inactive ? answer.inactive[option.num] : null" :selected="answer.selected == option.num"
            class="flex1" @click="select(answerIndex, option.num, option.id)" v-html="selectionText(option,answer)"></action-button>
        </div>
        <div v-if="answer.result" v-bind:style="{ color: answer.result == 'success' ? 'green' : 'red' }"
          v-html="answer.feedback_text.text"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Question_selection", 
};
</script>


<style>
</style>