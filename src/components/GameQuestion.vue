<script setup>
import GameTop from "./GameTop.vue";
import GameButtons from "./Question/GameButtons.vue";
import GameLifelines from "./Question/GameLifelines.vue";
import GameMedia from "./Question/GameMedia.vue";
import GameProgress from "./Question/GameProgress.vue";
import QuestionContent from "./Question/QuestionContent.vue";
import QuestionFeedback from "./Question/QuestionFeedback.vue";
import QuestionPart from "./Question/QuestionPart.vue";
</script>


<template>
  <div class="flex-column gap1">
    <game-top/>
    <game-lifelines />
    <game-progress />
    <div class='flex gap1'>
      <div class='flex1'>
        <game-media />
      </div>
      <div class='flex2 flex-column gap1 space-between'>
        <div>
          <question-content />
          <question-part />
        </div>
        <div>
          <game-buttons />
        </div>
      </div>
    </div>
    <question-feedback />
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