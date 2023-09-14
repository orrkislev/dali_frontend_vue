<script setup>
import useGameManager from '../utils/useGameManager';
import SendComment from "../components/SideBar/SendComment.vue";


const gameManager = useGameManager()

</script>


<template>
  <div id="mimshak_outer">
    <div id="mimshak_top">
      <div id="mimshak_top_right">
        <img class="mimshak_logo" :src="api.newSiteImages('home_top_logo.png')" @click="startAuth" />
        <img class="mimshak_logo" :src="api.newSiteImages('mimshak_logo.png')" @click="startAuth" />
      </div>
      <div id="mimshak_top_left">
        כלים שלובים
      </div>
    </div>
    <div id="mimshak_inner">
      <div id="mimshak_game_titles" v-if="gameManager.game">
        <div id="mimshak_game_title">{{ gameManager.game?.game.name }}</div>
        עקבו אחר ההנחיות לביצוע המשימה הבאה.<br/>
        תוכלו לחזור על המשימה שוב ושוב עד שתגיעו לתוצאה הרצוייה. <br/>
        לסיום, פרסמו את התוצאה הטובה ביותר שהישגתם.
      </div>
      <div id="mimshak_dali_container">
        <slot></slot>
      </div>
    </div>
    <div class='centerdiv' style="display:table;border: 2px solid #3a7fce;border-radius:20px;margin:20px;"><send-comment /></div>
  </div>
</template>


<script>
export default {
  name: "Mimshak",
};
</script>


<style>
  #mimshak_outer {
    background: white;
    height: 100%;
    width: 100%;
    padding: 0 3em;
  }
  #mimshak_inner {
    background: #F3F6FA;
    border-radius: 1em;
    padding: 2em;
  }
  #mimshak_top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2em 0;
  }
  #mimshak_top_right{
    display: flex;
    gap: 3em;
  }
  .mimshak_logo {
    height: 4em;
    padding: 0.5em 1em;
    border-radius: .6em;
    box-shadow: 0px 3px 15px 5px rgba(0,0,0,0.1);
  }
  #mimshak_game_titles{
    color: #394A66;
  }
  #mimshak_game_title{
    font-size: 2em;
    font-weight: bold;
  }
  #mimshak_dali_container{
    margin: 2em 10em;
  }
</style>