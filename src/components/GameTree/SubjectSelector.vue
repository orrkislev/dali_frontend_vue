<script setup>
import { storeToRefs } from "pinia";
import useAPI from "src/utils/useAPI";
import useBrowseManager from "src/utils/useBrowseManager";
import useAuth from '../../utils/useAuth';
import { watch } from "vue";
import daliKnob  from '../../pages/daliKnob.vue';

const browseManager = useBrowseManager();
const api = useAPI();
const auth = useAuth()

const { curr_level } = storeToRefs(browseManager);
watch(curr_level, newCurrState=>{
  //if (newCurrState != -1)
    api
      .post_json("tasks/subjects_list/", { parent_id: newCurrState })
      .then((p) => {
        browseManager.subject_list = p.list;
        browseManager.curr_subject = p.selected_id;
      });
})

function chooseSubject(id) {
  browseManager.curr_subject = id;
}
</script>

<template>
  <div id="subject_selector">
    <h3 class = 'centerdiv'>תת נושא</h3>
    <table class="subject_selector_item" cellspasing="0">
    <tr
      v-for="(a, i) in browseManager.subject_list"
      :key="i"
      @click="chooseSubject(a.id)"
      class="subject_selector_item"
      :class="{ subject_selector_item_selected: browseManager.curr_subject==a.id }"
      >
      <td>{{ a.name }}</td>
      <td>
        <span class='summary_title'> משימות סיכום:<br/></span>
        <span class='summary_res' :class="{summary_success : a.score == a.target}">
           {{ a.target }} / {{ a.score }} 
      </span>
      </td>
    </tr>
  </table>
  </div>
</template>

<script>
export default {
  name: "SubjectSelector",
};
</script>

<style>
#subject_selector{
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  background-color: var(--gray-200);
  border-radius: 10px;
}
table.subject_selector_item{border-collapse: collapse;}
tr.subject_selector_item {
  border-radius: 0.2em;
  cursor: pointer;
  font-size: 1.1em;
  transition: all 150ms ease;
  padding-left: 2.5em;
  padding-right: 0.5em;
  border-bottom: 1px solid white;
}

tr.subject_selector_item:hover {
  background: #99a;
}
.subject_selector_item:active {
  background: darkgoldenrod;
}
.subject_selector_item_selected{
  padding-right: 2.5em;
  padding-left: .5em;
  background: orange;
  color:darkred;
}
.summary_title {font-size:10px;}
.summary_res {font-size:20px;}
.summary_success{color: var(--dali_correct_color);}
</style>
