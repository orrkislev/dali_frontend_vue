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

function showAnswer(params) {
  gameManager.question.answers.forEach((answer, i) => {
    if (answer.correct) select(i, answer.correct);
  })
  if (params['check']) check(show=true)
}

function lifeline_stats() {
  let newAnswers = [...gameManager.question.answers];
  newAnswers.forEach((answer) => (answer.stats = answer.chosen));
  gameManager.question.answers = newAnswers;
}

function lifeline_5050() {
  let newAnswers = [...gameManager.question.answers];
  let grayableAnswers = newAnswers
    .filter((a) => a.correct != 1)
    .sort(() => Math.random() - 0.5);
  grayableAnswers
    .slice(0, Math.floor(newAnswers.length / 2))
    .forEach((a) => (a.inactive = true));
  gameManager.question.answers = newAnswers;
}

function check(show) {
  if (show === undefined) show = false
  let newAnswers = [...gameManager.question.answers];
  let result = 0;
  newAnswers.every((a, i) => { // Every allows us to break when a correct answer is found. Useful when there re multiple correct answers.
    if (a.selected * a.correct == 1) {
      result++;
      a.result = "success";
      return false;
    } else {
      a.result = "fail";
      return true;
    }
    if (show) a.result = "show"
    a.inactive = true;
  });
  gameManager.question.answers = newAnswers;
  console.log('result=' + result)
  //result = result == gameManager.question.answers.length ? 1 : 0;

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
    <div v-for="(answer, answerIndex) in gameManager.question.answers" :key="answerIndex" class='mb-2 question-section'>
      <action-button :border="true" :indicator="answer.selected == 1 ? answer.result : null" :inactive="answer.inactive"
        :selected="answer.selected == 1" @click="select(answerIndex, 1)">
        <span v-append="answer.text" v-html="answer.text"></span>
        <small v-if="answer.stats">&nbsp; ({{ answer.stats }})</small>
      </action-button>
    </div>
  </div>
</template>


<script>
export default {
  components: { ActionButton },
  name: "Question_options", 
};
</script>


<style>
#mouseselectimage {
  width: 100%;
}

.mouseselectmarker {
  padding: 0.5em;
  background-color: pink;
  border-radius: 999px;
}

</style>