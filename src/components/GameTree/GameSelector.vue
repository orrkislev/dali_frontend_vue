<script setup>
import SingleTask from "./SingleTask.vue";
import useAPI from "src/utils/useAPI";
import useBrowseManager from "src/utils/useBrowseManager";
import useStoreSubscribe from "src/utils/useStoreSubscribe";

const browseManager = useBrowseManager();
const api = useAPI();

getGamesData(browseManager.curr_subject);
useStoreSubscribe(browseManager, "curr_subject", (state) => {
  if (state.curr_subject != -1) getGamesData(state.curr_subject);
});

function getGamesData(subjectID) {
  api.post_json("tasks/tasks_list/", { parent_id: subjectID }).then((p) =>  {
    browseManager.game_list = p 
  });
}
</script>

<template>
  <div id="gameselector" v-if="browseManager.game_list != null">
    <!-- <single-task v-if="gameData.game_in_class != null"
             :task="gameData.game_in_class" :category="'משחק כיתתי'"
             @click="OpenGameInclass()">
        </single-task> -->
    <!-- <template v-if="gameData.open_exams.length > 0">
            <single-task v-for="exam in gameData.open_exams" :key="exam.game_id"
                :task="exam" :exam="true" :category="'בוחן'"
                :played="gameData.played_games.includes(exam.game_id)" 
                :assigned="gameData.extra_games_info.includes(exam.game_id)"
                @click="selectTask(exam.game_id, {exam:exam.exam_id})">
            </single-task>
        </template> -->
    <single-task
      v-for="task in browseManager.game_list.list"
      :key="task.id"
      :task="task"
      :category="null"
      :played="browseManager.game_list.played_games.includes(task.id)"
      :assigned="browseManager.game_list.extra_games_info.includes(task.id)"
      :score="task.scores.best ? task.scores.best : 0"
      :target="task.target"
    />
    <div v-if="browseManager.game_list.list.length == 0">אין משימות פתוחות</div>
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
  flex:1;
}
</style>