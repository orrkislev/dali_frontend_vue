<script setup>
import { ref } from "vue-demi";
import { useRoute } from "vue-router";
import useAPI from "src/utils/useAPI";
import useGameManager from "../../../utils/useGameManager";

const route = useRoute();
const api = useAPI();
const gameManager = useGameManager()

updateClassData()
async function updateClassData(){
  const res = await api.post_json("tasks/tasks_table_data/", { purpose: "add_task_2grades", game_id: route.params.taskid })
  gameManager.game.classData = res;
}


async function click(clsIndex, val) {
  const taskId = gameManager.game.classData.filtered_game?.id ?? route.params.taskid;
  const res = await api.post_json("tasks/task_class_toggle/", {
    class_id: gameManager.game.classData.classes_table[taskId].list[clsIndex].cl_id,
    game_id: route.params.taskid,
  });
  if (res.success) gameManager.game.classData.classes_table[taskId].list[clsIndex].isopen = res.status;
  // updateClassData()
}
</script>


<template>
  <div class="teacher_section_title">ניהול משימה לכיתות</div>
  <div v-if="gameManager.game.classData" >
    <div v-if="gameManager.game.classData.filtered_game">
        בחרת להסיר שאלות מהמשימה. תלמידים יראו את המשימה המעודכנת בשם <strong>{{gameManager.game.classData.filtered_game.name}}</strong>.
        גם בדו"חות המשימה תופיע בשם זה.
        תלמידים יקבלו בכל משחק {{ gameManager.game.classData.filtered_game.NumQuestions }} שאלות. תשובה נכונה מזכה ב- {{ gameManager.game.classData.filtered_game.scoreValue }} נקודות ובמקרה של תשובה שגויה יורדות {{  gameManager.game.classData.filtered_game.scoreError}} נקודות.
    </div>
    <div class="flex">
      <div v-for="(cls, cldIndex) in Object.entries(gameManager.game.classData.classes_table)[0][1].list" :key="cls.cl_id" class="w-3">
        <h3><InputSwitch v-model="cls.isopen" @input="(e) => click(cldIndex)" /> {{ cls.name }} </h3>
        <div v-if="cls.isopen">משימה זו פתוחה לכיתה</div>
        <div v-else>משימה לא פתוחה לכיתה</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "GameManageClasses",
};
</script>


<style>
</style>