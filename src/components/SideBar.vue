<script setup>
import useAuth from '../utils/useAuth';
import ActionButton from './ActionButton.vue';
import SideBarStaff from './SideBar/SideBarStaff.vue';

const auth = useAuth()
const auto_login = ()=>auth.auto_login();

</script>


<template>
    <div id="sidebar">
        <div class='sideBarElement'>
            <action-button @click=auto_login>auto_login</action-button>
        </div>
        <side-bar-staff />
    </div>
</template>


<script>
export default {
  components: { SideBarStaff, ActionButton },
  name:'SideBar'
};
</script>


<style>
#sidebar{
    width: 100%;
    height: 100%;
    flex:1;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}
.sideBarElement {
    border-radius: 0.5em;
    background: white;
    padding: 0.5em;
}
</style>
