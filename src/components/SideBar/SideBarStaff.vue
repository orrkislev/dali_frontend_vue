<script setup>
import useAuth from '../../utils/useAuth';
import useGameManager from '../../utils/useGameManager';

const gameManager = useGameManager()
const auth = useAuth()
</script>


<template>
    <div class="sideBarElement" v-if="['teacher','stuff'].includes(auth.role)">
        למורים ולצוות
        <div v-if="gameManager.question">
            <small v-if="gameManager.question.q?.id">שאלה {{ gameManager.question.q.id }}</small>
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