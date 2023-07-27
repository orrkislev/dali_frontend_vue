<script setup>
import { NButton, NDropdown } from "naive-ui";
import { storeToRefs } from "pinia";
import useAuth from 'src/utils/useAuth';
import { ref, watch } from 'vue-demi';
import { useRouter } from 'vue-router';
import { real_url } from "src/utils/useAPI";
import useEmitter from 'src/utils/useEmmiter';
import Help from 'src/pages/help.vue';
import useBrowseManager from 'src/utils/useBrowseManager';

const browseManager = useBrowseManager();
const auth = useAuth()
const router = useRouter()
const emitter = useEmitter()


const options = ref([
  { key: "1", label: "פרופיל", disabled: false},
  { key: "2", label: "הדרכה", disabled: false},
  { key: "3", label: "הדרכה בסיסית", disabled: false},
  { key: "9", label: "יציאה מהחשבון", disabled: false},
]);

const { username } = storeToRefs(auth)
watch(username, newVal => options.value[0].disabled = newVal==null)

function showHelp(type){
  emitter.emit('SHOW_HELP',{'type':type})
      
}

function SelectUserOption(key) {
    switch (key){
      case "1":
        router.push({path: '/profile'})
        break;
      case "2":
        showHelp('guide')
        break;
      case "3":
        showHelp('intro')
        break;
      
      case "9":
        auth.logout()
        break;
      default: 
        console.log('SelectUserOption not found')
    }
}
function badgeURL(url){
  return real_url + "static/" + url
}
</script>


<template>
  <div id="header">
    <img id="header_logo" src="@/assets/home_top_logo.png" @click="startAuth" />
    <div id="header_content">
      <div id="header_right">
        <NButton round quaternary color="#ffffff">
          <router-link to="/">בית</router-link>
        </NButton>
        <NButton round secondary color="#ffffff">
          <router-link to="/alltree">עץ מלא</router-link>
        </NButton>
        <NButton round secondary color="#ffffff">
          <router-link to="/allgames">מאגר משימות</router-link>
        </NButton>
        <template v-if="auth.isTeacherOrStaff && !browseManager.isMobile">
        <NButton round secondary color="#ffffff">
          <router-link to="/manage/tasks">משימות לכיתות</router-link>
        </NButton>
        <NButton round secondary color="#ffffff">
          <router-link to="/manage/exams">בחנים לכיתות</router-link>
        </NButton>
        <NButton round secondary color="#ffffff">
          <router-link to="/manage/classes">ניהול כיתות</router-link>
        </NButton>
        </template>
      </div>
      <div id="header_left">
        
        <NButton v-if="!browseManager.isMobile" round secondary color="#ffffff" @click="showHelp">
          עזרה
        </NButton>
        <n-dropdown trigger="hover" @select="SelectUserOption" :options="options">
          <NButton round secondary color="#ffffff">
            <img :src="badgeURL(auth.userData.avatar_icon)" class="h-2rem " /> &nbsp;
            <span v-if="auth.username" > {{ auth.username }}</span>
            <router-link v-else to="/login">{{ 'LOGIN' }}</router-link>
            <!--

            <router-link v-if="auth.username" >{{ auth.username }}</router-link>
            
            -->
          </NButton>
        </n-dropdown>
      </div>
    </div>
    <Help :title="'guide'"/>
  </div>
</template>


<script>
export default {
  name: "Header",   
};
</script>


<style>
.v-binder-follower-container {
  direction: initial;
}
#header {
  background: #396672;
  border-radius: 0 0 0.5em 0.5em;
}
#header_logo {
  position: absolute;
  width: 80px;
}
#header_content {
  margin-right: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  min-height: 3em;
  font-size: 110%;
}
#header_right {
  gap: 1.5em;
  flex: 1;
  display:contents;
}
#header_left {
  flex: 1;
  gap: 1em;
  display: flex;
  justify-content: flex-end;
}
</style>