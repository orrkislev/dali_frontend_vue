<script setup>
import useAPI from '../../utils/useAPI';
import useGameManager from '../../utils/useGameManager';
import ActionButton from '../ActionButton.vue';

const gameManager = useGameManager()
const api = useAPI()
async function submit(val){
    await api.post_json(`statistics/student_target_game/`, {target:val})
    gameManager.nextQuestion()
}
</script>

<template>
    <div>
        <h3>לפני שמתחילים</h3>
        <h4>מה היעד האישי שלך במשימה זו?</h4>

        <div class="game-survey-buttons">
            <div><ActionButton :center="true" :main="true" @click="submit('minimal')"> עובר </ActionButton></div>
            <div><ActionButton :center="true" :main="true" @click="submit('good')"> טוב </ActionButton></div>
            <div><ActionButton :center="true" :main="true" @click="submit('game_target')"> יעד המשימה </ActionButton></div>
            <div><ActionButton :center="true" :main="true" @click="submit('none')"> לא יודע.ת </ActionButton></div>
        </div>
    </div>
</template>
    
    
<script>
export default {
    name: 'GameSurvey'
};
</script>
    
    
<style>
    .game-survey-buttons {
        display: grid;
        grid-template-columns: auto auto;
        gap: 1em;
        column-gap: 1em;
        width: 1px;
    }
</style>