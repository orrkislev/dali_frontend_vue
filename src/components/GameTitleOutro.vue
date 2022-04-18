<script setup>
import { ref } from 'vue-demi';
import useAPI from "../utils/useAPI";
import useGameManager from "../utils/useGameManager";
import PlayedGamesList from "./PlayedGamesList.vue";

const api = useAPI();
const gameManager = useGameManager()

let isPublished = ref(false);

function restartGame() {
  gameManager.startGame(null, true);
}
async function publish() {
  let res = await api.post("/statistics/publish/", {
    id: gameManager.question.publishID[0],
  });
  isPublished.value = true;
}
</script>


<template>
  <div id="task-main">
    <div id="task-main-top" style="padding: 1em">
      <h3>{{ gameManager.game.game.name }}</h3>
      <div class="flex-column gap1">
        {{ gameManager.question.reason }}
        <div style="display: grid; place-items: center">
          <div
            style="
              display: flex;
              flex-direction: row-reverse;
              align-items: baseline;
              font-family: SecularOne;
            "
          >
            <span style="font-size: 5em">{{ gameManager.question.score }}</span>
            <span style="font-size: 2em; transform: scaleY(2)">/</span>
            <span style="font-size: larger">{{ gameManager.question.target }}</span>
          </div>
        </div>
        <button v-if="!gameManager.game.extra.exam" disabled="isPublished" @click="publish">
          {{ isPublished ? 'פורסם' : 'פרסם' }}
        </button>
      </div>

      <PlayedGamesList />
    </div>
    <div class="flex-column gap05">
      <button v-if="!gameManager.game.extra.exam" @click="restartGame">לשחק שוב</button>
    </div>
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