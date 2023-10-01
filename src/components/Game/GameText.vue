<script setup>
import useGameManager from '../../utils/useGameManager';
import ActionButton from '../ActionButton.vue';
import AjaxViewerVue from '../AjaxViewer.vue';
import { useRouter } from 'vue-router';

const gameManager = useGameManager()
const router = useRouter()

function nextQuestion() {
    gameManager.nextQuestion(false)
}

function showTree() {
    router.push({path: '/alltree'})
}

</script>


<template>
<div id='task-main'>
        <div id='task-main-top' style="padding:1em;">
            <div class='flex-column gap1'>
                <div>
                    קראו את הטקסט הבא ואחר כך לחצו על
                    <strong>המשך לשאלות</strong>
                    כדי לענות על השאלות המתייחסות לטקסט
                </div>
                <AjaxViewerVue :htmlWithScripts="gameManager.media.media" />
            </div>
        </div>
        <div class='flex gap05'>
            <action-button v-if="gameManager.isLashon" :center="true" :main="true" :style="'min-width:45%;'" @click="gameManager.NextGamePage"> המשך לתרגול </action-button>
            <action-button v-else :center="true" :main="true" @click="nextQuestion" :style="'min-width:45%;'"> המשך לשאלות </action-button>
            <action-button v-if="gameManager.isLesson" :center="true" :main="true" :style="'min-width:45%;'" @click="showTree"> חזרה למאגר הנושאים </action-button>
        </div>
    </div>
</template>


<script>

export default {
name:'GameText'
};
</script>


<style>
</style>