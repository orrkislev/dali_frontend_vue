<script setup>
import useAuth from '../utils/useAuth';

const auth = useAuth()

function getCsrf(){ auth.getCsrfToken() }
function getSession(){ auth.pre_login() }
function login(){ auth.login() }

</script>


<template>
    <div id="sidebar">
        aaa
        <button @click="getCsrf">get csrf</button>
        <button @click="getSession">get session id</button>
        <button @click="login">login</button>
    </div>
</template>


<script>
export default {
name:'SideBar'
};
</script>


<style>
#sidebar{
    padding: 1em;
    width: 100%;
    height: 100%;
    flex:1;
    background: white;
}
</style>