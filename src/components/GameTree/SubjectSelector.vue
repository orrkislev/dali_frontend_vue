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
  if (newCurrState != -1)
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
    <table cellspacing="0" cellpadding="0">
    <tr
      v-for="(a, i) in browseManager.subject_list"
      :key="i"
      @click="chooseSubject(a.id)"
      class="subject_selector_item"
      :class="{ subject_selector_item_selected: browseManager.curr_subject==a.id }"
      >
      <td>{{ a.name }}</td>
      <td>
        <daliKnob v-if="auth.username && !auth.isTeacherOrStaff" 
        :score="40" :min="0" :max="100" disabled :size="33"  :strokeWidth="10"/>
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
}
.subject_selector_item {
  border-radius: 0.2em;
  cursor: pointer;
  font-size: 1.1em;
  transition: all 150ms ease;
  padding-left: 2.5em;
  padding-right: 0.5em;
}

.subject_selector_item:hover {
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
</style>
