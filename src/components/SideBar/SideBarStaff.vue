<script setup>
import useAuth from 'src/utils/useAuth';
import useGameManager from 'src/utils/useGameManager';

const gameManager = useGameManager()
const auth = useAuth()

function endGame(){
    gameManager.question.action = 'game ended'
    gameManager.question.target = 100
    gameManager.view = 'title'
}
</script>


<template>
    <div class="sideBarElement" v-if="['teacher','stuff'].includes(auth.role)">
        למורים ולצוות
        <div v-if="gameManager.question">
            <div v-if="gameManager.question.q?.id">שאלה {{ gameManager.question.q.id }}</div>
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