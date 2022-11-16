<script setup>
import useGameManager from '../../utils/useGameManager';
import ActionButton from '../ActionButton.vue';
import AjaxViewerVue from '../AjaxViewer.vue';

const gameManager = useGameManager()

function nextQuestion() {
    gameManager.nextQuestion(false)
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
        <div class='flex-column gap05'>
            <action-button :center="true" :main="true" @click="nextQuestion"> המשך לשאלות </action-button>
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