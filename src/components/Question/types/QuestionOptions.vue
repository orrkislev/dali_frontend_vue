<script setup>
import useGameManager from "../../../utils/useGameManager";
import useEmitter from "../../../utils/useEmmiter";
import { ref } from 'vue-demi';

const gameManager = useGameManager();
const emitter = useEmitter();

let answers = ref([...gameManager.question.answers])

emitter.on("LIFELINE_STATS", () => {
  let newAnswers = [...answers.value];
  newAnswers.forEach((answer) => (answer.stats = answer.chosen));
  answers.value = newAnswers;
});

emitter.on("LIFELINE_5050", () => {
  let newAnswers = [...answers.value];
  let grayableAnswers = newAnswers
    .filter((a) => a.correct != 1)
    .sort(() => Math.random() - 0.5);
  grayableAnswers
    .slice(0, Math.floor(newAnswers.length / 2))
    .forEach((a) => (a.inactive = true));
  answers.value = newAnswers;
});

emitter.on("CHECK_QUESTION", () => {
  let newAnswers = [...answers.value];
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
  answers.value = newAnswers;
  result = result == answers.value.length ? 1 : 0;

  let answerlist = [];
  let selectedAnswer = answers.value.find((a) => a.selected == 1);
  if (selectedAnswer) answerlist = [{ id: selectedAnswer.id, res: result }];

  gameManager.submitQuestion({ result, answerlist });
});

function select(answerIndex, val) {
    let newAnswers = [...answers.value]
    newAnswers.forEach(a => a.selected = 0)
    newAnswers[answerIndex].selected = val
    answers.value = newAnswers
}
</script>


<template>
  <div class="flex-column gap05">
    <div v-for="(answer, answerIndex) in answers" :key="answerIndex">
      <div class="flex1">
        <button
          :indicator="answer.selected == 1 ? answer.result : null"
          disabled="answer.inactive"
          :selected="answer.selected == 1"
          @click="select(answerIndex, 1)"
        >
          <span v-append="answer.text"></span>
          <small v-if="answer.stats">&nbsp; ([[ answer.stats ]])</small>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "QuestionOptions",
};
</script>


<style>
</style>