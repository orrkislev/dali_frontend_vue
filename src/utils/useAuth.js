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
        async getUserdata(){
            const api = useAPI()
            let response = await api.get('students/userdata')
            if (response=='false') return
            response = await response.json()
            this.role = response.role
            this.username = response.name
        },

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
        async logout() {
            const api = useAPI()
            await api.get('students/logout')
            this.role = null
            this.username = null
        },
        register() {

        },
        refreshToken() {

        },
    }
})

export default useAuth
