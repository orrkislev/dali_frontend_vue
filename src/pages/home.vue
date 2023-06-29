<script setup>
import HomeTeacher from '../components/home/HomeTeacher.vue';
import useAuth from '../utils/useAuth';
import HomeStaff from '../components/home/HomeStaff.vue';
import { useRouter } from 'vue-router';
import useEmitter from 'src/utils/useEmmiter';
import Help from 'src/pages/help.vue';


const auth = useAuth();
const router = useRouter();
const emitter = useEmitter();

auth.getUserdata() // Get updated data 
if (auth.showIntro)
{
  emitter.emit('SHOW_HELP',{'type':'intro'})
}

if (auth.isStudent) router.push('/allgames');

function shoehelp()
{
  let role = $("select#role_select").val();
  let type = $("select#type_select").val();
  emitter.emit('SHOW_HELP',{'type':type,'role':role})
}
</script>


<template>
  <div v-if="auth.username">
    <h3>שלום {{ auth.username }}</h3>
    <HomeTeacher v-if="auth.isTeacherOrStaff"/>
    <HomeStaff v-if="auth.isStaff"/>
    <div v-if="auth.isStaff" style="border:1px solid black;border-radius: 10px;padding:10px;margin:20px;background-color: blanchedalmond;">
       הצגת הדרכה - לצוות בלבד:<br/>
      תפקיד: <select id="role_select">
        <option value="student">תלמידים</option>
        <option value="independant">עצמאיים</option>
        <option value="teacher">מורים</option>
        <option value="other">לא רשומים</option>
      </select>
      סוג הדרכה: <select id="type_select">
        <option value="guide">הדרכה</option>
        <option value="intro">הכרות</option>
        <option value="other">אחר</option>
      </select>
      <br/>
      <button @click="shoehelp">הצגה</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "Home",
};
</script>


<style>

</style>
