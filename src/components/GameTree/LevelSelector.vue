<script setup>
import useAPI from "src/utils/useAPI";
import useBrowseManager from "src/utils/useBrowseManager";

const browseManager = useBrowseManager();
const api = useAPI();

api.post_json("tasks/subjects_list/", {}).then((p) => {
  browseManager.level_list = p.list;
  browseManager.curr_level = p.selected_id;
});

function chooseSubject(id) {
  browseManager.curr_level = id;
}
</script>

<template>
  <div>
    <div id="subjectlist">
      <div
        v-for="(a, i) in browseManager.level_list"
        :key="i"
        class="subjectlist-element"
        :class="{'subjectlist-element-selected':browseManager.curr_level==a.id}"
        @click="chooseSubject(a.id)"
      >
        {{ a.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Level Selector",
};
</script>

<style>
#subjectlist {
  display: flex;
  justify-content: center;
}
.subjectlist-element {
  background: #ddd;
  padding: 0.2em 0.5em;
  cursor: pointer;
  font-size: 1.1em;
  transition: all 150ms ease;
}
.subjectlist-element:first-of-type {
  padding-right: 1em;
  border-radius: 0 0.5em 0.5em 0;
}
.subjectlist-element:last-of-type {
  padding-left: 1em;
  border-radius: 0.5em 0 0 0.5em;
}

.subjectlist-element:hover {
  background: #99a;
}
.subjectlist-element:active {
  background: darkgoldenrod;
}
.subjectlist-element-selected {
  background: orange;
  color:darkred
}
</style>