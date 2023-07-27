<script setup>
import useEmitter from 'src/utils/useEmmiter';
import GameTop from "../Question/GameTop.vue";
import GameButtons from "../Question/GameButtons.vue";
import GameLifelines from "../Question/GameLifelines.vue";
import GameMedia from "../Question/GameMedia.vue";
import GameProgress from "../Question/GameProgress.vue";
import QuestionContent from "../Question/QuestionContent.vue";
import QuestionFeedback from "../Question/QuestionFeedback.vue";
import QuestionPart from "../Question/QuestionPart.vue";
import { onBeforeRouteLeave } from "vue-router";
import { useConfirm } from "primevue/useconfirm"; 
import useGameManager from 'src/utils/useGameManager';
import useAPI from "../../utils/useAPI";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const gameManager = useGameManager()
const confirm = useConfirm();
const api = useAPI();
const emitter = useEmitter()

const exit_message = "האם את/ה בטוח/ה שאת/ה רוצה לצאת מהמשחק?"
const exit_header = "יציאה מהמשחק"
const exit_icon = "pi pi-exclamation-triangle"
const exit_acceptLabel = 'כן, לצאת'
const exit_rejectLabel = 'ביטול'

onBeforeRouteLeave(async (to, from) => {
  return await new Promise((resolve) => {
    confirm.require({
      message: exit_message,
      header: exit_header,
      icon: exit_icon,
      acceptLabel: exit_acceptLabel,
      rejectLabel: exit_rejectLabel,
      accept: () => {
        //gameManager.$reset() // TODO - are we sure? No need. And reset will reset the unauthorized list. not a big deal but better to keep it
        api.post_json("quest/action/", {action: "endgame"}).then(res => {
          emitter.emit('GAME_ENDED') // Sidebar back to normal
          resolve(true)
        })
      },
      reject: () => {
        resolve(false)
      },
    });
  });
});

function restartGame(){
  gameManager.view = 'wait'
  gameManager.startGame(false, true );
}

async function gotoTaskPage(){
  return await new Promise((resolve) => {
    confirm.require({
      message: exit_message,
      header: exit_header,
      icon: exit_icon,
      acceptLabel: exit_acceptLabel,
      rejectLabel: exit_rejectLabel,
      accept: () => {
        gameManager.view = 'title'
        },
      reject: () => {
      }})
    })    
}

async function end_game(){
  await api.post("quest/action/", {action: "endgame"})
  gameManager.view = 'title' 
  gameManager.question.action = 'game ended'
}
</script>

<template>
  <div class="flex-column gap2">
    <game-top v-if="gameManager.progress.progress[0]!='admin'"/>
    <game-progress v-if="gameManager.progress.progress[0]!='admin'"/>
    <Divider align='right'>
      <game-lifelines/>
    </Divider>
    <div class='flex flex-column gap1 px-5'>
      <question-content :key="gameManager.question.question_num"/>
      <question-part :key="gameManager.question.question_num" />
      <game-buttons :key="gameManager.question.question_num"/>
      <question-feedback :key="gameManager.question.question_num"/>
    </div>
    <Divider align='right'>
      <div v-if="gameManager.progress.progress[0]!='admin'">
      <Button class="p-button-sm p-button-outlined p-button-rounded p-button-secondary" @click="restartGame" label="התחלת משחק חדש" />
      <Button class="p-button-sm p-button-outlined p-button-rounded p-button-secondary" @click="end_game" label="סיום משחק" />  
      <Button class="p-button-sm p-button-outlined p-button-rounded p-button-secondary" @click="gotoTaskPage" label="חזרה לדף המשימה" /> 
    </div>
    </Divider>
    <game-media />
  </div>
</template>


<script>
export default {
  components: {
    GameProgress,
    GameMedia,
    QuestionContent,
    QuestionPart,
    QuestionFeedback,
    GameButtons,
    GameTop,
    GameLifelines,
  },
  name: "GameQuestion",
};
</script>


<style>
</style>