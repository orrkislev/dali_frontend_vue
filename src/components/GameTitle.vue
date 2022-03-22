<script setup>
import useGameManager from '../utils/useGameManager'
const gameManager = useGameManager()
</script>

<template>
    <GameTitleIntro v-if="gameManager.question==null"></GameTitleIntro>
    <GameTitleOutro v-else-if="gameManager.question.action=='game ended'"></GameTitleOutro>
</template>


<script>
export default {
    name:'GameTitle'
};
</script>


<style>
</style>