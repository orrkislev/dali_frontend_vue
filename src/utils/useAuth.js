import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import useAPI from './useAPI';

const useAuth = defineStore('auth', {
    state: () => ({
        state: null,
        username: null,
        role:null,
        userData:null
    }),
    getters: {
        isTeacherOrStaff: (state) => ['teacher','stuff'].includes(state.userData.role),
        isStaff: (state) => ['stuff'].includes(state.userData.role),
        isStudent: (state) => ['student','independant'].includes(state.userData.role),
        showIntro: (state) => state.userData.welcome_message,
    },
    actions: {
        startLogin(){
            this.state = 'login'
        },
        async getUserdata(){
            const api = useAPI()
            let response = await api.post('students/userdata/',{})
            response = await response //.json() 
            if (response==false)
                return
            this.username = response.name
            this.userData = response
            this.state = 'authenticated'
        },
        async login(username, password) {
            /*if (username == '') {
                username = "mora21"
                password = "orit2345"
            }*/
            const api = useAPI()
            let response = await api.post('students/pre_login/', {
                'go_normal': 1,
                'username': username,
                'password': password,
                'next': '/',
            })
            this.getUserdata()
            return response
        },
        async logout() {
            const api = useAPI()
            console.log('logout')
            this.username = null
            this.state = null
            await api.get('students/logout')            
        },
        register() {

        },
        refreshToken() {

        },
    }
})

export default useAuth
