<script setup>
import useEmitter from 'src/utils/useEmmiter';
import useGameManager from 'src/utils/useGameManager';
import ActionButton from '../ActionButton.vue';
import AjaxViewer from '../AjaxViewer.vue';
import useBrowseManager from 'src/utils/useBrowseManager';
import useAuth from '../../utils/useAuth';

const gameManager = useGameManager()
const emitter = useEmitter()
const browseManager = useBrowseManager();
const auth = useAuth()

function getHead() {
  let html = ''
  let res_text = ''
  let res_class  = ''
  if (gameManager.questionResult.result == 1)
  {
    res_text = "תשובה נכונה!";
    res_class = 'rescorrect';
  }
  else if (gameManager.questionResult.result == 0)
  {
    res_text = "תשובה לא נכונה";
    res_class = 'resincorrect';
  }
  else
  {
    res_text = "תשובה חלקית";
    res_class = 'respartial';
  }
  html = '<span class=' + res_class + '> ' + res_text + '</span><br/>';
  if ((gameManager.questionResult.result > 0) && (gameManager.question.nextscore > 0))
    html += "<span class='p2k18pt'>קיבלת " + Math.ceil(gameManager.question.nextscore * gameManager.questionResult.result) + " נקודות!</span>" + '<br>'

  html += "<br/>"
    if (['options', 'mouseselect'].includes(gameManager.question.q.type))
    html += gameManager.question.answers.find(a => a.selected == 1)?.feedback_text.text ?? ''

  return html
}
function showMedia() {
  emitter.emit('SHOW_MEDIA', gameManager.question.q.feedback_general)
}
function showAnswer(){
    emitter.emit('SHOW_ANSWER',{'check':false})
}

</script>


<template>
  <div>
    <div v-if="gameManager.questionResult?.result != null" >
      <div class="justify-content-between" :class="[!browseManager.isMobile ? 'flex' : '']">
          <div>
              <div v-html="getHead()"></div>
              <div v-html="gameManager.question.q.feedback_general.text"></div>
              <action-button v-if="'sentences' in gameManager.question.q.feedback_general" :center="true" :border="true" :single="true" @click="showMedia">הצג בטקסט</action-button>
            <br/><br/>
            <action-button v-if="(auth.isStaff) || ((gameManager.isLashon) && (gameManager.questionResult.result !== 1))" :center="true" :border="true" :single="true" :main="true" @click="showAnswer"> הצגת תשובה </action-button>
          </div>
          <div>
            <AjaxViewer v-if="gameManager.questionResult.result == 1" :htmlWithScripts="gameManager.question.correct_image" />
            <AjaxViewer v-else :htmlWithScripts="gameManager.question.incorrect_image" />
        </div>
      </div>
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