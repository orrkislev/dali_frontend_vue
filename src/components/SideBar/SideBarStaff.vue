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
</script>


<template>
    <div class="sideBarElement" v-if="auth.isTeacherOrStaff">
        <div v-if="gameManager.question">
            <div v-if="gameManager.question.q?.id">שאלה {{ gameManager.question.q.id }}</div>
            <div v-if="gameManager.extra.teacher">
                <h4>התאמה אישית</h4>
                <button-small v-if="!gameManager.question.too_few" :border="true" @click="filterQuestion">
                    {{ gameManager.question.filterQuest ? 'החזר' : 'הסר'}}
                    שאלה
                </button-small>
                <div v-else>{{ "סיננתם הרבה שאלות. לא ניתן לסנן שאלות נוספות" }}</div>
                <div v-if="gameManager.question.filterQuest">שימו לב: בחרתם להסיר שאלה זו. השאלה לא תופיע במשחקי תלמידים.</div>
            </div>
            <Button @click="endGame" class="p-button-outlined p-button-sm">דלג לסוף המשחק</Button>
        </div>
    </div>
</template>


<script>
export default {
name:'SideBarStaff'
};
</script>


<style>
</style>