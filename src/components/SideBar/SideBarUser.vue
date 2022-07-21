<script setup>
import useAuth from "src/utils/useAuth";
import { real_url } from "../../utils/useAPI";

const auth = useAuth();

function badgeURL(url){
  return real_url + "static/" + url
}

</script>


<template>
  <div class="sideBarElement">
    <div v-if="auth.username">
      <div>{{ auth.username }}</div>
      <div class="text-center">
        <div class="text-4xl">{{ auth.userData.badge_points }}</div>
        <div style="margin-top:-1em;">נקודות</div>
      </div>
      <img :src="badgeURL(auth.userData.avatar_icon)" class="h-1rem" />
      <div v-if="auth.userData.user_monthly_badged">
        <Divider />
        <div v-for="badge in auth.userData.user_monthly_badged">
          <img :src="badgeURL(badge['badge.icon_boy.name'])" class="text-center">
          <div class="text-center">{{ badge['badge.name'] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: { },
  name: "SideBarUser",
};
</script>


<style>
</style>