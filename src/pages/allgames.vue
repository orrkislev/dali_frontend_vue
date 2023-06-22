<script setup>
import GameTree from 'src/components/GameTree/GameTree.vue';
</script>


<template>
  <div>
    <h2 class="centerdiv">מאגר המשימות</h2>
    <game-tree />
  </div>
</template>


<script>
export default {
  components: { GameTree },
  name: "allgames",
};
</script>


<style>
</style>
