<script setup>
import { ref } from 'vue-demi';
import useAuth from '../utils/useAuth';

const auth = useAuth()

const name = ref("")
const password = ref("")

function login(){
    auth.login(name.value,password.value);
}
</script>


<template>
<form @submit.prevent="login">
    <div style='display:flex;flex-direction: column; gap:1em; align-items: center; margin-bottom: 1em;'>
        <div>
            <div class='inputLable'>שם משתמש</div>
            <input type='text' id='id_username' maxlength='30' name='username' aria-label='שם משתמש' v-model="name"/>
        </div>
        <div>
            <div class='inputLable'>סיסמא</div>
            <input type='password' id='id_password' maxlength='30' name='password' aria-label='סיסמה' v-model="password"/>
        </div>
        <input id='submit' type="submit" value='כניסה' />
    </div>
</form>
</template>


<script>
export default {
  name: "login",
};
</script>


<style>
</style>
