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
  //gameManager.loadGameData({taskID: route.params.taskid, extra:''})
  gameManager.view = 'wait'
  gameManager.startGame(false,true);
}
async function publish(is_publish) {
  let res = await api.post("statistics/publish/",{id: gameManager.question.publishID[0],publish:is_publish}).then((res) => {
    if (res.external_continue_url)
    {
      window.location.href = res.external_continue_url;
    }
    if (is_publish) isPublished.value = true;
    else backToGamePage()
  });
}
/*
async function complete() {
  let res = await api.post("statistics/publish/",{id: gameManager.question.publishID[0],publish:false}).then((res) => {
    if (res.external_continue_url)
    {
      window.location.href = res.external_continue_url;
    }
    else backToGamePage()
  });
}
*/
function backToGamePage() {
  gameManager.question=null
}

</script>


<template>
  <div id="task-main">
    <GameTitleTop >
        <Knob :modelValue="gameManager.question.score" :min="0" :max="gameManager.question.target" disabled :size="200" />
        <div class="flex flex-column gap05">
          <Button v-if="!gameManager.game.extra.exam && !gameManager.extra.teacher" class="btnFull p-button-rounded px-6 btnFull-center"  style="minWidth:100%"
            :disabled="isPublished" @click="publish(true)"
            :class="{'p-button-warning': isPublished}">
            {{ isPublished ? 'פורסם' : 'פרסום' }}
          </Button>
          <div><ActionButton :border="true" :center="true" @click="restartGame" class="p-button-rounded" style="minWidth:100%">התחלת משחק חדש </ActionButton></div>
          <div><ActionButton :border="true" :center="true" @click="backToGamePage" style="minWidth:100%">חזרה לדף המשימה</ActionButton></div>
         <div><Button v-if="gameManager.sel" @click="publish('endgame')" style="minWidth:100%" class="btnFull p-button-warning p-button-rounded btnFull-center">סיום</Button></div>
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