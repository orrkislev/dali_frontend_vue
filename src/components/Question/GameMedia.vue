<script setup>
import { ref } from "vue-demi";
import useGameManager from "../../utils/useGameManager";
import useEmitter from "../../utils/useEmmiter";

const gameManager = useGameManager();
const question = gameManager.question;
const media = gameManager.media;

let open = ref(false);
let mediaToShow = ref(media);

function openMedia() {
  open.value = true;
}
function closeMedia() {
  if (open) {
    open.value = false;
    mediaToShow.value = media;
  }
}

const emitter = useEmitter();
emitter.on("SHOW_MEDIA", (feedback) => {
  mediaToShow.value = this.media;
  let scroll_to = null;

  openMedia();
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
});
</script>


<template>
  <div>
    <div v-if="media" id="gameMedia">
      <div v-if="open">
        <div class="disableButtons" v-append="mediaToShow"></div>
        <button @click="closeMedia" >
          סגירה
        </button>
      </div>
      <button v-else @click="openMedia">
        לצפייה חוזרת בטקסט
      </button>
    </div>

    <div v-if="question.q.type != 'mouseselect'">
      <div
        v-for="(qmedia, i) in question?.medias"
        :key="i"
        v-append="qmedia"
      ></div>
    </div>
  </div>
</template>


<script>
export default {
  name: "GameMedia",
};
</script>


<style>
</style>