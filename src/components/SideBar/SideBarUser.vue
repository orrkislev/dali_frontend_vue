<script setup>
import useAuth from "src/utils/useAuth";
import { real_url } from "../../utils/useAPI";

const auth = useAuth();

function badgeURL(url){
  return real_url + "static/" + url
}

</script>


<template>
  <router-link to="/profile">
    <div class="sideBarElement">
      <div v-if="auth.username" class="grid p-3" >
        <div class="col-6 flex gap1 align-items-center justify-content-center " style="border-left:1px solid gray;">
          <img :src="badgeURL(auth.userData.avatar_icon)" class="h-3rem " />
          <div>{{ auth.username }}</div>
        </div>
        <div class="col-6 flex flex-column align-items-center justify-content-center">
          <div class="text-4xl">{{ auth.userData.badge_points }}</div>
          <div style="margin-top:-1em;">נקודות</div>
        </div>
        <div v-if="auth.userData.user_monthly_badged">
          <Divider />
          <div v-for="badge in auth.userData.user_monthly_badged">
            <img :src="badgeURL(badge['badge.icon_boy.name'])" class="text-center">
            <div class="text-center">{{ badge['badge.name'] }}</div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
export default {
  components: { },
  name: "SideBarUser",
};
</script>


<style>
</style>