<script setup>
import { ref } from 'vue-demi';
import useEmitter from 'src/utils/useEmmiter';
import useGameManager from 'src/utils/useGameManager'
import useStoreSubscribe from 'src/utils/useStoreSubscribe';
import ActionButton from '../ActionButton.vue';
import useAuth from '../../utils/useAuth';

const gameManager = useGameManager()
const emitter = useEmitter()
const auth = useAuth()

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
function showAnswer(){
    emitter.emit('SHOW_ANSWER')
}
function skipQuestion(){
    gameManager.lifeline_skip()
}
</script>


<template>
<div class="flex justify-content-between">
    <div class="flex ">
        <action-button v-if="gameManager.questionResult?.result==null" :center="true" :main="true" @click="submitQuestion"> בדיקה </action-button>
        <action-button v-else :center="true" :main="true" @click="nextQuestion"> {{ getNextQuestionText() }} </action-button>
        <action-button v-if="auth.isTeacherOrStaff && gameManager.extra.teacher" :center="true" :border="true" @click="showAnswer"> הצגת תשובה </action-button>
    </div>
    <!-- <div>
        <action-button v-if="auth.isTeacherOrStaff && gameManager.extra.teacher" :center="true" :border="true" @click="skipQuestion"> לשאלה הבאה </action-button>
    </div> -->
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