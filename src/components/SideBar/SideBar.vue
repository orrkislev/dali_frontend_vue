<script setup>
import SideBarUser from "./SideBarUser.vue";
import Survey from "./Survey.vue";
import SendComment from "./SendComment.vue";
import SideBarBest from "./SideBarBest.vue";
</script>


<template>
  <div id="sidebar">
    <side-bar-user />
    <send-comment />
    <survey />
    <side-bar-best />
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
