<script setup>
import SideBarUser from "./SideBarUser.vue";
import SideBarLinks from "./SideBarLinks.vue";
import Survey from "./Survey.vue";
import SendComment from "./SendComment.vue";
import SideBarBest from "./SideBarBest.vue";
import useBrowseManager from 'src/utils/useBrowseManager';
import useEmitter from "../../utils/useEmmiter";
import { real_url } from "../../utils/useAPI";
import { useConfirm } from "primevue/useconfirm"; 

const browseManager = useBrowseManager();
const emitter = useEmitter()
const confirm = useConfirm();

emitter.subscribe('GAME_ENDED', sidebar_view_show);
emitter.subscribe('GAME_STARTS', sidebar_view_hide)

function sidebar_view_hide(){
  $("#sidebar").hide(300)
}
function sidebar_view_show(){
  $("#sidebar").show(300)
}

async function gotoScience(){
  return await new Promise((resolve) => {
    confirm.require({
      message: 'האם אתם בטוחים? יציאה תעביר אתכם לאתר לימודי מדעים מבית דע-לי',
      header: 'מעבר לאתר מדעים',
      icon: "pi pi-exclamation-triangle",
      acceptLabel: 'כן, לעבור למדעים',
      rejectLabel: 'ביטול',
      accept: () => {
        window.open(real_url,"_self")
        },
      reject: () => {
        resolve(false)
      }})
    })    
  
}
</script>

<template>
  <div v-if="!browseManager.isMobile" id="sidebar">
    <side-bar-user />
    <send-comment />
  <!--
    <survey />
    <side-bar-best />
  -->
    <side-bar-links />
    <div class="sideBarElement sideBarComment" @click="gotoScience">
        <span class="text-white" >מעבר לאתר מדעים </span>
    </div>
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
