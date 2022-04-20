<script setup>
import LevelSelector from './LevelSelector.vue';
import SubjectSelector from './SubjectSelector.vue'
import GameSelector from './GameSelector.vue'
</script>

<template>
  <div>
      <level-selector />
      <div id='subject_game_selection'>
        <subject-selector />
        <game-selector />
      </div>
  </div>
</template>

<script>
export default {
  components: { LevelSelector, SubjectSelector, GameSelector},
  name: "GameTree",
};
</script>

<style>
#subject_game_selection{
  display: flex;
  margin-top: 1em;
  gap: 1em;
}
</style>