<script setup>
import HomeTeacher from '../components/home/HomeTeacher.vue';
import useAuth from '../utils/useAuth';

const auth = useAuth();
</script>


<template>
  <div>
    <HomeTeacher v-if="auth.isTeacherOrStaff"/>
  </div>
</template>


<script>
export default {
  name: "Home",
};
</script>


<style>
</style>
