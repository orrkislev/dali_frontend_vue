<script setup>
import useGameManager from '../../utils/useGameManager';

const gameManager = useGameManager()
const question = gameManager.question
</script>


<template>
  <div v-if="question">
    <small v-if="question.q?.id">שאלה [[ question.q.id ]]</small>

    <div v-if="question?.q.type == 'wordselect'">
      <div v-html="question.q.text_before"></div>
      <div v-html="question.wordSelect[0]"></div>
    </div>

    <div v-else>
      <div v-html="question?.q.text_before"></div>
      <div v-html="question?.q.text"></div>
      <div v-html="question?.q.text_after"></div>
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