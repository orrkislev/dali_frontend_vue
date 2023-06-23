<script setup>
import useAPI from "src/utils/useAPI";
import useBrowseManager from "src/utils/useBrowseManager";
import useAuth from '../../utils/useAuth';
import daliKnob  from '../../pages/daliKnob.vue';
import Dropdown from 'primevue/dropdown';


const browseManager = useBrowseManager();
const api = useAPI();
const auth = useAuth()
let currentLevel = {}

api.post_json("tasks/subjects_list/", {}).then((p) => {
  browseManager.level_list = p.list;
  browseManager.curr_level = p.selected_id;
});

function chooseLLevel(item) {
  console.log('here')
  browseManager.curr_level = item.value.id;
  browseManager.curr_item = item.value;
}
function chooseSubject(id) {
  browseManager.curr_level = id;
}


</script>

<template>
  <div>
    <div id="subjectlist">
      <div style="float:right;width:25%">
        <Dropdown  :options="browseManager.level_list" optionLabel="name" placeholder="בחרו נושא ראשי"  @change="chooseLLevel">
          <template #option="slotProps">
            <div :class="{summary_success : slotProps.option.score == slotProps.option.target}">{{ slotProps.option.name }}</div>
          </template>  
        </Dropdown>
      </div>
      <div class="LevelSelected" style="float:left;width:75%">
        <span style="float:right;">{{ browseManager.curr_item?.name }}</span>
        <span v-if="browseManager.curr_item.target" style="float:left;" :class="{summary_success : browseManager.curr_item.score == browseManager.curr_item.target}">
          {{ browseManager.curr_item?.target }} / {{ browseManager.curr_item?.score }}
        </span>
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
  background-color: var(--gray-100);
  border-radius: 10px;
  padding:10px;
}
.LevelSelected {font-size:2em;}
.subjectlist-element {
  background: #ddd;
  padding: 0.2em 0.5em;
  cursor: pointer;
  font-size: 1.1em;
  transition: all 150ms ease;
  border-left: 1px solid white;
}
.subjname-line:first-of-type {
  padding-right: 1em;
  border-radius: 0 0.5em 0 0;
}
.subjname-line:last-of-type {
  padding-left: 1em;
  border-radius: 0.5em 0 0 0;
}

.knob-line:first-of-type {
  padding-right: 1em;
  border-radius: 0 0 0.5em 0;
}
.knob-line:last-of-type {
  padding-left: 1em;
  border-radius: 0 0 0 0.5em;
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