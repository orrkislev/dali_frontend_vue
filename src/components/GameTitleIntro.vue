<script setup>
import useGameManager from "../utils/useGameManager";
import ActionButton from './ActionButton.vue';
import PlayedGamesList from "./PlayedGamesList.vue";

const gameManager = useGameManager();

function getDescription() {
  if (gameManager.game?.subj.description.length > 1) return gameManager.game.subj.description;
  if (gameManager.game?.game.description) return gameManager.game.game.description;
  return "no description";
}
function startGame() {
  gameManager.startGame();
}
function startLevel(level) {
  gameManager.startGame(level);
}
</script>


<template>
  <div id="task-main">
    <div id="task-main-top" style="padding: 1em" v-if="gameManager.game">
      <h1>{{ gameManager.game?.game.name }}</h1>
      <div v-if="gameManager.game?.extra.exam">
        <h3>בוחן</h3>
        יש לסיים את כל השאלות. לא ניתן יהיה לחזור לבוחן אם תצאו לפני תום כל השאלות!
      </div>
      <div class="flex-column gap1">
        <div v-html="getDescription()"></div>
        <div v-if="gameManager.game.sub_games.length > 0">
          במשחק {{ gameManager.game.sub_games.length }} שלבים:
          <div v-for="(subgame, i) in gameManager.game.sub_games" :key="i">
            שלב {{ i+1 }} עם {{ subgame.game.NumQuestions }} שאלות
          </div>
        </div>
        <div v-else>במשחק {{ gameManager.game?.game.NumQuestions }} שאלות</div>
        <PlayedGamesList />
      </div>
    </div>
    <div class="flex-column gap05">
      <div v-if="gameManager.game?.levels">
        <button v-for="level in gameManager.game.levels" :key="level.order"
                @click="startLevel(level)">
          {{ level.title }}
        </button>
      </div>
      <div v-else>
        <action-button :main=true @click="startGame" >
          התחל <span v-if="gameManager.game?.extra.exam">&nbsp; בוחן</span>
        </action-button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: { PlayedGamesList, ActionButton },
  name: "GameTitleIntro",
};
</script>


<style>
</style>