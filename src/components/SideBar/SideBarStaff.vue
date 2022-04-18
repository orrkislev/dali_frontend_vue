<script setup>
import useGameManager from '../../utils/useGameManager';

const gameManager = useGameManager()
</script>


<template>
    <div class="sideBarElement" v-if="gameManager.question?.school?.name == 'צוות'">
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