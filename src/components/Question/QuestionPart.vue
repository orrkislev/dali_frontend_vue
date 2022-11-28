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
    <LashonDragToTableShuffle v-if="gameManager.question?.q?.display_template=='lashon_drag_2table_shuffle'"  />    
    <LashonDragToTableShuffleHide v-else-if="gameManager.question?.q?.display_template=='lashon_2table_shuffle_hide'"  />
    <QuestionOptions          v-else-if="gameManager.question?.q?.type=='options'"  />                                  
    <QuestionYesNo            v-else-if="gameManager.question?.q?.type=='yesno'"  />
    <QuestionSelection        v-else-if="gameManager.question?.q?.type=='selection'"  />
    <QuestionWordSelect       v-else-if="gameManager.question?.q?.type=='wordselect'"  />
    <QuestionShortopen        v-else-if="gameManager.question?.q?.type=='shortopen'"  />
    <QuestionMouseSelect      v-else-if="gameManager.question?.q?.type=='mouseselect'" :key="gameManager.question?.q?.id"  />
    <QuestionLinesselect      v-else-if="gameManager.question?.q?.type=='lineselect'"  />
    <div v-else></div>
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