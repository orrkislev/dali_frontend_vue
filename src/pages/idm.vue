<script setup>
import { real_url } from "src/utils/useAPI";
import useAPI from "src/utils/useAPI";

const api = useAPI();
const IDM_url = 'saml2/login/'

const props = defineProps({
  site_prefix: {type:String, default:''},
  title: {type:String, default:''},
  mystyle: {type:String,default:''}
})

function prepare_id_url(){
  let url = real_url + props.site_prefix + IDM_url
  if (props.site_prefix != "")
    url += "?next=/" + props.site_prefix
  return url
}
</script>

<template>
  <a id='home_menu_idm_login'  :href="prepare_id_url()">
  <div class="subjct_select_box science_box" :style="mystyle">
      <div class="selectSubjectText">{{ title }}</div>
      <div class="idmBox">
        <img :src="api.staticUrl('images/idm_owl.png')" style='width:50px;'/>כניסה בהזדהות אחידה
      </div>
  </div>
  </a>
</template>

<script>
export default {
    name: "idm",
}
</script>
<style>
div.subjct_select_box{
    cursor:pointer;   
    position: absolute;
    top: 449px;
    width: 228px;
    height: 144px;
    border-radius: 10px;
    padding:10px;
}

div.subjct_select_box:hover{
    background-color:#ABD2DD;
}
div.selectSubjectText{
    font-size: 22px;
    font-weight: 700;
}
div.idmBox{
    margin-top: 20px;
}
</style>