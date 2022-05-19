<script setup>
import useEmitter from "src/utils/useEmmiter";
import useGameManager from "src/utils/useGameManager";
import $ from "jquery";

const gameManager = useGameManager();
const emitter = useEmitter()

emitter.subscribe("CHECK_QUESTION", check);

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