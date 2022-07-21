<script setup>
import { ref } from 'vue-demi';
import useAuth from 'src/utils/useAuth';
import useStoreSubscribe from '../utils/useStoreSubscribe';
import { useRouter } from 'vue-router';

const auth = useAuth()
const router = useRouter()

const name = ref("")
const password = ref("")

useStoreSubscribe(auth,'state',(state)=>{
//   if (state.state=='authenticated') {
//     router.push('/')
//   }
})

function login() {
    auth.login(name.value, password.value);
}
</script>


<template>
    <div class="flex w-screen h-screen justify-content-center align-items-center">
        <div class="bg-white border-round shadow p-5 w-5">
            <form @submit.prevent="login">
                <div class="flex flex-column">
                    <div>שם משתמש</div>
                    <InputText id="username" type="text" v-model="name" />
                    <div>סיסמא</div>
                    <Password v-model="password" />
                    <Button label="כניסה" type="submit"/>
                </div>
            </form>
            <Divider />
             <Button label="הזדהות אחידה" type="submit"/>
        </div>
    </div>
</template>


<script>
export default {
    name: "login",
};
</script>


<style>
</style>
