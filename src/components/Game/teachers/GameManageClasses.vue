<script setup>
import { ref } from 'vue-demi';
import { useRoute } from 'vue-router';
import useAPI from '../../../utils/useAPI';

const route = useRoute()
const api = useAPI()

const data = ref(null)

api.post_json('tasks/tasks_table_data/',{purpose:'add_task_2grades',game_id:route.params.taskid}).then(res=>{
    data.value = res
})
</script>


<template>
    <div v-if="data">
        <div v-for="cls in data.classes_list" :key="cls.id">
            {{ cls }}
        </div>
    </div>
</template>


<script>
export default {
name:'GameManageClasses'
};
</script>


<style>
</style>