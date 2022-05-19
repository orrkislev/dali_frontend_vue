<script setup>
import GameQuestion from 'src/components/Game/GameQuestion.vue'
import { useRoute } from 'vue-router'
import useGameManager from 'src/utils/useGameManager'
import GameTitleIntro from 'src/components/Game/GameTitleIntro.vue'
import GameTitleOutro from 'src/components/Game/GameTitleOutro.vue'

const route = useRoute()
const gameManager = useGameManager()

if (route.params.taskid) 
    if (gameManager.game?.id != route.params.taskid)
        gameManager.loadGameData({taskID: route.params.taskid, extra:''})

function resetGame(){
    gameManager.question = null
    gameManager.view = 'title'
    return ''
}

</script>

<template>
    <div>
        <game-question    v-if="gameManager.view=='question' && gameManager.question"/>
        <game-title-intro v-else-if="gameManager.view=='title' && gameManager.question==null"></game-title-intro>
        <game-title-outro v-else-if="gameManager.view=='title' && gameManager.question.action=='game ended'"></game-title-outro>
        <div v-else>{{ resetGame() }}</div>
    </div>
</template>

<script>
export default {
  components: { GameQuestion, GameTitleIntro , GameTitleOutro},
    name:'Game'
}
</script>

<style>

</style>