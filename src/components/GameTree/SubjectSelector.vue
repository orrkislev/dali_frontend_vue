<script setup>
import useAPI from "../../utils/useAPI";
import useBrowseManager from "../../utils/useBrowseManager";

const browseManager = useBrowseManager();
const api = useAPI();

browseManager.$subscribe((mutation, state) => {
    if (mutation.events.key == 'curr_level' && state.curr_level != -1)
        api.post("tasks/subjects_list/", {parent_id: state.curr_level}).then(async (p) => {
            browseManager.subject_list = p.list
            browseManager.curr_subject = p.selected_id
        });
});

function chooseSubject(id){
    browseManager.curr_subject = id
}
</script>

<template>
  <div>
        <div v-for="a,i in browseManager.subject_list" :key="i" @click="chooseSubject(a.id)">
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
</style>