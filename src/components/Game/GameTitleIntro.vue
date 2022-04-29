<script setup>
import useGameManager from "../../utils/useGameManager";
import ActionButton from "../ActionButton.vue";
import GameIntroTeacher from "./teachers/GameIntro-Teacher.vue";
import PlayedGamesList from "./PlayedGamesList.vue";
import GameLeaderboard from './GameLeaderboard.vue';
import useAuth from '../../utils/useAuth';

const gameManager = useGameManager();
const auth = useAuth()

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
function startTeacherWalkthrough(){
  console.log('start teacher')
}
function startMobileGame(){
console.log('start mobile')
}
</script>


<template>
  <div id="task-main">
    <div class="flex gap-1">
      <div class="w-5 h-20rem">
        <!-- <img :src="'http://da-li.co.il'+gameManager.game.game.game_icon_name" class='h-full bg-cover'/> -->
        <div
          class="h-full bg-cover"
          :style="{
            backgroundImage:
              'url(http://da-li.co.il' +
              gameManager.game.game.game_icon_name +
              ')',
          }"
        />
      </div>
      <div class="h-20rem flex flex-column justify-content-between">
        <div>
          <h1>{{ gameManager.game?.game.name }}</h1>
          <div v-if="gameManager.game?.extra.exam">
            <h3>בוחן</h3>
          </div>
          <div v-html="getDescription()"></div>
          <div v-if="gameManager.game.sub_games.length > 0">
            במשחק {{ gameManager.game.sub_games.length }} שלבים:
            <div v-for="(subgame, i) in gameManager.game.sub_games" :key="i">
              שלב {{ i + 1 }} עם {{ subgame.game.NumQuestions }} שאלות
            </div>
          </div>
          <div v-else>
            במשחק {{ gameManager.game?.game.NumQuestions }} שאלות
          </div>
        </div>
        <div v-if="gameManager.game?.levels">
          <button
            v-for="level in gameManager.game.levels"
            :key="level.order"
            @click="startLevel(level)"
          >
            {{ level.title }}
          </button>
        </div>
        <div v-if="['stuff', 'teacher'].includes(auth.role)" class="p-buttonset">
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
      </div>
    </div>
    <PlayedGamesList />
    <Divider />
    <game-leaderboard />
    <Divider />
    <game-intro-teacher />
  </div>
</template>


<script>
export default {
  components: { PlayedGamesList, ActionButton, GameIntroTeacher, GameLeaderboard },
  name: "GameTitleIntro",
};
</script>


<style>
</style>