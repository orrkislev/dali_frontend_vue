<script setup>
import SideBarUser from "./SideBarUser.vue";
import SideBarLinks from "./SideBarLinks.vue";
import Survey from "./Survey.vue";
import SendComment from "./SendComment.vue";
import SideBarBest from "./SideBarBest.vue";
import useBrowseManager from 'src/utils/useBrowseManager';
import useEmitter from "../../utils/useEmmiter";

const browseManager = useBrowseManager();
const emitter = useEmitter()

emitter.subscribe('GAME_ENDED', sidebar_view_show);
emitter.subscribe('GAME_STARTS', sidebar_view_hide)

function sidebar_view_hide(){
  $("#sidebar").hide(300)
}
function sidebar_view_show(){
  $("#sidebar").show(300)
}

function add2Favories(){

}

</script>


<template>
  <div v-if="!browseManager.isMobile" id="sidebar">
    <side-bar-user />
    <send-comment />
    <survey />
    <side-bar-best />
    <side-bar-links />
  </div>
</template>


<script>
export default {
  components: {  SideBarUser },
  name: "SideBar",
};
</script>


<style>
#sidebar {
  /*visibility: hidden;*/
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
.sideBarElement {
  border-radius: 0.5em;
  background: white;
  padding: 0.5em;
}
.sideBarElement-dark {
  background:#396672;
  color:white;
}

</style>
