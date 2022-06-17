<script setup>
import { ref } from 'vue-demi';
import useAPI from "src/utils/useAPI";
import useGameManager from "src/utils/useGameManager";
import PlayedGamesList from "./PlayedGamesList.vue";
import { onBeforeRouteLeave } from 'vue-router';
import GameTitleTop from './GameTitleTop.vue';

const api = useAPI();
const gameManager = useGameManager()

onBeforeRouteLeave(async (to, from) => {
  gameManager.question = null
  return true
});

let isPublished = ref(false);

function restartGame() {
  gameManager.startGame(null, true);
}
async function publish() {
  let res = await api.post("statistics/publish/", {
    id: gameManager.question.publishID[0],
  });
  console.log(res)
  isPublished.value = true;
}
</script>


<template>
  <div id="task-main">
    <GameTitleTop>
        <Knob :modelValue="gameManager.question.score" :min="0" :max="gameManager.question.target" disabled :size="200" />
        <div class="flex flex-column gap05">
        <Button v-if="!gameManager.game.extra.exam" class="p-button-rounded px-6 p-button-lg" :disabled="isPublished" @click="publish">
          {{ isPublished ? 'פורסם' : 'פרסם' }}
        </Button>
        <Button v-if="!gameManager.game.extra.exam" class="p-button-rounded px-6 p-button-sm" @click="restartGame">לשחק שוב</Button>
        </div>
    </GameTitleTop>
    <Divider />
    <PlayedGamesList />
  </div>
</template>


<script>
export default {
  components: { PlayedGamesList },
  name: "GameTitleOutro",
};
</script>


<style>
</style>