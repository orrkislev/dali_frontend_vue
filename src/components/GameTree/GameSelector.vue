<script setup>
import SingleTask from './SingleTask.vue'
import { ref } from 'vue-demi';
import useAPI from "../../utils/useAPI";
import useBrowseManager from "../../utils/useBrowseManager";

const browseManager = useBrowseManager();
const api = useAPI();

const gameData = ref(null)

browseManager.$subscribe((mutation, state) => {
    if (mutation.events.key == 'curr_subject' && state.curr_subject != -1)
        api.post("tasks/tasks_list/", {parent_id: state.curr_subject}).then(async (p) => {
            gameData.value = p
        });
});
</script>

<template>
    <div id='gameselector' v-if="gameData != null">
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
        <single-task  v-for="task in gameData.list" :key="task.id" 
            :task="task" :category="null"
            :played="gameData.played_games.includes(task.id)" 
            :assigned="gameData.extra_games_info.includes(task.id)" />
        <div v-if="gameData.list.length==0">אין משימות פתוחות        </div>
    </div>
</template>

<script>
export default {
    components: { SingleTask },
    name: 'Game Selector'
}
</script>

<style>
#gameselector{
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
}
</style>