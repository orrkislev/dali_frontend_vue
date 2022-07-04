<script setup>
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

const gameManager = useGameManager()
const confirm = useConfirm();
const api = useAPI();

onBeforeRouteLeave(async (to, from) => {
  return await new Promise((resolve) => {
    confirm.require({
      message: "יציאה?",
      header: "יציאה מהמשחק",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        gameManager.$reset()
        api.post_json("quest/action/", {action: "endgame"}).then(res => {
          resolve(true)
        })
      },
      reject: () => {
        resolve(false)
      },
    });
  });
});
</script>


<template>
  <div class="flex-column gap1">
    <game-top v-if="gameManager.progress.progress[0]!='admin'"/>
    <game-progress v-if="gameManager.progress.progress[0]!='admin'"/>
    <Divider align='right' v-if="gameManager.progress.progress[0]!='admin'">
      <game-lifelines/>
    </Divider>
    <div class='flex flex-column gap1 px-5'>
      <question-content />
      <question-part />
      <game-buttons />
      <question-feedback />
    </div>
    <Divider />
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