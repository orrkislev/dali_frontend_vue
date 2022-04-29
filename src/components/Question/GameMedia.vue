<script setup>
import { ref } from "vue-demi";
import $ from 'jquery'
import useGameManager from "../../utils/useGameManager";
import useEmitter from "../../utils/useEmmiter";

const gameManager = useGameManager();

const emitter = useEmitter()
emitter.subscribe("SHOW_MEDIA", showMedia);

let open = ref(false);

function closeMedia() {
  open.value = false;
}

function showMedia(feedback){
  let scroll_to = null;

  open.value = true;
  setTimeout(() => {
    if ("sentences" in feedback) {
      feedback.sentences.forEach((sentence) => {
        $("#" + sentence[0]).addClass(sentence[1]);
        scroll_to = "#" + sentence[0]; //+ 150
      });
    }

    if (scroll_to) {
      $("#task-main").animate( {
          scrollTop: $(scroll_to).offset().top - $("#task-main").offset().top + $("#task-main").scrollTop() - 20,
        },
        1000
      );
    }
  }, 300);
}

function editMediaForDevelopment(media){
  return media.split('/static/').join('http://da-li.co.il/static/')
}
</script>


<template>
  <div>
    <div v-if="gameManager.media" id="gameMedia">
      <div v-if="open">
        <div v-append="editMediaForDevelopment(gameManager.media)"></div>
        <button @click="closeMedia">סגירה</button>
      </div>
      <button v-else @click="openMedia">לצפייה חוזרת בטקסט</button>
    </div>

    <div v-if="gameManager.question.q.type != 'mouseselect'" class='mt-5 flex justify-content-center'>
      <div v-for="(qmedia, i) in gameManager.question?.medias" :key="i" v-html="editMediaForDevelopment(qmedia)"></div>
    </div>
  </div>
</template>


<script>
export default {
  name: "GameMedia",
};
</script>


<style>
    .localimg{
        font-size: small;
        width: 100% !important;
    }
    .youtube{
        width: 100% !important;
        aspect-ratio: 16 / 9;
        height: unset !important;
    }

    #gameMedia{
        border-bottom: dashed 1px gray; 
        padding-bottom: 0.5em; 
        margin-bottom: 0.5em;
    }
    #showcase-caption-description-0{
        display: none !important;
    }
    .popcorn_footnote{
        width: unset !important;
        height: unset !important;
        font-weight: initial !important;
        font-size: initial !important;
        background-color: unset !important;
        font-style: italic;
        border: 1px dashed orange;
    }
    .disableButtons a{
        pointer-events: none;
    }
</style>