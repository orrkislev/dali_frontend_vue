<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import GameQuestion from '../components/Game/GameQuestion.vue';
import useAPI from '../utils/useAPI';

const route = useRoute()
const api = useAPI()
const ready = ref(false)

if (route.params.id){
    api.post_json(`quest/qadmin/${route.params.id}/`, {}).then(res => {
        console.log(res)
        // ready.value = true
    })
}

</script>


<template>
    <GameQuestion v-if="ready"/>
</template>


<script>
export default {
name:'qadmin'
};
</script>


<style>
</style>