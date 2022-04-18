<script setup>
import { ref } from "vue-demi";
import useEmmiter from "../../utils/useEmmiter";
import useGameManager from "../../utils/useGameManager";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faForward, faUndo, faRandom, faChartBar, faBalanceScale, faGift } from '@fortawesome/free-solid-svg-icons'
library.add(faForward, faUndo, faRandom, faChartBar, faBalanceScale, faGift)

const gameManager = useGameManager();
const emitter = useEmmiter();

emitter.subscribe("LIFELINE_ACCEPT", activateLifeline);

const lifelines = ref({
  skip: { icon: "forward", active: true, default: true, afterQ: false, },
  retry: { icon: "undo",active: true, default: false, afterQ: true },
  replace: { icon: "random", active: true, default: true, afterQ: false, },
  stats: { icon: "chart-bar", active: true, default: true, afterQ: false, },
  5050: { icon: "balance-scale", active: true, default: true, afterQ: false, yesno: false,},
});
const initialValues = { ...lifelines.value };

function activateLifeline(name) {
  if (lifelines.value[name].active) {
    let newLifelines = { ...lifelines.value };
    newLifelines[name].active = false;
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

function click(lifeline, name) {
  if (this.isActive(lifeline, name) == false) return;
  activateLifeline(name)
}
function restart() {
  gameManager.startGame({ restart: true });
  lifelines.value = initialValues;
}
function isActive(lifeline, name) {
  if (!gameManager.question) return false;
  if (name == "retry" && gameManager.questionResult?.result == 1) return false;

  const gameSettings = gameManager.game.game[name] ?? true;
  if (!gameSettings) return false;

  const activeState = gameManager.questionResult?.result != null ? "afterQ" : gameManager.question.q.type;
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
  emitter.emit("LIFELINE_5050");
  const questionResult = { ...gameManager.questionResult };
  questionResult.used5050 = true;
  gameManager.questionResult = questionResult;
}
</script>

<template>
  <div v-if="gameManager.game?.extra.exam" class="text-white">
    יש לסיים את כל השאלות. לא ניתן יהיה לחזור לבוחן אם תצאו לפני תום כל השאלות!
  </div>
  <div v-else class="flex" style="justify-content: space-between">
    <div class="task-lifeline" v-on:click="restart()">
      <font-awesome-icon icon="undo" size="lg"/>
    </div>

    <div class="flex" style="gap: 4px">
      <div
        v-for="(lifeline, name) in lifelines"
        :key="name"
        v-on:click="click(lifeline, name)"
        class="task-lifeline"
        v-bind:class="{ 'task-lifeline-inactive': !isActive(lifeline, name) }"
      >
        <font-awesome-icon v-bind:icon="lifeline.icon" size="lg"/>
        <div
          v-if="!lifeline.active && gameManager.progress?.bonus"
          class="task-lifeline-bonus"
        >
          <font-awesome-icon icon="fa-sm gift" />
        </div>
      </div>
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
  bottom: -0.3em;
  color: chocolate;
  background-color: white;
  border-radius: 999px;
  width: 25px;
  height: 25px;
  display: grid;
  place-content: center;
}
.task-lifeline-staff {
  background-color: orangered;
}
</style>


<!---
<template id="alert-lifeline">
  <div>
    <h3 v-if="lifeline == 'lifeline_5050'">גלגל הצלה 50-50</h3>
    <h3 v-else-if="lifeline == 'lifeline_stats'">סטטיסטיקה</h3>
    <h3 v-else-if="lifeline == 'lifeline_retry'">נסיון נוסף</h3>
    <h3 v-else-if="lifeline == 'lifeline_skip'">דילוג על השאלה</h3>
    <h3 v-else-if="lifeline == 'lifeline_replace'">החלפת שאלה</h3>
    <div>
      <task-button :main="true" :center="true" @click="() => accept(lifeline)">אישור</task-button>
      <task-button :center="true" :border="true" @click="cancel">ביטול</task-button>
    </div>
  </div>
</template>

<script>
    Vue.component("alert-lifeline", {
        template: "#alert-lifeline",
        props: {
            lifeline: String
        },
        methods: {
            cancel(){
                EventBus.$emit('ALERT_CLEAR')
            },
            accept(name){
                name = name.replace('lifeline_','')
                EventBus.$emit('LIFELINE_ACCEPT',name)
                EventBus.$emit('ALERT_CLEAR')
            }
        }
    });
</script>
--->