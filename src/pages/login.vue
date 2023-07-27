<script setup>
import { ref } from 'vue-demi';
import useAuth from 'src/utils/useAuth';
import { useRouter } from 'vue-router';
import useAPI from "src/utils/useAPI";
import { base_url } from "../utils/useAPI";

//const auth = useAuth()

//const name = ref("")
//const password = ref("")
const IDM_url = base_url + 'saml2/login/';
const OWL_url = base_url + 'static/images/idm_owl.png'

</script>


<template>
    <div class="flex justify-content-center align-items-center">
        <div class="bg-white border-round shadow p-5">
            <form @submit.prevent="login">
                <div class="flex flex-column">
                    <div>שם משתמש</div>
                    <InputText id="username" type="text" v-model="name" />
                    <div>סיסמא</div>
                    <Password v-model="password" toggleMask  />
                    <br/>
                    <Button label="כניסה" type="submit"/>
                </div>
            </form>
            <div v-if="error">{{ error }}</div>
            <Divider />
            <a id='home_menu_idm_login'  :href="IDM_url"><img :src="OWL_url" style='width:50px;'/>כניסה בהזדהות אחידה</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    data: () => ({
        name : "",
        password:  ref(""),
        error: null,
    }),
    methods: {
        async login(){
            const auth = useAuth()
            const res = await auth.login(this.$data.name, this.$data.password);
            if (res.status !== 'success')
                this.$data.error = 'פרטי הכניסה לא תקינים'
        },      
    }
};

</script>


<style>
</style>
