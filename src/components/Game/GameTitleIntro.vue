<script setup>
import useGameManager from "src/utils/useGameManager";
import ActionButton from "../ActionButton.vue";
import GameIntroTeacher from "./teachers/GameIntro-Teacher.vue";
import PlayedGamesList from "./PlayedGamesList.vue";
import GameLeaderboard from "./GameLeaderboard.vue";
import useAuth from "src/utils/useAuth";
import GameTitleTop from './GameTitleTop.vue';
import { ref } from "vue";
import { useRoute } from "vue-router";

const gameManager = useGameManager();
const auth = useAuth();
const route = useRoute();
const isSEL = route.path.includes('/game_sel')

const chooseTeacherGameType = ref(false)

// function getDescription() {
// 	if (gameManager.game?.subj.description.length > 1)
// 		return gameManager.game.subj.description.replace('\n', '<br>').replace('\r', '<br>');
// 	if (gameManager.game?.game.description)
// 		return gameManager.game.game.description.replace('\n', '<br>').replace('\r', '<br>');
// 	return "no description";
// }


function startGame(gameType) {
	if (gameType == null){
		if (auth.isTeacherOrStaff && gameManager.game.classData?.filtered_game){
			chooseTeacherGameType.value = true
		} else {
			gameManager.startGame();
		}
	} else if (gameType=='normal'){
		gameManager.startGame();
	} else if (gameType=='filtered'){
		gameManager.startGame(null, null, { filtered:true });
	} else {
		gameManager.startGame(gameType);
	}
}

function startTeacherWalkthrough(walkthoughType) {
	gameManager.startGame(null, null, { teacher: true });
}
function startMobileGame() {
	console.log("start mobile");
}
</script>

<template>
	<div id="task-main" v-if="gameManager.game">
		<game-title-top>
			<h3 v-if="gameManager.game?.extra.exam">בוחן</h3>
			<div v-html="gameManager.game?.game.description"></div>
			<div v-html="gameManager.game?.subj.description"></div>
			
			<div v-if="gameManager.game.sub_games.length > 0">
				במשחק {{ gameManager.game.sub_games.length }} שלבים:
				<div v-for="(subgame, i) in gameManager.game.sub_games" :key="i">
					שלב {{ i + 1 }} עם {{ subgame.game.NumQuestions }} שאלות
				</div>
			</div>
			<div v-else> במשחק {{ gameManager.game?.game.NumQuestions }} שאלות </div>

			<div v-if="auth.username">
				<div v-if="gameManager.game?.levels" class="flex flex-column gap-2">
					<Button class="p-button-rounded px-8" v-for="level in gameManager.game.levels" :key="level.order"
						@click="startGame(level)">
						{{ level.title }}
					</Button>
				</div>
				<div v-else-if="auth.isTeacherOrStaff && gameManager.game.allow_teacher_test && !isSEL" class="p-buttonset">
					<template v-if="!chooseTeacherGameType">
						<Button class="p-button-rounded px-6" @click="()=>startGame()">
							התחל <span v-if="gameManager.game?.extra.exam">&nbsp; בוחן</span>
						</Button>
						<Button class="p-button-rounded p-button-secondary" @click="startTeacherWalkthrough"> מעבר מורה </Button>
					</template>
					<template v-else>
						<Button class="p-button-rounded p-button-secondary" @click="()=>startGame('filtered')">  התחל - משחק מסונן</Button>
						<Button class="p-button-rounded" @click="()=>startGame('normal')"> התחל - משחק מלא</Button>
					</template>
				</div>
				<div v-else>
					<Button class="p-button-rounded px-8" @click="()=>startGame()">
						התחל <span v-if="gameManager.game?.extra.exam">&nbsp; בוחן</span>
					</Button>
				</div>
			</div>
			<div v-else>
				היכנס או הירשם כדי לשחק
			</div>
		</game-title-top>

		<game-intro-teacher v-if="auth.isTeacherOrStaff && !route.path.includes('/game_sel')"/>
		<PlayedGamesList v-if="auth.username"/>
		<game-leaderboard v-if="auth.username"/>
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

<style>
</style>
