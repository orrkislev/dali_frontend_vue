<script setup>
import useGameManager from "src/utils/useGameManager";

const gameManager = useGameManager();
</script>

<template>
  <div class="flex gap-1">
    <div class="w-5 h-20rem ">
      <!-- <img :src="'http://da-li.co.il'+gameManager.game.game.game_icon_name" class='h-full bg-cover'/> -->
      <div
        class="h-full bg-cover-orit"
        :style="{
          backgroundImage:
            'url(http://da-li.co.il' +
            gameManager.game.game.game_icon_name +
            ')',
        }"
      />
    </div>
    <div class="flex justify-content-center w-8">
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
