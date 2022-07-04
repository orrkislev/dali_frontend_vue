<script setup>
import useGameManager from "src/utils/useGameManager";
import useEmitter from "src/utils/useEmmiter";
import ActionButton from "../../ActionButton.vue";

const gameManager = useGameManager();
const emitter = useEmitter()

emitter.subscribe("LIFELINE_STATS", lifeline_stats)
emitter.subscribe("LIFELINE_5050", lifeline_5050)
emitter.subscribe("CHECK_QUESTION", check);
emitter.subscribe('SHOW_ANSWER', showAnswer)

function showAnswer(){
    gameManager.question.answers.forEach((answer,i) => {
      if (answer.correct) select(i,answer.correct);
    })
    check()
}

function lifeline_stats(){
  let newAnswers = [...gameManager.question.answers];
  newAnswers.forEach((answer) => (answer.stats = answer.chosen));
  gameManager.question.answers = newAnswers;
}

function lifeline_5050(){
  let newAnswers = [...gameManager.question.answers];
  let grayableAnswers = newAnswers
    .filter((a) => a.correct != 1)
    .sort(() => Math.random() - 0.5);
  grayableAnswers
    .slice(0, Math.floor(newAnswers.length / 2))
    .forEach((a) => (a.inactive = true));
  gameManager.question.answers = newAnswers;
}

function check(){
  let newAnswers = [...gameManager.question.answers];
  let result = 0;
  newAnswers.forEach((a, i) => {
    if (a.selected == a.correct) {
      result++;
      a.result = "success";
    } else {
      a.result = "fail";
    }
    a.inactive = true;
  });
  gameManager.question.answers = newAnswers;
  result = result == gameManager.question.answers.length ? 1 : 0;

  let answerlist = [];
  let selectedAnswer = gameManager.question.answers.find((a) => a.selected == 1);
  if (selectedAnswer) answerlist = [{ id: selectedAnswer.id, res: result }];

  gameManager.submitQuestion({ result, answerlist });
}

function select(answerIndex, val) {
    let newAnswers = [...gameManager.question.answers]
    newAnswers.forEach(a => a.selected = 0)
    newAnswers[answerIndex].selected = val
    gameManager.question.answers = newAnswers
}
</script>


<template>
  <div>
    <div v-for="(answer, answerIndex) in gameManager.question.answers" :key="answerIndex" class='mb-2'>
        <action-button
          :border="true"
          :indicator="answer.selected == 1 ? answer.result : null"
          :disabled="answer.inactive"
          :selected="answer.selected == 1"
          @click="select(answerIndex, 1)"
        >
          <span v-append="answer.text">{{ answer.text }}</span>
          <small v-if="answer.stats">&nbsp; ({{ answer.stats }})</small>
        </action-button>
    </div>
  </div>
</template>


<script>
export default {
  components: { ActionButton },
  name: "QuestionOptions",
};
</script>


<style>
</style>