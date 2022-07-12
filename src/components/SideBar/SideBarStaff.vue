<script setup>
import useAuth from 'src/utils/useAuth';
import useGameManager from 'src/utils/useGameManager';
import { ref } from 'vue';
import useAPI from '../../utils/useAPI';
import ButtonSmall from '../ButtonSmall.vue';

const gameManager = useGameManager()
const auth = useAuth()
const api = useAPI()

function endGame(){
    gameManager.question.action = 'game ended'
    gameManager.question.target = 100
    gameManager.view = 'title'
}

async function filterQuestion(){
    const res = await api.post('quest/quest_filter_teacher/', {
        action: gameManager.question.filterQuest ? 'unfilter' : 'filter',
        quest_id: gameManager.question.q.id
    })
    console.log(res)
    if (res.rc == 'success'){
        if (gameManager.question.filterQuest) gameManager.question.filterQuest = false
        else gameManager.question.filterQuest = true
    }
}

function skipQuestion(){
    gameManager.lifeline_skip()
}
</script>


<template>
    <div class="sideBarElement" v-if="auth.isTeacherOrStaff">
        <div v-if="gameManager.question">
            <div v-if="gameManager.question.q?.id">שאלה {{ gameManager.question.q.id }}, 
                {{ gameManager.question.q.type ?? gameManager.question.q.display_template }}</div>
            <div v-if="gameManager.extra.teacher">
                <h4>התאמה אישית</h4>
                <button-small v-if="!gameManager.question.too_few" :border="true" @click="filterQuestion">
                    {{ gameManager.question.filterQuest ? 'החזר' : 'הסר'}}
                    שאלה
                </button-small>
                <div v-else>{{ "סיננתם הרבה שאלות. לא ניתן לסנן שאלות נוספות" }}</div>
                <div class='filteralert pulsing' v-if="gameManager.question.filterQuest">שימו לב: בחרתם להסיר שאלה זו. השאלה לא תופיע במשחקי תלמידים.</div>
                <Divider />
                <Button @click="skipQuestion" class="p-button-outlined p-button-sm">לשאלה הבאה</Button>
                <Button @click="endGame" class="p-button-outlined p-button-sm">דלג לסוף המשחק</Button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
name:'SideBarStaff'
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
</style>