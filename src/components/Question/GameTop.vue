<script setup>
import useGameManager from 'src/utils/useGameManager'
import SendComment from "src/components/SideBar/SendComment.vue";
// import ProgressBar from 'primevue/progressbar';

const gameManager = useGameManager()

</script>

<template>
  <div id='game_top'>
        <div id='game_title'>{{ gameManager.game.game.name }}</div>
        <div id='score'>
            <!-- <ProgressBar :value="gameManager.progress?.score" class='w-5'>
                {{ gameManager.progress?.score }} נקודות
            </ProgressBar> -->
            <span v-if='gameManager.progress?.bonus' style="color:orange;"><i class="fa fa-sm fa-gift"></i>10+</span>
            {{ gameManager.progress?.score }} נקודות
            <send-comment/>
        </div>
    </div>
</template>

<script>
export default {
    name:'GameTop'
}
</script>

<style>
#game_top{
    margin: 0 2em 2em 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#game_title{
    font-size: x-large;
}
</style>