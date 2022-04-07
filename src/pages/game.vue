<script setup>
import { useRoute } from 'vue-router'
import GameQuestion from '../components/GameQuestion.vue'
import GameTitleIntro from '../components/GameTitleIntro.vue'
import useGameManager from '../utils/useGameManager'

const route = useRoute()
const gameManager = useGameManager()

if (route.params.taskid) {
    gameManager.loadGameData({taskID: route.params.taskid, extra:''})
}

</script>

<template>
    <div>
        <game-question v-if="gameManager.question"/>
        <game-title-intro v-if="gameManager.game"/>
    </div>
</template>

<script>
export default {
  components: { GameTitleIntro, GameQuestion },
    name:'Game'
}
</script>

<style>

</style>