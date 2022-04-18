<script setup>
import GameQuestion from '../components/GameQuestion.vue'
import { useRoute } from 'vue-router'
import useGameManager from '../utils/useGameManager'
import GameTitle from '../components/GameTitle.vue'

const route = useRoute()
const gameManager = useGameManager()

if (route.params.taskid) 
    if (gameManager.game?.id != route.params.taskid)
        gameManager.loadGameData({taskID: route.params.taskid, extra:''})

</script>

<template>
    <div>
        <game-question v-if="gameManager.question && gameManager.view=='question'"/>
        <game-title v-if="gameManager.view=='title'"/>
    </div>
</template>

<script>
export default {
  components: { GameQuestion, GameTitle },
    name:'Game'
}
</script>

<style>

</style>