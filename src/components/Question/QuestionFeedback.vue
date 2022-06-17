<script setup>
import useEmitter from 'src/utils/useEmmiter';
import useGameManager from 'src/utils/useGameManager';
import ActionButton from '../ActionButton.vue';
import ButtonSmallVue from '../ButtonSmall.vue';

const gameManager = useGameManager()
const emitter = useEmitter()

function getHead(){
    let html = ''
    if (gameManager.questionResult.result==1) html += "תשובה נכונה!"
    else if (gameManager.questionResult.result==0) html += "תשובה לא נכונה"
    else html += "תשובה חלקית"
    html += '<br>'
    
    if (gameManager.questionResult.result>0) 
        html += "קיבלת " + Math.ceil(gameManager.question.nextscore*gameManager.questionResult.result) + " נקודות!" + '<br>'
    
    if (['options','mouseselect'].includes(gameManager.question.q.type))
        html += gameManager.question.answers.find(a=>a.selected==1)?.feedback_text.text ?? ''

    return html
}
function showMedia(){
    emitter.emit('SHOW_MEDIA',gameManager.question.q.feedback_general)
}
</script>


<template>
  <div v-if="gameManager.questionResult?.result != null">
    <div v-if="gameManager.questionResult.result == 1" v-append="gameManager.question.correct_image"></div>
    <div v-else v-append="gameManager.question.incorrect_image"></div>
    <div v-html="getHead()"></div>
    <div v-html="gameManager.question.q.feedback_general.text"></div>
    <div>
      <action-button v-if="'sentences' in gameManager.question.q.feedback_general" :border="true"  @click="showMedia">הצג בטקסט</action-button>  
    </div>
  </div>
</template>


<script>
export default {
  name: "QuestionFeedback",
};
</script>


<style>
#feedback_button_container {
  margin: 0.5em;
  text-align: center;
}
#feedback_button {
  padding: 0.2em 0.5em;
  border-radius: 999px;
  border: 1px solid cornflowerblue;
  color: cornflowerblue;
  background-color: aliceblue;
}
</style>