// TODO

<script setup>
import useGameManager from "src/utils/useGameManager";
import useEmitter from "src/utils/useEmmiter";
import $ from "jquery";

const gameManager = useGameManager();
const emitter = useEmitter()
emitter.subscribe("CHECK_QUESTION", check);
emitter.subscribe('SHOW_ANSWER', showAnswer);

function showAnswer() {
  console.log('showAnswer at word select')
  gameManager.question.linesSelect[1].forEach((a, i) => {
    fillCorrectAnswer(a, i);
  });
  check()
}

function fillCorrectAnswer(a, i) {
  console.log('rrr')
  let el = $("#selection" + (i ));
  if (el.attr("type") == "text") el.val(a.split(",")[0].trim().replace(/\\/g, ''))
  else {
    $(`#selection${i} > .word_select_selection`).each((j, e) => {
      if (e.text == a.trim().replace(/\\/g, ''))
        $(`#selection${i }>option:eq(${j + 1})`).prop('selected', true);
    })
  }
}

function check() {
  let result = 0
  const answerlist = []
  gameManager.question.linesSelect[1].forEach((a, i) => {
      let input = ""
      const answerListData = {
            id: i, //gameManager.question.answers[i].id,
            res: false,
            val: '-3',
            text: '',
        }
      let el = $('#selection' + i)
      if (el.attr('type') == 'text')
      {
         input = el.val().trim().replace(/\\/g, '')
         answerListData.val = '-4'; // This is a code for text
         answerListData.text = input;
      } 
      else 
      {
        input = $('#selection' + i + ' option:selected').text().trim().replace(/\\/g, '')
        if (input != 'בחירה')
        {
          answerListData.val = '-5'; // This is a code to search for the ID in the server for qeest_statistics
          answerListData.text = input;
        }
      }
      const availableAnswers = a.split(",").map((b) => b.trim().replace(/\\/g, ''));
      if (availableAnswers.includes(input)) {
          result++
          answerListData.res = true;
          el.addClass('word_select_selection_right')
      } else {
          el.addClass('word_select_selection_wrong')
      }
      answerlist[i] = answerListData
  })
  result = result / gameManager.question.linesSelect[1].length
  gameManager.submitQuestion({result,answerlist})
}  
</script>


<template>
<div v-html="gameManager.question.linesSelect[0]"></div>
</template>


<script>
export default {
name:'Question_linesselect'
};
</script>


<style>
</style>