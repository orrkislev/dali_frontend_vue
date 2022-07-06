<script setup>
import useGameManager from "src/utils/useGameManager";
import ActionButton from "../ActionButton.vue";
import GameIntroTeacher from "./teachers/GameIntro-Teacher.vue";
import PlayedGamesList from "./PlayedGamesList.vue";
import GameLeaderboard from "./GameLeaderboard.vue";
import useAuth from "src/utils/useAuth";
import GameTitleTop from './GameTitleTop.vue';

const gameManager = useGameManager();
const auth = useAuth();

function getDescription() {
  if (gameManager.game?.subj.description.length > 1)
    return gameManager.game.subj.description;
  if (gameManager.game?.game.description)
    return gameManager.game.game.description;
  return "no description";
}
function startGame() {
  gameManager.startGame();
}
function startLevel(level) {
  gameManager.startGame(level);
}
function startTeacherWalkthrough() {
  gameManager.startGame(null,null,{teacher:true});
}
function startMobileGame() {
  console.log("start mobile");
}
</script>

<template>
  <div id="task-main" v-if="gameManager.game">
    <game-title-top>
      <h3 v-if="gameManager.game?.extra.exam">בוחן</h3>
      <div v-html="getDescription()"></div>
      <div v-if="gameManager.game.sub_games.length > 0">
            במשחק {{ gameManager.game.sub_games.length }} שלבים:
            <div v-for="(subgame, i) in gameManager.game.sub_games" :key="i">
              שלב {{ i + 1 }} עם {{ subgame.game.NumQuestions }} שאלות
            </div>
      </div>
      <div v-else> במשחק {{ gameManager.game?.game.NumQuestions }} שאלות </div>
      <div v-if="gameManager.game?.levels" class="flex flex-column gap-2">
        <Button class="p-button-rounded px-8" v-for="level in gameManager.game.levels" :key="level.order" @click="startLevel(level)" >
          {{ level.title }}
        </Button>
      </div>
      <div v-else-if="auth.isTeacherOrStaff && gameManager.game.allow_teacher_test" class="p-buttonset">
        <Button class="p-button-rounded px-6" @click="startGame">
          התחל <span v-if="gameManager.game?.extra.exam">&nbsp; בוחן</span>
        </Button>
        <Button class="p-button-rounded p-button-secondary" @click="startTeacherWalkthrough">
          מעבר מורה
        </Button>
      </div>
      <div v-else>
        <Button class="p-button-rounded px-8" @click="startGame">
          התחל <span v-if="gameManager.game?.extra.exam">&nbsp; בוחן</span>
        </Button>
      </div>
    </game-title-top>
    <game-intro-teacher />
    <PlayedGamesList />
    <game-leaderboard />
  </div>
</template>

<script>
export default {
  components: {
    PlayedGamesList,
    ActionButton,
    GameIntroTeacher,
    GameLeaderboard,
    GameTitleTop,
  },
  name: "GameTitleIntro",
};
</script>

<style></style>
