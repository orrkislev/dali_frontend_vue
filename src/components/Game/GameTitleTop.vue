<script setup>
import useGameManager from "src/utils/useGameManager";
import { real_url } from "src/utils/useAPI";

const gameManager = useGameManager();
</script>

<template>
  <div class="flex gap-1">
    <div  v-if="!gameManager.isLashon" class="w-5 h-20rem ">
      <div
        class="h-full bg-cover-orit"
        :style="{
          backgroundImage:
            'url(' + real_url + gameManager.game.game.game_icon_name + ')',
        }"
      />
    </div>
    
    <div class="flex justify-content-center">
      <div class="flex flex-column px-4">
          <h1>{{ gameManager.game?.game.name }}</h1>
          <div class="flex flex-column justify-content-between h-full">
            <slot></slot>
          </div>
      </div>
    </div>   
  </div>
</template>

<script>
export default {
  name: "GameTitleTop",
};
</script>

<style></style>
