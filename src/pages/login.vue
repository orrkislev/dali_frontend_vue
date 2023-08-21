<script setup>
import { ref } from 'vue-demi';
import useAuth from 'src/utils/useAuth';
import idm from 'src/pages/idm.vue';

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
                    <br/>
                    <idm/>
                </div>
            </form>
            <div v-if="error">{{ error }}</div>
            <Divider />
            
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
