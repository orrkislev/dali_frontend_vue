<script setup>
import Header from "./components/Header.vue";
import MainContent from "./components/MainContent.vue";
import SideBar from "./components/SideBar/SideBar.vue";
import Footer from "./components/Footer.vue";
</script>


<template>
  <ConfirmDialog></ConfirmDialog>
  <div id="allApp">
    <div id="allAppTop">
      <Header />
      <div id="mainLayout">
        <main-content>
          <router-view></router-view>
        </main-content>
        <side-bar />
      </div>
    </div>
    <Footer />
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

#allApp{
  max-width: 84em;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#allAppTop {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

#mainLayout {
  display: flex;
  gap: 1em;
}
</style>
