<script setup>
import useGameManager from '../utils/useGameManager'
import GameTitleIntro from './GameTitleIntro.vue';
import GameTitleOutro from './GameTitleOutro.vue';

const gameManager = useGameManager()

</script>

<template>
    <game-title-intro v-if="gameManager.question==null"></game-title-intro>
    <game-title-outro v-else-if="gameManager.question.action=='game ended'"></game-title-outro>
</template>


<script>
export default {
  components: { GameTitleIntro, GameTitleOutro },
    name:'GameTitle'
};
</script>


<style>
</style>