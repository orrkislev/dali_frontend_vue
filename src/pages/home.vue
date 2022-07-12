<script setup>
import HomeTeacher from '../components/home/HomeTeacher.vue';
import useAuth from '../utils/useAuth';
import HomeStaff from '../components/home/HomeStaff.vue';

const auth = useAuth();
</script>


<template>
  <div v-if="auth.username">
    <h3>שלום {{ auth.username }}</h3>
    <h4 v-if="auth.role=='teacher'">מורה</h4>
    <HomeTeacher v-if="auth.isTeacherOrStaff"/>
    <HomeStaff v-if="auth.isStaff"/>
  </div>
</template>


<script>
export default {
  name: "Home",
};
</script>


<style>
</style>
