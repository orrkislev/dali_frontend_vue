<script setup>
// import { ref } from 'vue-demi';
import useAPI from 'src/utils/useAPI';
import useEmitter from 'src/utils/useEmmiter';
import useGameManager from 'src/utils/useGameManager';
import ActionButton from '../../ActionButton.vue';
// import useStoreSubscribe from 'src/utils/useStoreSubscribe';

const gameManager = useGameManager()
const api = useAPI()
const emitter = useEmitter()

// useStoreSubscribe(gameManager,'question',(state)=>answers.value = state.question.answers)
// const answers = ref(gameManager.question.answers)

emitter.subscribe('LIFELINE_STATS', lifeline_stats)
emitter.subscribe('CHECK_QUESTION', check)
emitter.subscribe('SHOW_ANSWER', showAnswer)

function showAnswer(){
    gameManager.question.answers.forEach((answer,i) => {
        select(i,answer.correct);
    })
    check()
}

async function lifeline_stats(){
    const res = await api.post("/quest/action/", { 'action': 'statistics', 'question_id': gameManager.question.q.id })
    let newAnswers = [...gameManager.question.answers]
    newAnswers.forEach(a=>a.stats = ['',''])
    res.forEach(stat => {
        newAnswers.find(a=>a.id == stat.answer_id).stats[Math.abs(stat.select_id-2)] = stat.count
    })
    gameManager.question.answers = newAnswers
}

function check(){
    let newAnswers = [...gameManager.question.answers]
    let result = 0
    newAnswers.forEach((a, i) => {
        if (a.selected == a.correct) {
            a.result='success'
            result++
        } else {
            a.result='fail'
        }
        a.inactive = [true,true]
    })
    gameManager.question.answers = newAnswers
    result = result / gameManager.question.answers.length

    const answerlist =  gameManager.question.answers.map(a=>{
        return {
            id: a.id,
            res: a.result=='success' ? 1 : 0,
            val: a.selected-2
        }
    })

    gameManager.submitQuestion({result,answerlist})
}

function select(answerIndex, val) {
    let newAnswers = [...gameManager.question.answers]
    newAnswers[answerIndex].selected = val
    gameManager.question.answers = newAnswers
}

</script>


<template>
    <div >
        <div v-for="(answer,index) in gameManager.question.answers" :key="index">
            <div class='flex-1'> {{ answer.text }} </div>
            <div class='flex gap05'>
                <action-button v-for="val in [0,1]" class="flex1" :key="val" :border="true" :center="true"
                    :indicator="answer.selected==val ? answer.result : null"
                    :inactive="answer.inactive ? answer.inactive[val] : null"
                    :selected="answer.selected==val" 
                    @click="select(index,val)">
                    {{ val == 1 ? 'נכון' : 'לא נכון'}}
                    <small v-if="answer.stats">&nbsp;({{ answer.stats[val] }})</small>
                </action-button>
            </div>
            <div v-if="answer.result"
                v-bind:style="{color:answer.result=='success' ? 'green' : 'red'}" v-html="answer.feedback_text.text">
            </div>
        </div>
    </div>
</template>


<script>
export default {
  components: { ActionButton },
name:'QuestionYesNo'
};
</script>


<style>
</style>