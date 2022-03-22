<script setup>
import GameButtons from './Question/GameButtons.vue';
import GameMedia from './Question/GameMedia.vue';
import GameProgress from './Question/GameProgress.vue';
import QuestionContent from './Question/QuestionContent.vue';
import QuestionFeedback from './Question/QuestionFeedback.vue';
import QuestionPart from './Question/QuestionPart.vue';
</script>


<template>
  <div id="task-main">
    <div id="task-main-top" class="flex-column gap1">
      <GameProgress />
      <GameMedia />
      <QuestionContent />
      <QuestionPart />
      <QuestionFeedback />
    </div>
    <game-buttons />
  </div>
</template>


<script>
export default {
  components: { GameProgress, GameMedia, QuestionContent, QuestionPart, QuestionFeedback, GameButtons },
  name: "GameQuestion",
};
</script>


<style>
</style>