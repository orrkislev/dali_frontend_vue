<script setup>
import Header from "./components/Header.vue";
import MainContent from "./components/MainContent.vue";
import SideBar from "./components/SideBar.vue";
</script>


<template>
  <Header />
  <div id="mainLayout">
    <main-content>
      <router-view></router-view>
    </main-content>
    <side-bar />
  </div>
</template>


<script>
export default {
  name: "App",
};
</script>


<style>
body {
  margin: 0;
  background: linear-gradient(12deg, #92c7d5, #e1ebed) fixed;
  direction: rtl;
}
#app {
  max-width: 77em;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
#mainLayout {
  display: flex;
  gap: 1em;
}
</style>
