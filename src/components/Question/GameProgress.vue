<script setup>
import useGameManager from 'src/utils/useGameManager';

const gameManager = useGameManager()

</script>


<template>
  <div v-if="gameManager.progress" class="flex gap05">
    <div
      v-for="(p,i) in gameManager.progress.progress" :key=i
      class="game-progress-part"
      :class="{
        'game-progress-part-curr': p == 'curr',
        'game-progress-part-success': p == 1,
        'game-progress-part-fail': p == 0,
        'game-progress-part-partial': p > 0 && p < 1,
      }">
        <div v-if="p == 'curr'" class='game-progress-part-text'>{{ i+1 }}</div>
      </div>
  </div>
</template>


<script>
export default {
  name: "GameProgress",
};
</script>


<style>
.game-progress-part {
  height: 5px;
  flex: 1;
  background-color: lightgray;
  
  display: flex;
  justify-content: center;
}
.game-progress-part-text {
  margin-top:-0.6em;
  background: rgba(255,255,255,0.9);
  padding: 0 0.3em;
}
.game-progress-part-curr {
  background-color: orange;
}
.game-progress-part-success {
  background-color: aquamarine;
}
.game-progress-part-fail {
  background-color: salmon;
}
.game-progress-part-partial {
  background-image: linear-gradient(
    45deg,
    #eb8888 25%,
    #72d2db 25%,
    #72d2db 50%,
    #eb8888 50%,
    #eb8888 75%,
    #72d2db 75%,
    #72d2db 100%
  );
  background-size: 15px 15px;
}
</style>