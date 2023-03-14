<script setup>
import useGameManager from 'src/utils/useGameManager';

const gameManager = useGameManager()
</script>


<template>
  <div >
      <div v-html="gameManager.question?.q.text_before"></div>
      <div v-html="gameManager.question?.q.text"></div>
      <div v-html="gameManager.question?.q.text_after"></div>
  </div>
</template>


<script>
export default {
  name: "QuestionContent",
};
</script>


<style>
</style>