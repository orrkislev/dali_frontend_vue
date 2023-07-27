<script setup>
import useGameManager from 'src/utils/useGameManager';
import lashon_drag_2table_shuffle from './types/LashonDragToTableShuffle.vue';
import Question_mouseselect from './types/QuestionMouseSelect.vue';
import Question_options from './types/QuestionOptions.vue';
import Question_selection from './types/QuestionSelection.vue';
import Question_shortopen from './types/QuestionShortopen.vue';
import Question_wordselect from './types/QuestionWordSelect.vue';
import Question_yesno from './types/QuestionYesNo.vue';
import Question_linesselect from './types/QuestionLinesselect.vue';
//import lashon_drag_2table_shuffle_hide from './types/LashonDragToTableShuffle.vue';

const gameManager = useGameManager()

console.log('loaded question part');
const SUPPORTED_TEMPLATES = ['lashon_drag_2table_shuffle','lashon_2table_shuffle_hide'];
const SUPPOTED_Q_TYPES = ['options','yesno','selection','wordselect','shortopen','mouseselect','linesselect'];
function determine_current_q_component() {
  let current_q_component = ''
  if (SUPPORTED_TEMPLATES.includes(gameManager.question?.q?.display_template))
      current_q_component = lashon_drag_2table_shuffle
  else if (SUPPOTED_Q_TYPES.includes(gameManager.question?.q?.type)) current_q_component = "Question_" + gameManager.question?.q?.type
  else current_q_component = '';
  console.log('current_q_component=' + current_q_component)
  return current_q_component
}

</script>

<template>
  <component v-bind:is="determine_current_q_component()" :key="gameManager.question?.q?.id"> </component>
</template>

<script>
export default {
  components: { lashon_drag_2table_shuffle, Question_options, Question_wordselect, Question_shortopen, Question_mouseselect, Question_yesno, Question_selection, Question_linesselect },
  name:'QuestionPart'
};
</script>

<style>
  .question-section{
    padding: 4px 2em;
  }
  .question-section:nth-child(odd) {
    background: #f5f5f5;
  }
</style>