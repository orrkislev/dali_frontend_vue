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


const gameManager = useGameManager()
const confirm = useConfirm();

onBeforeRouteLeave(async (to, from) => {
  return await new Promise((resolve) => {
    confirm.require({
      message: "יציאה?",
      header: "יציאה מהמשחק",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        gameManager.$reset()
        resolve(true)
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
    <game-top />
    <game-progress />
    <Divider align='right'>
      <game-lifelines />
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