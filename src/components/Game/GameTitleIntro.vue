<script setup>
import useGameManager from "src/utils/useGameManager";
import ActionButton from "../ActionButton.vue";
import GameIntroTeacher from "./teachers/GameIntro-Teacher.vue";
import PlayedGamesList from "./PlayedGamesList.vue";
import GameLeaderboard from "./GameLeaderboard.vue";
import useAuth from "src/utils/useAuth";
import useEmitter from 'src/utils/useEmmiter';
import useAPI from '../../utils/useAPI';
import GameTitleTop from './GameTitleTop.vue';
import { ref } from "vue";
import { useRoute } from "vue-router";
import { collapseTransitionLight } from "naive-ui/lib/collapse-transition/styles";

const gameManager = useGameManager();
const auth = useAuth();
const route = useRoute();
const isSEL = route.path.includes('/game_sel')
const api = useAPI()
const emitter = useEmitter()

var chooseTeacherGameType = ref(false)
const displayPublishDialog = ref(false)
const publishID  = ref("")
const groupPublishErrorMessage = ref("")
const groupPublishSuccess = ref(true)

// function getDescription() {
// 	if (gameManager.game?.subj.description.length > 1)
// 		return gameManager.game.subj.description.replace('\n', '<br>').replace('\r', '<br>');
// 	if (gameManager.game?.game.description)
// 		return gameManager.game.game.description.replace('\n', '<br>').replace('\r', '<br>');
// 	return "no description";
// }
emitter.emit('GAME_ENDED')

function startGame(gameType) {
	gameManager.view = 'wait'
	emitter.emit('GAME_STARTS')
	if (gameType == null){
		if (auth.isTeacherOrStaff && gameManager.game.classData?.filtered_game){
			chooseTeacherGameType = true
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


async function groupPublishGame()
{
		api.post(`statistics/publishgroup/`, {'id':publishID.value,'publish':'true'}).then((res) => {
    	if (res.external_continue_url){
			window.location.href = res.external_continue_url;
		}
		if (res.rc){
			publishDialogStatus(false)
			emitter.emit('UPDATE_GAMELIST')
		}
		else{
			if (res.reason == 'too long') 
				groupPublishErrorMessage.value = 'עבר זמן ארוך מידי מרגע הפרסום. לא ניתן לפרסם'
			else 
				groupPublishErrorMessage.value = 'מספר לא תקין - נסו שוב'
			groupPublishSuccess.value = false
		}
	})
}

async function endTask() {
  let res = await api.post("statistics/publish/",{id: 0,publish:'endgame'}).then((res) => {
    if (res.external_continue_url)
    {
      window.location.href = res.external_continue_url;
    } 
  });
}

function publishDialogStatus(mode)
{
	displayPublishDialog.value = mode
	groupPublishSuccess.value = true
	groupPublishErrorMessage.value = ""
	publishID.value = ""
}
</script>

<template>
	<div id="task-main" v-if="gameManager.game">
		<game-title-top>
			<h3 v-if="gameManager.game?.extra.exam">בוחן</h3>
			<div v-if="gameManager.game?.game.description" v-html="gameManager.game?.game.description"></div>
			<div v-else v-html="gameManager.game?.subj.description"></div>
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
				<div v-else-if="auth.isTeacherOrStaff && !isSEL" class="p-buttonset">
					<template v-if="!gameManager.game.classData?.filtered_game">
						<Button class="p-button-rounded px-6" @click="()=>startGame()">
							התחלת משחק <span v-if="gameManager.game?.extra.exam">&nbsp; בוחן</span>
						</Button>
					</template>
					<template v-else>
						<Button class="p-button-rounded p-button-secondary" @click="()=>startGame('filtered')">משחק מסונן</Button>
						<Button class="p-button-rounded" @click="()=>startGame('normal')">משחק מלא</Button>
					</template>
					<Button v-if="gameManager.game.allow_teacher_test" class="p-button-rounded p-button-secondary" @click="startTeacherWalkthrough"> מעבר מורה </Button>
				</div>
				<div v-else>
					<template v-if="gameManager.game.sel_group_game && isSEL">
						<hr>
						<div class="notice">
							במשחק קבוצתי כל חברי הקבוצה משחקים מול מסך אחד.<br/>
							בחרו במחשב של מי מחברי הקבוצה אחם משחקים.<br/>
							רק במחשב זה - לחצו על "התחלת משחק"<br/>
						עברו על השאלות וענו ביחד. קיימו דיונים והחלטות משותפות על מנת לענות כקבוצה.<br/>
						לא הצלחתם? לא נורא - התחילו משחק חדש ונסו שוב.<br/>
						הצלחתם? כל הכבוד! פרסמו את המשחק<br/>
						<br/>
						בפרסום המשחק תקבלו קוד לפרסום הקבוצתי.
						כל אחד יחזור למחשב שלו/ה ללחוץ על "פרסום קבוצתי". <br/>
						הכניסו את הקוד המשותף והפרסום יירשם לכל אחד ואחת מכם.<br/>
						<br/>
						בהצלחה.<br/></div>
						<div class="p-buttonset" style="display:flex;">
						<Button class="p-button-rounded px-6" @click="()=>startGame()">התחלת משחק</Button>
						<Button class="p-button-rounded p-button-secondary" @click="publishDialogStatus(true)">פרסום קבוצתי</Button>
						<Button @click="endTask()" class="btnFull p-button-warning p-button-rounded btnFull-center">סיום</Button>
						</div>
						<Dialog header="פרסום קבוצתי" v-model:visible="displayPublishDialog" modal>
							הכניסו את מספר הפרסום שקיבלתם במחשב שבו שיחקתם את המשחק הקבוצתי:<br/>
							<div class="centerdiv">
								<InputText type='text' v-model='publishID' class="my-2" /><br/>
								<br/>
									<button class="btnFull p-button-rounded px-6 btnFull-center" style="display:unset;font-size:18px;" @click="groupPublishGame()">פרסום</button>
									<button class="btnFull p-button-rounded px-6 btnFull-center" style="display:unset;font-size:18px;" @click="publishDialogStatus(false)">סגירה</button>
								<br/>
								<span v-if="!groupPublishSuccess" v-html="groupPublishErrorMessage"></span>
							</div>
						</Dialog>
					</template>
					<Button v-if="!gameManager.unauthorized_types.includes(gameManager?.game?.game.authorization_type)" class="p-button-rounded px-8" @click="()=>startGame()">
						התחלת משחק <span v-if="gameManager.game?.extra.exam">&nbsp; בוחן</span>
					</Button>
					<h3 v-else>לא ניתן לשחק - סיימת את מכסת משחקי הנסיון מסוג זה</h3>
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
.notice{background-color:#e1ebed;margin:10px;padding:10px;}
</style>
