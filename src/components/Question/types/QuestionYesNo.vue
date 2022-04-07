<script setup>
import { ref } from 'vue-demi';
import useAPI from '../../../utils/useAPI';
import useEmitter from '../../../utils/useEmmiter';
import useGameManager from '../../../utils/useGameManager';

const gameManager = useGameManager()
const question = gameManager.question

let answers = ref([])

const emitter = useEmitter()
const api = useAPI()
emitter.on('LIFELINE_STATS', async ()=>{
    const res = await api.post("/quest/action/", { 'action': 'statistics', 'question_id': question.q.id })
    let newAnswers = [...answers.value]
    newAnswers.forEach(a=>a.stats = ['',''])
    res.forEach(stat => {
        newAnswers.find(a=>a.id == stat.answer_id).stats[Math.abs(stat.select_id-2)] = stat.count
    })
    this.answers = newAnswers
})
emitter.on('CHECK_QUESTION', ()=>{
    let newAnswers = [...this.answers]
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
    this.answers = newAnswers
    result = result / this.answers.length

    const answerlist =  this.answers.map(a=>{
        return {
            id: a.id,
            res: a.result=='success' ? 1 : 0,
            val: a.selected-2
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
        <div v-for="(answer,index) in answers" :key="index">
            {{ answer.text }}
            <div class='flex gap05'>
                <button v-for="val in [0,1]" class="flex1" :key="val" :border="true" :center="true"
                    :indicator="answer.selected==val ? answer.result : null"
                    :inactive="answer.inactive ? answer.inactive[val] : null"
                    :selected="answer.selected==val" 
                    @click="select(index,val)">
                    {{ val == 1 ? 'נכון' : 'לא נכון'}}
                    <small v-if="answer.stats">&nbsp;({{ answer.stats[val] }})</small>
                </button>
            </div>
            <div v-if="answer.result"
                v-bind:style="{color:answer.result=='success' ? 'green' : 'red'}" v-html="answer.feedback_text.text">
            </div>
        </div>
    </div>
</template>


<script>
export default {
name:'QuestionYesNo'
};
</script>


<style>
</style>