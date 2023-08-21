<script setup>
import { base_url } from "src/utils/useAPI";
const IDM_url = base_url + 'saml2/login/'
const OWL_url = base_url + 'static/images/idm_owl.png'

</script>

<template>
  <a id='home_menu_idm_login'  :href="IDM_url"><img :src="OWL_url" style='width:50px;'/>כניסה בהזדהות אחידה</a>
</template>

<script>
export default {
    name: "idm",
}
</script>