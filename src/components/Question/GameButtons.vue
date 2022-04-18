<script setup>
import { ref } from 'vue-demi';
import useEmitter from '../../utils/useEmmiter';
import useGameManager from '../../utils/useGameManager'
import useStoreSubscribe from '../../utils/useStoreSubscribe';
import ActionButton from '../ActionButton.vue';

const gameManager = useGameManager()
const emitter = useEmitter()

const canSubmit = ref(false)

useStoreSubscribe(gameManager,'question',(state)=>canSubmit.value = false)

function getNextQuestionText(){
    if (gameManager.progress.progress[0] == 'admin') return 'הצג מחדש'
    if (gameManager.question.question_num == gameManager.progress.progress.length) return 'סיום'
    return 'לשאלה הבאה'
}
function submitQuestion() {
    emitter.emit('CHECK_QUESTION')
}
function nextQuestion(){
    gameManager.nextQuestion()
}
</script>


<template>
<div>
    <action-button v-if="gameManager.questionResult?.result==null" :center="true" :main="true" @click="submitQuestion"> בדיקה </action-button>
    <action-button v-else :center="true" :main="true" @click="nextQuestion"> {{ getNextQuestionText() }} </action-button>
</div>
</template>


<script>
export default {
  components: { ActionButton },
name:'GameButtons'
};
</script>


<style>
</style>