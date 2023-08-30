<script setup>
import { NButton, NDropdown } from "naive-ui";
import { storeToRefs } from "pinia";
import useAuth from 'src/utils/useAuth';
import { ref, watch } from 'vue-demi';
import { useRouter } from 'vue-router';
import useEmitter from 'src/utils/useEmmiter';
import Help from 'src/pages/help.vue';
import useBrowseManager from 'src/utils/useBrowseManager';
import useAPI from "src/utils/useAPI";
import ProfileClass from 'src/components/profile/ProfileClass.vue';

const browseManager = useBrowseManager();
const auth = useAuth()
const router = useRouter()
const emitter = useEmitter()
const api = useAPI();

const class_select_visibile = true

const options = ref([
  { key: "1", label: "החשבון שלי", disabled: false},
  { key: "9", label: "יציאה מהחשבון", disabled: false},
]);

const help_options = ref([
  { key: "2", label: "הדרכה", disabled: false},
  { key: "3", label: "הדרכה בסיסית", disabled: false},
])

const { username } = storeToRefs(auth)
watch(username, newVal => options.value[0].disabled = newVal==null)

function showHelp(type){
  emitter.emit('SHOW_HELP',{'type':type})
      
}

function SelectUserOption(key) {
console.log('key=' + key)
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
</script>


<template>
  <div id="header">
    <router-link to="/">
      <img id="header_logo" src="@/assets/home_top_logo.png" /> 
    </router-link>
    <div id="header_content">
      <div id="header_right">
        <NButton v-if="!auth.isStudent" round quaternary color="#ffffff">
          <router-link to="/">בית</router-link>
        </NButton>
        <NButton round secondary color="#ffffff">
          <router-link to="/alltree">עץ משימות</router-link>
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
        <n-dropdown v-if="!browseManager.isMobile" trigger="hover" @select="SelectUserOption" :options="help_options">
          <NButton round secondary color="#ffffff">עזרה</NButton>
        </n-dropdown>
        <n-dropdown trigger="hover" @select="SelectUserOption" :options="options">
          <NButton round secondary color="#ffffff">
            <img :src="api.staticUrl(auth.userData.avatar_icon)" class="h-2rem " /> &nbsp; 
            <div v-if="auth.username" > 
              <span>{{ auth.username }}</span>          
            </div>
            <router-link v-else to="/login">כניסה</router-link>
          </NButton>
        </n-dropdown>
      </div>
    </div>
    <Dialog  v-if="auth.userData.check_class_update_force" v-model:visible="class_select_visibile" header="עדכון כיתה" >
      <ProfileClass :button=true :autoStart=true :inedit=true :edit=true :reason="auth.userData.check_class_update_force" 
                    @change='(val)=>auth.updateUser("quser","myclass",val)'
                    @leave="auth.userData.check_class_update_force=''"></ProfileClass>
    </Dialog>
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