<script setup>
import { ref } from 'vue-demi';
import useAPI from "src/utils/useAPI";
import useGameManager from "src/utils/useGameManager";
import PlayedGamesList from "./PlayedGamesList.vue";
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import GameTitleTop from './GameTitleTop.vue';
import GameManageClasses from './teachers/GameManageClasses.vue';
import ActionButton from '../ActionButton.vue';

const api = useAPI();
const gameManager = useGameManager()
const route = useRoute()

onBeforeRouteLeave(async (to, from) => {
  gameManager.question = null
  return true
});

let isPublished = ref(false);

function restartGame() {
  gameManager.loadGameData({taskID: route.params.taskid, extra:''})
  gameManager.startGame();
}
async function publish() {
  let res = await api.post("statistics/publish/",{id: gameManager.question.publishID[0]}).then((res) => {
    if (res.external_continue_url)
    {
      window.location.href = res.external_continue_url;
    }
    isPublished.value = true;
  });
}

function backToGamePage() {
  gameManager.question=null
}
</script>


<template>
  <div id="task-main">
    <GameTitleTop >
        <Knob :modelValue="gameManager.question.score" :min="0" :max="gameManager.question.target" disabled :size="200" />
        <div class="flex flex-column gap05">
          <Button v-if="!gameManager.game.extra.exam && !gameManager.extra.teacher" class="p-button-rounded px-6 p-button-lg" 
            :disabled="isPublished" @click="publish"
            :class="{'p-button-warning': isPublished}">
            {{ isPublished ? 'פורסם' : 'פרסם' }}
          </Button>
          <!-- <Button v-if="!gameManager.game.extra.exam" class="p-button-secondary p-button-rounded px-6 p-button-sm" @click="restartGame">לשחק שוב</Button> -->
          <ActionButton :border="true" :center="true" @click="backToGamePage" style="minWidth:100%">חזרה לדף המשימה</ActionButton>
        </div>
    </GameTitleTop>
    
    <game-manage-classes v-if="gameManager.extra.teacher"/>
    <PlayedGamesList :publishedFirst="isPublished"/>
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