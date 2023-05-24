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
      if (e.text == a.trim().replace(/\\/g, ''))
        $(`#selection${i + 1}>option:eq(${j + 1})`).prop('selected', true);
    })
  }
}

function check() {
  let result = 0;
  const answerlist = []
  let answers_num = 0;
  gameManager.question.wordSelect[1].forEach((a, i) => {
        // check if this is a combined selection or a single one
        const regexp = /\[(.*?)\]/g
    var corrects = a.match(regexp)
    let combined = true;
    let end = "";
    if (!corrects) {combined = false; corrects = [a]; var text = a;}
    const loopsize = corrects.length; // we keep it as we remove items from corrects once they are found, but need to keep the loop size intact.
    for (let p=0;p<loopsize;p++)
    {
      if (combined) {end = "_" + p; }
      let input = "";
      let el = $('#selection' + (i + 1) + end)
      const answerListData = {
              id: i, //gameManager.question.answers[i].id,
              res: false,
              val: '-3',
              text: '',
          }
      if (el.attr("type") == "text") 
      {
        input = el.val();
        answerListData.val = '-4'; // This is a code for text
        answerListData.text = input;
      } 
      else 
      { 
        input = $('#selection' + (i + 1) + end + ' option:selected').text().trim()
        if (input != 'בחירה')
        {
          answerListData.val = '-5'; // This is a code to search for the ID in the server for qeest_statistics
          answerListData.text = input;
        }
      }
      for (let c in corrects)
      {
          if (combined) {var text = corrects[c].substring(1,corrects[c].length-1)};
          let availableAnswers = text.split(',').map(b=>b.trim().replace(/\\/g, ''))
          if (availableAnswers.includes(input)) {
              result++
              el.addClass('word_select_selection_right')
              answerListData.res = 1;
              corrects.splice(c,1);
              break;
          }
      }
      if (!answerListData.res == 1)
        el.addClass('word_select_selection_wrong')
      answerlist[answers_num] = answerListData
      answers_num ++;
    }
  })
  result = result / answers_num;
  gameManager.submitQuestion({ result, answerlist });
}
</script>


<template>
  <div v-html="gameManager.question.wordSelect[0]"></div>
</template>


<script>
export default {
  name: "Question_wordSelect",
};
</script>


<style>
</style>