<script setup>
import SingleTask from "./SingleTask.vue";
import useAPI from "src/utils/useAPI";
import useBrowseManager from "src/utils/useBrowseManager";
import { useRoute } from "vue-router";
import { watch } from "vue";
import { storeToRefs } from "pinia";

const route = useRoute()
const browseManager = useBrowseManager();
const api = useAPI();

let action = null
if (route.path == '/manage/tasks') action = 'ADD_TASK'
else if (route.path == '/manage/exams') action = 'ADD_EXAM'

getGamesData(browseManager.curr_subject);

const {curr_subject} = storeToRefs(browseManager)
watch(curr_subject, newVal=>{
  if (newVal != -1) getGamesData(newVal);
})

function getGamesData(subjectID) {
  api.post_json("tasks/tasks_list/", { parent_id: subjectID }).then((p) => {
    browseManager.game_list = p
  });
}
</script>

<template>
  <div id="gameselector" v-if="browseManager.game_list != null">
    <single-task v-for="task in browseManager.game_list.open_exams" :key="task.exam_id" :exam="true" :task="task" :category="null"
      :played="browseManager.game_list.played_games.includes(task.id)"
      :assigned="browseManager.game_list.extra_games_info.includes(task.id)"
      :score="task.scores?.best ?? 0"
      :target="task.target"
      :action="action"
    />
    <single-task v-for="task in browseManager.game_list.list" :key="task.id" :task="task" :category="null"
      :played="browseManager.game_list.played_games.includes(task.id)"
      :assigned="browseManager.game_list.extra_games_info.includes(task.id)"
      :score="task.scores?.best ?? 0"
      :target="task.target"
      :action="action"
    />
    <div v-if="browseManager.game_list?.list.length == 0">אין משימות פתוחות</div>
  </div>
</template>

<script>
export default {
  components: { SingleTask },
  name: "Game Selector",
};
</script>

<style>
#gameselector {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  flex: 1;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid var(--gray-500)
}

</style>