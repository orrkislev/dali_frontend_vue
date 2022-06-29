<script setup>
import { NButton, NDropdown } from "naive-ui";
import useAuth from 'src/utils/useAuth';
import useStoreSubscribe from 'src/utils/useStoreSubscribe';
import { ref } from 'vue-demi';

const auth = useAuth()

useStoreSubscribe(auth,'username',(state)=>{
    const newOptions = [...options.value]
    newOptions[0].disabled = state.username==null
    options.value = newOptions
})

const options = ref([
  { key: "1", label: "התנתק", disabled: false},
]);

function SelectUserOption(key) {
  if (key=="1") {
    auth.logout()
  }
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
          <router-link to="/allgames">מאגר משימות</router-link>
        </NButton>
        <NButton round secondary color="#ffffff" v-if="auth.isTeacherOrStaff">
          <router-link to="/manage/tasks">משימות לכיתות</router-link>
        </NButton>
        <NButton round secondary color="#ffffff" v-if="auth.isTeacherOrStaff">
          <router-link to="/manage/exams">בחנים לכיתות</router-link>
        </NButton>
        <NButton round secondary color="#ffffff" v-if="auth.isTeacherOrStaff">
          <router-link to="/manage/classes">ניהול כיתות</router-link>
        </NButton>
      </div>
      <div id="header_left">
        <NButton round secondary color="#ffffff">
          <router-link to="/help">עזרה</router-link>
        </NButton>

        <n-dropdown trigger="hover" @select="SelectUserOption" :options="options">
          <NButton round secondary color="#ffffff">
            <router-link v-if="auth.username" to="/profile">{{ auth.username }}</router-link>
            <router-link v-else to="/login">{{ 'LOGIN' }}</router-link>
          </NButton>
        </n-dropdown>
      </div>
    </div>
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
  display: flex;
  gap: 1.5em;
  flex: 1;
}
#header_left {
  flex: 1;
  gap: 1em;
  display: flex;
  justify-content: flex-end;
}
</style>