<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import GameQuestion from '../components/Game/GameQuestion.vue';
import useAPI from '../utils/useAPI';
import useGameManager from '../utils/useGameManager';

const route = useRoute()
const api = useAPI()
const gameManager = useGameManager()

if (route.params.id){
    api.post(`quest/qadmin/${route.params.id}/`, {}).then(res => {
        gameManager.question = res
        gameManager.progress = {progress:['admin']}
    })
}

</script>


<template>
    <GameQuestion v-if="gameManager.question" admin/>
</template>


<script>
export default {
name:'qadmin'
};
</script>


<style>
</style>