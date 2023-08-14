<script setup>
import useGameManager from 'src/utils/useGameManager';
import { ref } from 'vue';
import { real_url } from "../../utils/useAPI";

const gameManager = useGameManager()

function editQuestion(){
    let url = real_url + "quest/quest_view_rest/" + gameManager.question.q.id;
    window.open(url,'_target')
}

function skipQuestion(){
    if (gameManager.question.question_num == gameManager.progress.progress.length) endGame()
    else gameManager.lifeline_skip()
}

</script>

<template>
    <div>
        <h4 style="margin-bottom: 0;"> מידע לצוות</h4>
        <div v-if="gameManager.question.q?.id">
            שאלה: {{ gameManager.question.q.id }}, 
            סוג שאלה: {{ gameManager.question.q.display_template ?? gameManager.question.q.type }}, 
            רמת קושי: {{ gameManager.question.q.level }}, 
            סטטוס: {{ gameManager.question.q.status }}<br/>
            נושאים: {{ gameManager.question.q.subject }}, {{ gameManager.question.q.subject2 }}<br/>
            <span style="font-weight: bold;">משוב כללי:</span><span v-html="gameManager.question.q.feedback_general.text"></span><br/>
            <span v-for="a in gameManager.question.answers">
                <span style="font-weight: bold;">{{a.text}}:</span><span v-html="a.feedback_text.text"></span><br/>
            </span>
            <br/>
            <div class="flex">
                <Button @click="editQuestion" class="btnFull p-button-outlined p-button-sm" >עריכת השאלה</Button>
                <Button @click="skipQuestion" class="btnFull p-button-outlined p-button-sm">לשאלה הבאה</Button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
name:'Question4Staff'
};
</script>


<style>
@keyframes pulsing {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.pulsing{
    animation: pulsing 1s infinite;
}
.filteralert{
    color: red;
    background-color: white;
    padding: .5em;
    border-radius: .5em;
    font-size: 0.8em;
    margin-top: 0.5em;
}

button.filterQuest{display:unset;margin-right:1em;}
</style>