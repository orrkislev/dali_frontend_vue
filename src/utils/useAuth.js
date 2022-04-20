import { defineStore } from 'pinia'
import useAPI from './useAPI';

const useAuth = defineStore('auth', {
    state: () => ({
        username: null,
        role:null
    }),
    getters: {
        isTeacherOrStaff: (state) => ['teacher','stuff'].includes(state.role)
    },
    actions: {
        async auto_login(){
            const api = useAPI()
            let response = await api.get('students/vue_login')
            response = await response.json()
            this.role = response.role
            this.username = 'אורכסלו'
            return true
        },
        async login(username, password) {
            if (username == '') {
                return await this.auto_login()
            }
            const api = useAPI()
            let response = await api.post('students/pre_login/', {
                'go_normal': 1,
                'username': username,
                'password': password,
                'next': '/',
            })
            console.log('login', response)
            this.username = 'אורכסלו'
            return response
        },
        logout() {

        },
        register() {

        },
        refreshToken() {

        },
    }
})

export default useAuth
