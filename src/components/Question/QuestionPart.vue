<script setup>
import useGameManager from 'src/utils/useGameManager';
import LashonDragToTableShuffle from './types/LashonDragToTableShuffle.vue';
import Question_mouseselect from './types/QuestionMouseSelect.vue';
import Question_options from './types/QuestionOptions.vue';
import Question_selection from './types/QuestionSelection.vue';
import Question_shortopen from './types/QuestionShortopen.vue';
import Question_wordselect from './types/QuestionWordSelect.vue';
import Question_yesno from './types/QuestionYesNo.vue';
import Question_linesselect from './types/QuestionLinesselect.vue';
import LashonDragToTableShuffleHide from './types/LashonDragToTableShuffleHide.vue';

const gameManager = useGameManager()

const SUPPORTED_TEMPLATES = ['lashon_drag_2table_shuffle','lashon_2table_shuffle_hide'];
const SUPPOTED_Q_TYPES = ['options','yesno','selection','wordselect','shortopen','mouseselect','linesselect'];
function current_q_component() {
                if (SUPPORTED_TEMPLATES.includes(gameManager.question?.q?.display_template))
                    current_q_component = gameManager.question?.q?.display_template
                else if (SUPPOTED_Q_TYPES.includes(gameManager.question?.q?.type)) current_q_component = "Question_" + gameManager.question?.q?.type
                else current_q_component = '';

            console.log('current_q_component=' + current_q_component)
            return current_q_component
            }

</script>

<template>
  <component v-bind:is="current_q_component()"> </component>
</template>

<!--
<template>
    <LashonDragToTableShuffle v-if="gameManager.question?.q?.display_template=='lashon_drag_2table_shuffle'"  :key="gameManager.question?.q?.id" />
    <LashonDragToTableShuffleHide v-else-if="gameManager.question?.q?.display_template=='lashon_2table_shuffle_hide'"  :key="gameManager.question?.q?.id" />
    <QuestionOptions          v-else-if="gameManager.question?.q?.type=='options'"  :key="gameManager.question?.q?.id"  />
    <QuestionYesNo            v-else-if="gameManager.question?.q?.type=='yesno'"  :key="gameManager.question?.q?.id"  />
    <QuestionSelection        v-else-if="gameManager.question?.q?.type=='selection'"   :key="gameManager.question?.q?.id"  />
    <Questionwordselect       v-else-if="gameManager.question?.q?.type=='wordselect'"  :key="gameManager.question?.q?.id"  />
    <QuestionShortopen        v-else-if="gameManager.question?.q?.type=='shortopen'"  :key="gameManager.question?.q?.id"  />
    <QuestionMouseSelect      v-else-if="gameManager.question?.q?.type=='mouseselect'" :key="gameManager.question?.q?.id"  />
    <QuestionLinesselect      v-else-if="gameManager.question?.q?.type=='linesselect'"  :key="gameManager.question?.q?.id"  />
    <div v-else>מצטערים - סוג השאלה לא נתמך  באתר זה.</div>
</template>
-->

<script>
export default {
  components: { LashonDragToTableShuffle, LashonDragToTableShuffleHide, Question_options, Question_wordselect, Question_shortopen, Question_mouseselect, Question_yesno, Question_selection, Question_linesselect },
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