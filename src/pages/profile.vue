<script setup>
import { useRouter } from 'vue-router';
import ProfileSection from '../components/profile/ProfileSection.vue';
import useAuth from '../utils/useAuth';
import { ref } from "vue";
import useAPI, { real_url } from '../utils/useAPI';

const auth = useAuth()
const router = useRouter()

function updateUser(field, value) {
    console.log(field, value)
    // auth.updateUser(field, value)
}
function showPassAlert(){
    alert('show password')
}
function showClassAlert(){
    alert('show class')
}

const api = useAPI()

function badgeURL(url){
  return real_url + "static/" + url
}


async function updateUserAvatar(id){
    const res =await api.post('students/profile/user/',{ 'udpate_entity':'quser','udpate_param_name':'avatar_series','update_new_value':id})
    auth.userData.avatar_icon = allAvatars.value.find(a=>a.id==id).avatars[auth.userData.level].img
    showAllAvatars.value = false
}

const showAllAvatars = ref(false)
const allAvatars = ref([])
function showAllBadges(){
    if (allAvatars.value.length == 0) {
        api.post("badges/all_avatars/",{}).then(res=>{
            allAvatars.value = res
        })
    }
    showAllAvatars.value = !showAllAvatars.value
}
</script>




<template>
    <div v-if="auth.userData">
        <div>
            האווטאר שלי
            <img :src="badgeURL(auth.userData.avatar_icon)" class="h-4rem " />
            <Button v-if="!showAllAvatars" icon="pi pi-user-edit" class="p-button-rounded p-button-outlined" @click="showAllBadges"/>
            <Button v-if="showAllAvatars" icon="pi pi-times" class="p-button-rounded p-button-outlined" @click="showAllBadges"/>
            <div v-if="showAllAvatars"  class="grid gap1 mt-2">
                <div v-for="avatarSeries in allAvatars" class="avatarSeries p-2" @click="updateUserAvatar(avatarSeries.id)">
                    <div> {{ avatarSeries.name }} </div>
                    <div class="flex">
                        <div v-for="avatar in avatarSeries.avatars">
                            <img :src="badgeURL(avatar.img)" class="h-3rem " />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ProfileSection name='שם משתמש' :val='auth.userData.username'></ProfileSection>
        <ProfileSection name='מצב רישום' :val='auth.userData.registration'></ProfileSection>

        <ProfileSection name='שם פרטי' :val='auth.userData.first_name' :edit="auth.userData.saml_login=='True'" @change='(val)=>updateUser("first_name",val)'></ProfileSection>
        <ProfileSection name='שם משפחה' :val='auth.userData.last_name' :edit="auth.userData.saml_login=='True'" @change='(val)=>updateUser("last_name",val)'></ProfileSection>
        <ProfileSection name='אימייל' :val='auth.userData.email' :edit='true' @change='(val)=>updateUser("email",val)'></ProfileSection>

        <ProfileSection v-if="auth.userData.saml_login!='True'" name='סיסמא' :button='true' val='*********' @click='showPassAlert'></ProfileSection>

        <ProfileSection name='בית ספר' :val='auth.userData.school'></ProfileSection>
        <ProfileSection name='כיתה' :button='true' :val="auth.userData.class" @click='showClassAlert'></ProfileSection>
    </div>
</template>


<script>
export default {
name:'profile'
};
</script>


<style>
    .avatarSeries{
        border-radius: 1em;
        border: 1px solid gray;
        cursor: pointer;
        transition: all .2s;
    }
    .avatarSeries:hover{
        background-color: lightgrey;
    }
</style>