<script setup>
import useGameManager from "src/utils/useGameManager";
import useEmitter from "src/utils/useEmmiter";
import ActionButton from "../../ActionButton.vue";

const gameManager = useGameManager();
const emitter = useEmitter()

emitter.subscribe("CHECK_QUESTION", check);


function check() {
  gameManager.submitQuestion(0, []);
}

</script>


<template>
  <div>
    <div class='notsupported'>
    מצטערים - סוג שאלה זה לא נתמך עדיין<br/>
    לחצו על "בדיקה" על מנת להמשיך.
    </div>
  </div>
</template>


<script>
export default {
  components: { ActionButton },
  name: "Question_NotSupported", 
};
</script>


<style>
div.notsupported{font-size:18px;color:red;}
</style>