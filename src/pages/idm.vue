<script setup>
import { real_url } from "src/utils/useAPI";
import useAPI from "src/utils/useAPI";

const api = useAPI();
const IDM_url = 'saml2/login/'

const props = defineProps({
  site_prefix: {type:String, default:''}
})

function prepare_id_url(){
  let url = real_url + props.site_prefix + IDM_url
  if (props.site_prefix != "")
    url += "?next=/" + props.site_prefix
  return url
}
</script>

<template>
  <a id='home_menu_idm_login'  :href="prepare_id_url()"><img :src="api.staticUrl('images/idm_owl.png')" style='width:50px;'/>כניסה בהזדהות אחידה</a>
</template>

<script>
export default {
    name: "idm",
}
</script>