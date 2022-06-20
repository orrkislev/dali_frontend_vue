<script setup>
import useAPI from "src/utils/useAPI";
import useBrowseManager from "src/utils/useBrowseManager";
import useStoreSubscribe from "src/utils/useStoreSubscribe";

const browseManager = useBrowseManager();
const api = useAPI();

useStoreSubscribe(browseManager, "curr_level", (state) => {
  if (state.curr_level === undefined) { state.curr_level = -1;}
  if (state.curr_level != -1)
    api
      .post_json("tasks/subjects_list/", { parent_id: state.curr_level })
      .then((p) => {
        browseManager.subject_list = p.list;
        browseManager.curr_subject = p.selected_id;
      });
});

function chooseSubject(id) {
  browseManager.curr_subject = id;
}
</script>

<template>
  <div id="subject_selector">
    <div
      v-for="(a, i) in browseManager.subject_list"
      :key="i"
      @click="chooseSubject(a.id)"
      class="subject_selector_item"
      :class="{ subject_selector_item_selected: browseManager.curr_subject==a.id }"
    >
      {{ a.name }}
    </div>
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
