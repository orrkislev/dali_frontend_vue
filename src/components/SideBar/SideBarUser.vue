<script setup>
import useAuth from "src/utils/useAuth";
import useAPI from "../../utils/useAPI";
const api = useAPI();

const auth = useAuth();

</script>


<template>
  <router-link to="/profile">
    <div class="sideBarElement">
      <div v-if="auth.username" class="grid p-3" >
        <div class="col-6 flex gap1 align-items-center justify-content-center " style="border-left:1px solid gray;">
          <img :src="api.staticUrl(auth.userData.avatar_icon)" class="h-3rem " />
          <div>{{ auth.username }}</div>
        </div>
        <div class="col-6 flex flex-column align-items-center justify-content-center">
          <div class="text-4xl">{{ auth.userData.badge_points }}</div>
          <div style="margin-top:-1em;">כוכבים</div>
        </div>
        <img id='avatar_series_img' class='avatar_series_img' :src="api.staticUrl(auth.userData.series_bar_image)" style="max-width:100%;"/>
        <div :value="auth.userData.progress_bar_value" class="myprogressbar" :style="{'background':auth.userData.seriesbar_color}"></div>
        <div v-if="auth.userData.user_monthly_badged">
          <Divider />
          <div v-for="badge in auth.userData.user_monthly_badged">
            <img :src="api.staticUrl(badge['badge.icon_boy.name'])" class="text-center">
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
.myprogressbar{width:91%;height:4px;top:-23px;right:9px;position:relative}
</style>