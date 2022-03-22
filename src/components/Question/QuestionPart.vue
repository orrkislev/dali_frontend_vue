<script setup>
import useGameManager from '../../utils/useGameManager';
import LashonDragToTableShuffle from './types/LashonDragToTableShuffle.vue';
import QuestionMouseSelect from './types/QuestionMouseSelect.vue';
import QuestionOptions from './types/QuestionOptions.vue';
import QuestionSelection from './types/QuestionSelection.vue';
import QuestionShortopen from './types/QuestionShortopen.vue';
import QuestionWordSelect from './types/QuestionWordSelect.vue';
import QuestionYesNo from './types/QuestionYesNo.vue';
const gameManager = useGameManager()
const question = gameManager.question
</script>


<template>
    <LashonDragToTableShuffle v-if="question?.q?.display_template=='lashon_drag_2table_shuffle'"  />    
    <LashonDragToTableShuffle v-else-if="question?.q?.display_template=='lashon_2table_shuffle_hide'"  />
    <QuestionOptions          v-else-if="question?.q?.type=='options'"  />                                  
    <QuestionYesNo            v-else-if="question?.q?.type=='yesno'"  />
    <QuestionSelection        v-else-if="question?.q?.type=='selection'"  />
    <QuestionWordSelect       v-else-if="question?.q?.type=='wordselect'"  />
    <QuestionShortopen        v-else-if="question?.q?.type=='shortopen'"  />
    <QuestionMouseSelect      v-else-if="question?.q?.type=='mouseselect'"  />
    <div v-else></div>
</template>


<script>
export default {
  components: { LashonDragToTableShuffle, QuestionOptions, QuestionWordSelect, QuestionShortopen, QuestionMouseSelect, QuestionYesNo, QuestionSelection },
name:'QuestionPart'
};
</script>


<style>
</style>