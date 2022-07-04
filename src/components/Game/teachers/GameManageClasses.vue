<script setup>
import { ref } from "vue-demi";
import { useRoute } from "vue-router";
import useAPI from "src/utils/useAPI";

const route = useRoute();
const api = useAPI();

const data = ref(null);

api
  .post_json("tasks/tasks_table_data/", { purpose: "add_task_2grades", game_id: route.params.taskid }).then((res) => {
    data.value = res;
  });

async function click(clsIndex, val) {
  res = await api.post_json("tasks/task_class_toggle/", {
    class_id:
      data.value.classes_table[route.params.taskid].list[clsIndex].cl_id,
    game_id: route.params.taskid,
  });
  data.value.classes_table[route.params.taskid].list[clsIndex] = res;
}
</script>


<template>
  <div class="teacher_section_title">ניהול משימה לכיתות</div>
  <div v-if="data" >
    <div v-if="data.filtered_game">
        בחרת להסיר שאלות מהמשימה. תלמידים יראו את המשימה המעודכנת בשם {{data.filtered_game.name}}.
        גם בדו"חות המשימה תופיע בשם זה.
        תלמידים יקבלו בכל משחק {{ data.filtered_game.NumQuestions }} שאלות. תשובה נכונה מזכה ב- {{ data.filtered_game.scoreValue }} נקודות ובמקרה של תשובה שגויה יורדות {{  data.filtered_game.scoreError}} נקודות.
    </div>
    <div class="flex">
      <div v-for="(cls, cldIndex) in Object.entries(data.classes_table)[0][1].list" :key="cls.cl_id" class="w-3">
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