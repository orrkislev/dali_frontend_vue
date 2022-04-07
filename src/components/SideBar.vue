<script setup>
import useAuth from '../utils/useAuth';

const auth = useAuth()
const auto_login = ()=>auth.auto_login();

</script>


<template>
    <div id="sidebar">
        <button @click=auto_login>auto_login</button>
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
