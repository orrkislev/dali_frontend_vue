<script setup>
import useGameManager from 'src/utils/useGameManager';

const gameManager = useGameManager()
</script>


<template>
  <div v-if="gameManager.question">
    <div v-if="gameManager.question?.q.type == 'wordselect'">
      <div v-html="gameManager.question.q.text_before"></div>
      <div v-html="gameManager.question.wordSelect[0]"></div>
    </div>

    <div v-else>
      <div v-html="gameManager.question?.q.text_before"></div>
      <div v-html="gameManager.question?.q.text"></div>
      <div v-html="gameManager.question?.q.text_after"></div>
    </div>
  </div>
</template>


<script>
export default {
  name: "QuestionContent",
};
</script>


<style>
</style>