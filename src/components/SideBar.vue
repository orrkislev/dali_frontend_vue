<script setup>
import useAuth from '../utils/useAuth';

const auth = useAuth()
const auto_login = ()=>auth.auto_login();
const pre_login = ()=>auth.pre_login();
const getCsrfToken = ()=>auth.getCsrfToken();

</script>


<template>
    <div id="sidebar">
        <button @click=auto_login>auto_login</button>
        <button @click=pre_login>pre_login</button>
        <button @click=getCsrfToken>getCsrfToken</button>
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
