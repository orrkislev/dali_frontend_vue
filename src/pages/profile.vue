<script setup>
import { useRouter } from 'vue-router';
import ProfileSection from '../components/profile/ProfileSection.vue';
import useAuth from '../utils/useAuth';

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
</script>




<template>
    <div v-if="auth.userData">
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
</style>