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
        isTeacherOrStaff: (state) => ['teacher','stuff'].includes(state.role),
        isStaff: (state) => ['stuff'].includes(state.role)
    },
    actions: {
        startLogin(){
            this.state = 'login'
        },
        async getUserdata(){
            const api = useAPI()
            let response = await api.get('students/userdata')
            response = await response.json()
            if (response==false) return
            console.log(response)
            this.role = response.role
            this.username = response.name
            this.userData = response
            this.state = 'authenticated'
        },
        async login(username, password) {
            if (username == '') {
                username = "mora21"
                password = "orit2345"
            }
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
            await api.get('students/logout')
            this.role = null
            this.username = null
            this.state = null
        },
        register() {

        },
        refreshToken() {

        },
    }
})

export default useAuth
