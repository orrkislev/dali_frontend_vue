<script setup>
import useGameManager from '../utils/useGameManager'
import Lifelines from './Lifelines.vue';

const gameManager = useGameManager()
const game = gameManager.game;
const question = gameManager.question;
const progress = gameManager.progress;

</script>

<template>
  <div class='mobile-top mobile-top-question'>
        <div class='flex space-between'>
            <div>
                <div class='text-white'>[[ game.game.name ]]</div>
                <div id='score'>
                    <span v-if='progress.bonus' style="color:orange;"><i class="fa fa-sm fa-gift"></i>10+</span>
                    [[ progress?.score ]] נקודות
                </div>
            </div>
        </div>
        <div v-if='game.extra.exam' class='text-white'>
            יש לסיים את כל השאלות. לא ניתן יהיה לחזור לבוחן אם תצאו לפני תום כל השאלות!
        </div>
        <Lifelines v-else />
    </div>
</template>

<script>
export default {
components: { Lifelines },
name:'GameTop'
}
</script>

<style>

</style>