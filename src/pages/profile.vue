<script setup>
import { useRouter } from 'vue-router';
import ProfileSection from 'src/components/profile/ProfileSection.vue';
import ProfileClass from 'src/components/profile/ProfileClass.vue';
import ProfileAvatar from 'src/components/profile/ProfileAvatar.vue';
import ProfileStars from 'src/components/profile/ProfileStars.vue';
import useAuth from 'src/utils/useAuth';
import { ref } from "vue";
import useAPI from 'src/utils/useAPI';
import ButtonSmall from 'src/components/ButtonSmall.vue';

const auth = useAuth()
const router = useRouter()
const api = useAPI()

const error = ref('')

async function updateUser(entity, field, value) {
    console.log(field, value)
    error.value = await auth.updateUser(entity, field, value)
    console.log("error.value = " + error.value)
}

function showPassAlert(){
    alert('show password')
}

</script>

<template>
    <div v-if="auth.userData">
        
        <div class='ErrorMessages'>{{  error }}</div>

        <ProfileAvatar @change='(val) => updateUser("quser","avatar_series",val)'/>
        <ProfileSection name='שם משתמש' :val='auth.userData.username'></ProfileSection>
        <ProfileSection name='מצב רישום' :val='auth.userData.registration'></ProfileSection>

        <ProfileSection name='שם פרטי' :val='auth.userData.first_name' :button="auth.userData.saml_login!='True'" @change='(val)=>updateUser("user","first_name",val)'></ProfileSection>
        <ProfileSection name='שם משפחה' :val='auth.userData.last_name' :button="auth.userData.saml_login!='True'" @change='(val)=>updateUser("user","last_name",val)'></ProfileSection>
        <ProfileSection name='אימייל' :val='auth.userData.email' :button=true @change='(val)=>updateUser("user","email",val)'></ProfileSection>
        <!--<ProfileSection v-if="auth.userData.saml_login!='True'" name='סיסמא' :button=true val='*********' @click='showPassAlert'></ProfileSection>-->

        <div v-if="auth.userData.role == 'student'">
            
            <ProfileClass name='כיתה' :button=true :val="auth.userData.class" @change='(val)=>updateUser("quser","myclass",val)'></ProfileClass>
        </div>
        <div>
            <ProfileSection name='בית ספר' :val='auth.userData.school' :button=false></ProfileSection>
        </div>
        <br/><br/>
        <ProfileStars/>
        <br/><br/>
        <ButtonSmall :border="true" :narrow="true" @click="()=>router.push('/legal')">תנאי שימוש</ButtonSmall>
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
    display: flex;
    width: 100%;
}
.AvatarSeriesName{width:10%;}
.avatarSeries:hover{
    background-color: lightgrey;
}
div.allAvatarsDiv{
    position:relative;
}
/*
.allAvatarImg{
}*/
.imgEnvelopeDiv
{
    position: absolute;
    bottom: 0;
}

</style>