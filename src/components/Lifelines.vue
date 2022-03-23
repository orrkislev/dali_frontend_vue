<script setup>
import useEmitter from "../utils/useEmmiter";
import useGameManager from "../utils/useGameManager";

const gameManager = useGameManager();
const game = gameManager.game;
const question = gameManager.question;
const progress = gameManager.progress;
const questionResult = gameManager.questionResult;

function initialState() {
  return {
    skip: {
      icon: "fa fa-lg fa-forward fa-flip-horizontal",
      active: true,
      default: true,
      afterQ: false,
    },
    retry: {
      icon: "fa fa-lg fa-undo",
      active: true,
      default: false,
      afterQ: true,
    },
    replace: {
      icon: "fa fa-lg fa-random",
      active: true,
      default: true,
      afterQ: false,
    },
    stats: {
      icon: "fa fa-lg fa-chart-bar",
      active: true,
      default: true,
      afterQ: false,
    },
    5050: {
      icon: "fa fa-lg fa-balance-scale",
      active: true,
      default: true,
      afterQ: false,
      yesno: false,
    },
  };
}

const emitter = useEmitter();
emitter.on("LIFELINE_ACCEPT", (name) => {
  if (this.lifelines[name].active) {
    let newLifelines = { ...this.lifelines };
    newLifelines[name].active = false;
    this.lifelines = newLifelines;
  } else if (this.progress.bonus) {
    let newProgress = { ...globals.getters.progress };
    newProgress.bonus = false;
    globals.commit("setProgress", newProgress);
  }
  if (name == "5050") this.lifeline_5050();
  if (name == "stats") this.lifeline_stats();
  if (name == "retry") globals.dispatch("lifeline_retry");
  if (name == "skip") globals.dispatch("lifeline_skip");
  if (name == "replace") globals.dispatch("lifeline_replace");
});

function click(lifeline, name) {
  if (this.isActive(lifeline, name) == false) return;
  globals.commit("setAlert", { type: "lifeline_" + name });
}
function restart() {
  globals.dispatch("startGame", { restart: true });
  this.lifelines = initialState();
}
function isActive(lifeline, name) {
  if (!this.question) return false;
  if (name == "retry" && this.questionResult.result == 1) return false;

  const gameSettings = this.game.game[name] ?? true;
  if (!gameSettings) return false;

  const activeState =
    this.questionResult.result != null ? "afterQ" : this.question.q.type;
  const lifelineState = lifeline[activeState] ?? lifeline.default;
  if (!lifelineState) return false;

  if (!lifeline.active && this.progress.bonus) return "bonus";
  if (!lifeline.active) return false;
  return true;
}
function lifeline_stats() {
  EventBus.$emit("LIFELINE_STATS");
  globals.commit("updateQuestionResult", { usedStats: true });
}
function lifeline_5050() {
  EventBus.$emit("LIFELINE_5050");
  globals.commit("updateQuestionResult", { used5050: true });
}
function comment() {
  globals.commit("setAlert", { type: "comment" });
}
</script>

<template>
  <div class="flex" style="justify-content: space-between">
    <div class="task-lifeline" v-on:click="restart()">
      <i class="fa fa-lg fa-undo"></i>
    </div>

    <div class="flex" style="gap: 4px">
      <div
        v-if="question?.school?.name == 'צוות'"
        v-on:click="comment"
        class="task-lifeline task-lifeline-staff"
      >
        <i class="fa fa-lg fa-flag"></i>
      </div>
      <!-- <div v-for="(lifeline,name) in lifelines" class='task-lifeline-container' v-bind:style="{ background: 'linear-gradient(45deg, orange ' + (progress.bonus*100) + '%, transparent ' + (progress.bonus*100+1) + '%)' }"> -->
      <div
        v-for="(lifeline, name) in lifelines"
        :key="name"
        v-on:click="click(lifeline, name)"
        class="task-lifeline"
        v-bind:class="{ 'task-lifeline-inactive': !isActive(lifeline, name) }"
      >
        <i v-bind:class="lifeline.icon"></i>
        <div
          v-if="!lifeline.active && progress.bonus"
          class="task-lifeline-bonus"
        >
          <i class="fa fa-sm fa-gift"></i>
        </div>
      </div>
      <!-- <div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Lifelines",
};
</script>

<style>
.task-lifeline-container {
  padding: 0.2em;
  margin: 0 -0.2em;
  border-radius: 10px;
}
.task-lifeline {
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




// <template id="alert-lifeline">
//     <div>
//         <h3 v-if="lifeline=='lifeline_5050'">גלגל הצלה 50-50</h3>
//         <h3 v-else-if="lifeline=='lifeline_stats'">סטטיסטיקה</h3>
//         <h3 v-else-if="lifeline=='lifeline_retry'">נסיון נוסף</h3>
//         <h3 v-else-if="lifeline=='lifeline_skip'">דילוג על השאלה</h3>
//         <h3 v-else-if="lifeline=='lifeline_replace'">החלפת שאלה</h3>
//         <div>
//             <task-button :main='true' :center='true' @click='()=>accept(lifeline)'>אישור</task-button>
//             <task-button :center='true' :border='true' @click='cancel'>ביטול</task-button>
//         </div>
//     </div>
// </template>

// <script>
//     Vue.component("alert-lifeline", {
//         template: "#alert-lifeline",
//         props: {
//             lifeline: String
//         },
//         methods: {
//             cancel(){
//                 EventBus.$emit('ALERT_CLEAR')
//             },
//             accept(name){
//                 name = name.replace('lifeline_','')
//                 EventBus.$emit('LIFELINE_ACCEPT',name)
//                 EventBus.$emit('ALERT_CLEAR')
//             }
//         }
//     });
// </script>


