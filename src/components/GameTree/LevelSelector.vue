<script setup>
import useAPI from '../../utils/useAPI';
import useBrowseManager from '../../utils/useBrowseManager'

const browseManager = useBrowseManager()
const api = useAPI()

api.post_json("tasks/subjects_list/", {}).then(async (p) => {
  browseManager.level_list = p.list
  browseManager.curr_level = p.selected_id
});

function chooseSubject(id){
    browseManager.curr_level = id
}
</script>

<template>
  <div>
      <div id='subjectlist'>
        <div v-for="a,i in browseManager.level_list" :key="i" class='subjectlist-element' @click="chooseSubject(a.id)">
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
#subjectlist{
    display: flex;
    gap:0.5em;
    justify-content: center;
}
.subjectlist-element{
    cursor: pointer;
    border-bottom: 2px solid blue;
}
</style>