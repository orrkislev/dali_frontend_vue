<script setup>
import login from "../../pages/login.vue";
import useAuth from "../../utils/useAuth";
const auth = useAuth();
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