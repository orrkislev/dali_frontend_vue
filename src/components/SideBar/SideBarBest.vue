<script setup>
import { ref } from 'vue';
import useAPI from '../../utils/useAPI';

const api = useAPI()
const data = ref(null)

api.post('students/group_badges/',{}).then(res=>{
    data.value = res
    console.log(res)
})
</script>


<template>
    <div class="sideBarElement sideBarElement-dark" v-if="data">
        <div v-if="data.school_badge">
            {{ data.school_badge["badge.name"] }}
            {{ data.school_badge["school.name"] }}
        </div>
        <div v-for="cls in data.classes_badges" :key="cls.id">
            {{ cls["badge.name"] }} - {{ cls["school.name"] }}
        </div>
    </div>
</template>


<script>
export default {
name:'SideBarBest'
};
</script>


<style>
</style>