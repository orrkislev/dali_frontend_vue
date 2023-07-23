<script setup>
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar/SideBar.vue";

import Landing from "./pages/landing.vue";
import useAuth from "./utils/useAuth";
import { real_url } from "./utils/useAPI";
import { useRoute } from "vue-router";
import { watch } from "vue";
import Mimshak from "./components/Mimshak.vue";

const route = useRoute()
const auth = useAuth()

// create tag to add favicon to the page
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = "image/x-icon"
favicon.href = real_url + './favicon.ico';
document.head.appendChild(favicon);
</script>


<template>
  <template v-if="auth.state == 'authenticated'">
    <template v-if="route.path.includes('/gameonly')">
      <div id="mainContent">
        <router-view></router-view>
      </div>
    </template>
    <template v-else-if="route.path.includes('/game_sel')">
      <Mimshak>
        <!-- <div id="allApp"> -->
          <!-- <div id="mainLayout"> -->
            <!-- <div style="flex:1;"></div> -->
            <div id="mainContent" style="flex:6;">
              <router-view></router-view>
            </div>
            <!-- <div style="flex:1;"></div> -->
          <!-- </div> -->
        <!-- </div> -->
      </Mimshak>
    </template>
    <template v-else>
      <ConfirmDialog></ConfirmDialog>
      <div id="allApp">
        <div id="allAppTop">
          <Header />
          <div id="mainLayout">
            <div id="mainContent">
              <router-view></router-view>
            </div>
            <side-bar />
          </div>
        </div>
      </div>
    </template>
  </template>
  <template v-else>
    <Landing />
  </template>
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

#allApp {
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
  /*display: flex;*/
  gap: 1em;
}

#mainContent {
  background: white;
  border-radius: 0.5em;
  flex: 3;
  width: 100%;
  height: 100%;
  padding: 1em;
  padding-top: 2em;
  margin-bottom: 3em;
}
</style>
