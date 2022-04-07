<script setup>
import useGameManager from "../utils/useGameManager";
import PlayedGamesList from "./PlayedGamesList.vue";

const gameManager = useGameManager();
const game = gameManager.game;

function getDescription() {
  if (game?.subj.description.length > 1) return this.game.subj.description;
  if (game?.game.description) return this.game.game.description;
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
    <div id="task-main-top" style="padding: 1em">
      <h1>{{ game?.game.name }}</h1>
      <div v-if="game.extra.exam">
        <h3>בוחן</h3>
        יש לסיים את כל השאלות. לא ניתן יהיה לחזור לבוחן אם תצאו לפני תום כל השאלות!
      </div>
      <div class="flex-column gap1">
        <div v-html="getDescription()"></div>
        <div v-if="game.sub_games.length > 0">
          במשחק {{ game.sub_games.length }} שלבים:
          <div v-for="(subgame, i) in game.sub_games" :key="i">
            שלב {{ i+1 }} עם {{ subgame.game.NumQuestions }} שאלות
          </div>
        </div>
        <div v-else>במשחק {{ game?.game.NumQuestions }} שאלות</div>
        <PlayedGamesList />
      </div>
    </div>
    <div class="flex-column gap05">
      <div v-if="game.levels">
        <button v-for="level in game.levels" :key="level.order"
                @click="startLevel(level)">
          {{ level.title }}
        </button>
      </div>
      <div v-else>
        <button @click="startGame" >
          התחל <span v-if="game.extra.exam">&nbsp; בוחן</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: { PlayedGamesList },
  name: "GameTitleIntro",
};
</script>


<style>
</style>