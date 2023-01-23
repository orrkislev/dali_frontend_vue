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
const displayDialog = ref(false)
const popUpData = ref("")


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
    //else backToGamePage()

    if (gameManager.game.sel_group_game) 
    {
      showPublishID(res.id)
    }
    
  });
}

function showPublishID(id)
{
  
  popUpData.value = id
  displayDialog.value = true
}

function closePublishDialog()
{
  popUpData.value = ""
  displayDialog.value = false
}

function backToGamePage() {
  console.log('backToGamePage. why are we here?')
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
        
        <Dialog header="פרסום קבוצתי" v-model:visible="displayDialog" modal>
          .כל אחד מחברי הקבוצה ילחצו על "פרסום קבוצתי" במחשב שלהם<br/>
          בהודעה שתעלה - יש להכניס את המספר הבא:<br/><br/>
          <div class="centerdiv">
            <span v-html="popUpData" style="font-size:40px;"></span><br/><br/>
            סגרו את ההודעה לאחר שכל חברי הקבוצה פרסמו אצלהם במחשב<br/><br/>
            <button class="btnFull p-button-rounded px-6 btnFull-center" style="display:unset;font-size:18px;" @click="closePublishDialog()">סגירה</button>
        </div>
        </Dialog>
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