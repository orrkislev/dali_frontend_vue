<script setup>
import HomeTeacher from '../components/home/HomeTeacher.vue';
import useAuth from '../utils/useAuth';
import HomeStaff from '../components/home/HomeStaff.vue';
import { useRouter } from 'vue-router';
import useEmitter from 'src/utils/useEmmiter';
import {onMounted, ref } from 'vue';
import useAPI from "src/utils/useAPI";
import Help from 'src/pages/help.vue';


const auth = useAuth();
const router = useRouter();
const emitter = useEmitter();
const api = useAPI();

let allPcHList = ref(null)
let allMobileHList = ref(null)
onMounted(() => { getStaffHelpList() })

function getStaffHelpList(){
  console.log('sdsfdsfd')
  if (auth.isStaff) {
      api.post(`review/help_types/`, {'role':'all','client':'pc'}).then((res) => {
        allPcHList.value = res.help_types
      })
      api.post(`review/help_types/`, {'role':'all','client':'mobile'}).then((res) => {
        allMobileHList.value = res.help_types
      })
    }
}

auth.getUserdata() // Get updated data 
if (auth.showIntro)
{
  emitter.emit('SHOW_HELP',{'type':'automatic'})
}

//if (auth.isStudent) router.push('/allgames');
if (auth.isStudent) router.push('/alltree');


function showhelp(selectid) {
  let id = $("select#"+selectid).val();
  emitter.emit('SHOW_HELP',{'id':id})
}
function showStaffhelp(key){
  console.log('key=' + key)
}

</script>


<template>
  <div v-if="auth.username">
    <h3>שלום {{ auth.username }}</h3>
    <HomeTeacher v-if="auth.isTeacherOrStaff"/>
    <HomeStaff v-if="auth.isStaff"/>
    <div v-if="auth.isStaff" style="border:1px solid black;border-radius: 10px;padding:10px;margin:20px;background-color: blanchedalmond;">
      הצגת הדרכה - לצוות בלבד:<br/>
      הדרכות בירוק הן הדרכות פעילות. הדרכה באדום - לא פעילה כרגע.<br/>
      <select id="help_select_pc">
        <option disabled selected>בחירה מרשימת הדרכות למחשב</option>
        <option v-for="h in allPcHList" :value="h.id" :class="[h.isactive ? 'activeHelp' : 'inactiveHelp']">{{ h.name }}</option>
      </select>
      <button @click="showhelp('help_select_pc')">הצגה</button>
      <select id="help_select_mobile" style="margin-right:30px;">
          <option disabled selected>בחירה מרשימת הדרכות למובייל</option>
          <option v-for="h in allMobileHList" :value="h.id" :class="[h.isactive ? 'activeHelp' : 'inactiveHelp']">{{ h.name }}</option>
        </select>
        <button @click="showhelp('help_select_mobile')">הצגה</button>
    </div>

  </div>
</template>


<script>
export default {
  name: "Home",
};
</script>


<style>
.activeHelp{color:green}
.inactiveHelp{color:red}
</style>
