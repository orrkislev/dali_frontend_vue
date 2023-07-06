<script setup>
import { ref } from 'vue-demi';
import useAuth from 'src/utils/useAuth';
import { useRouter } from 'vue-router';

const auth = useAuth()
const router = useRouter()

const name = ref("")
const password = ref("")

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
            <!--<Divider />
             <Button label="הזדהות אחידה" type="submit"/>-->
        </div>
    </div>
</template>


<script>
export default {
    name: "login",
    data: () => ({
     error: null
    }),
    methods:
    {
        async login()
        {
            const res = await this.auth.login(this.name, this.password);
            if (res.status !== 'success')
                this.$data.error = 'פרטי הכניסה לא תקינים'
        }
    }
};

</script>


<style>
</style>
