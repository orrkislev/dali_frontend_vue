<script setup>
import { ref } from "vue-demi";
import useGameManager from "src/utils/useGameManager";
import useEmitter from "src/utils/useEmmiter";
import ActionButton from "../ActionButton.vue";
import AjaxViewer from "../AjaxViewer.vue";
import { notificationDark } from "naive-ui";

const gameManager = useGameManager();

const emitter = useEmitter()
emitter.subscribe("SHOW_MEDIA", showMedia);

function showMedia(feedback){    
  openMedia()
  feedback = gameManager.question.q.feedback_general
  let scroll_to = null;

  setTimeout(() => {
    if ("sentences" in feedback) {
      feedback.sentences.forEach((sentence) => {
        document.getElementById(sentence[0]).classList.add(sentence[1]);
        scroll_to = document.getElementById(sentence[0])
      });
    }

    if (scroll_to) {
      window.scroll({
        top: scroll_to.offsetTop - 150,
        left: 0,
        behavior: "smooth",
      });
    }
  }, 300);
}

function openMedia(){
  gameManager.media.open = true;
}
function closeMedia(){
  gameManager.media.open = false;
}

function editMediaForDevelopment(media){
  //TODO update when production
  //if (process.env.NODE_ENV=='development') return media.split('/static/').join('http://da-li.co.il/static/') 
  //return media

  var mymedia = media.split('/static/').join('http://da-li.co.il/static/') //TODO update when production
  //return media.split('/static/').join('http://da-li.co.il/static/') //TODO update when production
  var node = document.createElement("div");
  node.innerHTML = media;
  nodeScriptReplace(node);
  return media
}


</script>


<template>
  <div>
    <div v-if="gameManager.media.media" id="gameMedia">
      <action-button v-if="gameManager.media.open" :border="true"  @click="closeMedia" icon="align-right">סגירה</action-button>
      <action-button v-else :border="true"  @click="openMedia" icon="align-right">לצפייה חוזרת בטקסט</action-button>
      <div v-if="gameManager.media.open">
        <AjaxViewer :htmlWithScripts="gameManager.media.media" />
        <action-button :border="true"  @click="closeMedia" icon="align-right">סגירה</action-button>
      </div>
    </div>

    <div v-if="gameManager.question.q.type != 'mouseselect'">
      <div v-for="(qmedia, i) in gameManager.question?.medias" :key="i" class='w-8 mx-auto media-area'>
        <AjaxViewer :htmlWithScripts="editMediaForDevelopment(qmedia)" />
      </div>
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
    .media-area>.disableButtons {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .disableButtons a{
        pointer-events: none;
    }
    .highlight{
        background-color: lightgreen;
    }
</style>