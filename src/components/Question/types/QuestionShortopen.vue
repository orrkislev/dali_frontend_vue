<script setup>
import { ref } from 'vue';
import useEmitter from '../../../utils/useEmmiter';
import useGameManager from '../../../utils/useGameManager';

const gameManager = useGameManager()
const emitter = useEmitter()

emitter.subscribe('LIFELINE_5050',lifeline_5050)
emitter.subscribe('CHECK_QUESTION', check)
emitter.subscribe('SHOW_ANSWER', showAnswer)

const answers = ref(Array(gameManager.question.q.num_correct_a).fill(""))
const inputColors = ref(Array(gameManager.question.q.num_correct_a).fill(null))


function showAnswer(){
    const correctAnswers = gameManager.question.answers.map(a => a.text.trim()).sort((a,b)=>Math.random()-0.5)
    for (let i=0;i<gameManager.question.q.num_correct_a;i++){
        answers.value[i] = correctAnswers[i]
    }
}

function lifeline_5050(){
    const correctAnswers = gameManager.question.answers.map(a => a.text.trim()).sort((a,b)=>Math.random()-0.5)
    for (let i=0;i<gameManager.question.q.num_correct_a/2;i++){
        answers.value[i] = correctAnswers[i]
    }
}

function check() {
    const availableAnswers = gameManager.question.answers.map(a => a.text.trim())
    const inputAnswers = answers.value.map(a => a.trim())
    let result = 0
    const answerlist = []
    inputAnswers.forEach((a,i) => {
        const answerListData = {
            id: '0', //gameManager.question.answers[i].id,
            res: false,
            text: a
        }
        if (availableAnswers.includes(a)) {
            availableAnswers.splice(availableAnswers.indexOf(a), 1)
            inputColors.value[i] = 'success'
            result++
            answerListData.res = true
            answerListData.id = gameManager.question.answers[i].id
        } else {
            inputColors.value[i] = 'fail'
        }

        answerlist[i] = answerListData
    })
    result /= inputAnswers.length

    gameManager.submitQuestion({result, answerlist})
}

</script>


<template>
    <div>
        <div v-for="index in gameManager.question.q.num_correct_a" class="question-section">
            <InputText type='text' v-model='answers[index - 1]' class="my-2" :disabled="inputColors[index-1] != null" 
                :class="{ 
                    'btnFull-correct': inputColors[index-1] == 'success',
                    'btnFull-wrong': inputColors[index-1] == 'fail', 
                }"/>
        </div>
    </div>
</template>


<script>
export default {
    name: 'QuestionShortopen'
};
</script>


<style>
</style>