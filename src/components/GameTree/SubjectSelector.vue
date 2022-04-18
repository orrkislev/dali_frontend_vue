<script setup>
import useAPI from "../../utils/useAPI";
import useBrowseManager from "../../utils/useBrowseManager";
import useStoreSubscribe from '../../utils/useStoreSubscribe';

const browseManager = useBrowseManager();
const api = useAPI();

useStoreSubscribe(browseManager,'curr_level',(state)=>{
  if (state.curr_level != -1)
        api.post_json("tasks/subjects_list/", {parent_id: state.curr_level}).then(async (p) => {
            browseManager.subject_list = p.list
            browseManager.curr_subject = p.selected_id
        });
})

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