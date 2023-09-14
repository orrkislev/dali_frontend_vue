<script setup>
import { real_url } from "src/utils/useAPI";
import useAPI from "src/utils/useAPI";

const api = useAPI();
const IDM_url = 'saml2/login/'

const props = defineProps({
  site_prefix: {type:String, default:''}
})

</script>

<template>
  <a id='home_menu_idm_login'  :href="real_url + site_prefix + IDM_url"><img :src="api.staticUrl('images/idm_owl.png')" style='width:50px;'/>כניסה בהזדהות אחידה</a>
</template>

<script>
export default {
    name: "idm",
}
</script>