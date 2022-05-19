<script setup>
import login from "src/pages/login.vue";
import useAuth from "src/utils/useAuth";
const auth = useAuth();

if (!auth.username) auth.getUserdata()
</script>


<template>
  <div class="sideBarElement">
    <div v-if="auth.username">
      {{ auth.usename }}
    </div>
    <login v-else />
  </div>
</template>


<script>
export default {
  components: { login },
  name: "SideBarUser",
};
</script>


<style>
</style>