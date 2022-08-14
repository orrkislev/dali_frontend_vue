<script setup>
import useEmitter from "src/utils/useEmmiter";
import useGameManager from "src/utils/useGameManager";
import $ from "jquery";

const gameManager = useGameManager();
const emitter = useEmitter()

emitter.subscribe("LIFELINE_STATS", lifeline_stats)
emitter.subscribe('LIFELINE_5050', lifeline_5050)
emitter.subscribe("CHECK_QUESTION", check);
emitter.subscribe('SHOW_ANSWER', showAnswer)

function showAnswer() {
  console.log('showAnswer at word select')
  gameManager.question.wordSelect[1].forEach((a, i) => {
    fillCorrectAnswer(a, i);
  });
  check()
}

function lifeline_5050() {
  const correctAnswers = gameManager.question.wordSelect[1].map((a, i) => {
    return {
      index: i,
      answer: a
    }
  }).sort(() => Math.random() - 0.5)
  for (let i = 0; i < correctAnswers.length * .5; i++) {
    const ans = correctAnswers[i]
    fillCorrectAnswer(ans.answer, ans.index);
  }
}

function lifeline_stats() {
  // TODO - implement stats lifeline  
}

function fillCorrectAnswer(a, i) {
  let el = $("#selection" + (i + 1));
  if (el.attr("type") == "text") el.val(a.split(",")[0])
  else {
    $(`#selection${i + 1} > .word_select_selection`).each((j, e) => {
      if (e.text == a)
        $(`#selection${i + 1}>option:eq(${j + 1})`).prop('selected', true);
    })
  }
}

function check() {
  let result = 0;
  gameManager.question.wordSelect[1].forEach((a, i) => {
    let input = "";
    let el = $("#selection" + (i + 1));
    if (el.attr("type") == "text") input = el.val();
    else input = $("#selection" + (i + 1) + " option:selected").text();
    input = input.trim();

    const availableAnswers = a.split(",").map((b) => b.trim());
    if (availableAnswers.includes(input)) {
      result++;
      el.addClass("word_select_selection_right");
    } else {
      el.addClass("word_select_selection_wrong");
    }
  });
  result = result / gameManager.question.wordSelect[1].length;
  gameManager.submitQuestion({ result });
}
</script>


<template>
  <div></div>
</template>


<script>
export default {
  name: "QuestionWordSelect",
};
</script>


<style>
</style>