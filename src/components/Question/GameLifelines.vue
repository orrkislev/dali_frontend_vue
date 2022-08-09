<script setup>
import { ref } from "vue-demi";
import useEmmiter from "src/utils/useEmmiter";
import useGameManager from "src/utils/useGameManager";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useConfirm } from "primevue/useconfirm";
import Badge from 'primevue/badge';



const gameManager = useGameManager();
const emitter = useEmmiter();


const lifelines = ref({
  skip: { text:'', name:'דלג',icon: "forward", active: true, default: true, afterQ: false, qadmin:false},
  retry: { text:'', name:'נסה שוב',icon: "undo",active: true, default: false, afterQ: true },
  replace: { text:'', name:'החלף שאלה',icon: "random", active: true, default: true, afterQ: false, qadmin:false},
  stats: { text:'', name:'סטטיסטיקה', icon: "chart-bar", active: true, default: true, afterQ: false, },
  5050: { text:'', name:'50:50', icon: "balance-scale", active: true, default: true, afterQ: false, yesno: false,},
});
const initialValues = { ...lifelines.value };

function activateLifeline(name) {
  if (lifelines.value[name].active) {
    let newLifelines = { ...lifelines.value };
    if (name!=='retry') newLifelines[name].active = false;
    lifelines.value = newLifelines;
  } else if (gameManager.progress.bonus) {
    let newProgress = { ...gameManager.progress };
    newProgress.bonus = false;
    gameManager.progress = newProgress;
  }
  if (name == "5050") lifeline_5050();
  if (name == "stats") lifeline_stats();
  if (name == "retry") gameManager.lifeline_retry();
  if (name == "skip") gameManager.lifeline_skip();
  if (name == "replace") gameManager.lifeline_replace();
}

function restart() {
  gameManager.startGame({ restart: true });
  lifelines.value = initialValues;
}
function isActive(lifeline, name) {
  if (!gameManager.question) return false;
  if (name == "retry" && gameManager.questionResult?.result == 1) return false;

  const gameSettings = (gameManager.game && gameManager.game.game[name]) ?? true;
  if (!gameSettings) return false;

  let activeState = gameManager.questionResult?.result != null ? "afterQ" : gameManager.question.q.type;
  if (gameManager.progress.progress[0]=='admin') activeState = "qadmin"
  const lifelineState = lifeline[activeState] ?? lifeline.default;
  if (!lifelineState) return false;

  if (!lifeline.active && gameManager.progress.bonus) return "bonus";
  if (!lifeline.active) return false;
  return true;
}
function lifeline_stats() {
  emitter.emit("LIFELINE_STATS");

  const questionResult = { ...gameManager.questionResult };
  questionResult.usedStats = true;
  gameManager.questionResult = questionResult;
}
function lifeline_5050() {
  console.log("50:50");
  emitter.emit("LIFELINE_5050");
  const questionResult = { ...gameManager.questionResult };
  questionResult.used5050 = true;
  gameManager.questionResult = questionResult;
}

const confirm = useConfirm()
function click(event,lifeline, name) {
  confirm.require({
      target: event.currentTarget,
      group: 'lifeline',
      message: lifeline.text,
      // icon: 'pi pi-exclamation-triangle',
      acceptLabel:lifeline.name,
      rejectLabel:'ביטול',
      accept: () => {
          if (isActive(lifeline, name) == false) return;
          activateLifeline(name)
      },
      reject: () => {
          // 
      }
  })
} 
</script>



<template>
  <ConfirmPopup group="lifeline"></ConfirmPopup>
  <div v-if="gameManager.game && gameManager.game?.extra.exam" class="text-white">
    יש לסיים את כל השאלות. לא ניתן יהיה לחזור לבוחן אם תצאו לפני תום כל השאלות!
  </div>
  <div v-else>
    <!-- <div class="task-lifeline" v-on:click="restart()">
      <font-awesome-icon icon="undo" size="lg"/>
    </div> -->

    <div class="flex" style="gap: 4px">
      <Button class="p-button-sm p-button-rounded overflow-visible "
        v-for="(lifeline, name) in lifelines"
        :key="name"
        @click="click($event,lifeline, name)"
        :disabled="!isActive(lifeline, name)"
      >
        <font-awesome-icon v-bind:icon="lifeline.icon" size="lg"/>
        <div
          v-if="!lifeline.active && gameManager.progress?.bonus"
          class="task-lifeline-bonus" 
        >
          <Badge style="font-size: 2rem" severity="danger"></Badge>
          <!-- <font-awesome-icon icon="fa-sm gift" /> -->
        </div>
      </Button>
    </div>
  </div>
</template>



<script>
export default {
  name: "GameLifelines",
};
</script>




<style>
.task-lifeline-container {
  padding: 0.2em;
  margin: 0 -0.2em;
  border-radius: 10px;
}
.task-lifeline {
  cursor: pointer;
  height: 2.25em;
  width: 2.25em;
  border-radius: 10px;
  background-color: #4ecdc4;
  display: grid;
  place-items: center;
  color: white;
  transition: all 200ms ease-in-out;
  position: relative;
}
.task-lifeline-inactive {
  background-color: #33807a;
  color: #a3a3a3;
}
.task-lifeline-bonus {
  position: absolute;
  right: -0.3em;
  bottom: -0.5em;
  border-radius: 999px;
  display: grid;
  place-content: center;
}
.task-lifeline-staff {
  background-color: orangered;
}
</style>