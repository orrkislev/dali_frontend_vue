<script setup>
import { ref } from 'vue';
import useAuth from 'src/utils/useAuth';
import useAPI from 'src/utils/useAPI';
import ButtonSmall from '../ButtonSmall.vue';

const auth = useAuth()
const api = useAPI()


const showAllAvatars = ref(false)
const allAvatars = ref([])
const emit = defineEmits(['change'])

function showAllBadges(){
  console.log('show')
    if (allAvatars.value.length == 0) {
        api.post("badges/all_avatars/",{}).then(res=>{
            allAvatars.value = res
        })
    }
    showAllAvatars.value = !showAllAvatars.value
}

</script>

<template>
  <div class="flex p-2">
    <div class="titleValueDiv">
      <div class="w-4 mybold">האווטאר שלי:</div>
      <img :src="api.staticUrl(auth.userData.avatar_icon)" class="h-4rem avatarImg" />
    </div>
    <div class="buttonsDiv">
            <ButtonSmall v-if="!showAllAvatars" @click="showAllBadges" :primary="true" :border="true" :selected="true">שינוי</ButtonSmall>      
            <ButtonSmall v-if="showAllAvatars" @click="showAllBadges" :primary="true" :border="true" :selected="true">ביטול</ButtonSmall>
        </div> 
    <div v-if="showAllAvatars"  class="grid gap1 mt-4">
        <div v-for="avatarSeries in allAvatars" class="avatarSeries p-2" @click="emit('change', avatarSeries.id);showAllAvatars=false">
            <div class="AvatarSeriesName"> {{ avatarSeries.name }} </div>
            <div v-for="avatar in avatarSeries.avatars" class="allAvatarsDiv">
                    <img :src="api.staticUrl(avatar.img)" class="allAvatarImg " />   
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
name:'profileAvatar'
};
</script>

<style>
.avatarImg{margin-right:1.5em;}
</style>
