<script setup>
import useAPI from '../../utils/useAPI';
import useGameManager from '../../utils/useGameManager';
import ActionButton from '../ActionButton.vue';

const gameManager = useGameManager()
const api = useAPI()
async function submit(val){
    await api.post_json(`statistics/student_target_game/`, {target:val})
    gameManager.nextQuestion(false)
}
</script>

<template>
    <div>
        <h4>לפני שאתם ניגשים לענות על השאלות, הגדירו לעצמכם יעד למשימה.</h4>
        <div class="flex">
            זכרו, אתם יכולים לבצע את המשימה שוב ושוב בקצב שלכם עד להשגת היעד הרצוי. המורה תראה רק את הניקוד שתחליטו לפרסם.<br/>
            חשבו על הנקודות הבאות:<br/>
            </div>
            <ul>
                <li>עד כמה הנושא מעניין אותי</li>
                <li>עד כמה חשוב לי להצליח במשימה</li>
                <li>האם אסתפק בציון עובר או שארצה להשיג תוצאה יותר טובה? אולי הכי טובה</li>
            </ul>
            עכשיו, אחרי שחשבתם על כך -
             <h4>מה הציון שתרצו להשיג במשימה?</h4>
            
        <div class="game-survey-buttons">
            <div><ActionButton :center="true" :main="true" @click="submit('minimal')"> עובר (60)</ActionButton></div>
            <div><ActionButton :center="true" :main="true" @click="submit('good')"> טוב (80)</ActionButton></div>
            <div><ActionButton :center="true" :main="true" @click="submit('game_target')"> מצויין (100)</ActionButton></div>
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