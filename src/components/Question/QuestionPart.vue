<script setup>
import useGameManager from 'src/utils/useGameManager';
import LashonDragToTableShuffle from './types/LashonDragToTableShuffle.vue';
import QuestionMouseSelect from './types/QuestionMouseSelect.vue';
import QuestionOptions from './types/QuestionOptions.vue';
import QuestionSelection from './types/QuestionSelection.vue';
import QuestionShortopen from './types/QuestionShortopen.vue';
import QuestionWordSelect from './types/QuestionWordSelect.vue';
import QuestionYesNo from './types/QuestionYesNo.vue';
import QuestionLinesselect from './types/QuestionLinesselect.vue';
import LashonDragToTableShuffleHide from './types/LashonDragToTableShuffleHide.vue';

const gameManager = useGameManager()
</script>


<template>
    <LashonDragToTableShuffle v-if="gameManager.question?.q?.display_template=='lashon_drag_2table_shuffle'"  :key="gameManager.question?.q?.id" />
    <LashonDragToTableShuffleHide v-else-if="gameManager.question?.q?.display_template=='lashon_2table_shuffle_hide'"  :key="gameManager.question?.q?.id" />
    <QuestionOptions          v-else-if="gameManager.question?.q?.type=='options'"  :key="gameManager.question?.q?.id"  />
    <QuestionYesNo            v-else-if="gameManager.question?.q?.type=='yesno'"  :key="gameManager.question?.q?.id"  />
    <QuestionSelection        v-else-if="gameManager.question?.q?.type=='selection'"   :key="gameManager.question?.q?.id"  />
    <QuestionWordSelect       v-else-if="gameManager.question?.q?.type=='wordselect'"  :key="gameManager.question?.q?.id"  />
    <QuestionShortopen        v-else-if="gameManager.question?.q?.type=='shortopen'"  :key="gameManager.question?.q?.id"  />
    <QuestionMouseSelect      v-else-if="gameManager.question?.q?.type=='mouseselect'" :key="gameManager.question?.q?.id"  />
    <QuestionLinesselect      v-else-if="gameManager.question?.q?.type=='lineselect'"  :key="gameManager.question?.q?.id"  />
    <div v-else>מצטערים - סוג השאלה לא נתמך  באתר זה.</div>
</template>


<script>
export default {
  components: { LashonDragToTableShuffle, QuestionOptions, QuestionWordSelect, QuestionShortopen, QuestionMouseSelect, QuestionYesNo, QuestionSelection },
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