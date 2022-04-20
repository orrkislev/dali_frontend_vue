<script setup>
import SideBarStaff from './SideBarStaff.vue';
import SideBarUser from './SideBarUser.vue';

</script>


<template>
    <div id="sidebar">
        <side-bar-user />
        <side-bar-staff />
    </div>
</template>


<script>
export default {
  components: { SideBarStaff, SideBarUser },
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
