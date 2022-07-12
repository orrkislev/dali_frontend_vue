import { defineStore } from 'pinia'
import useAPI from './useAPI';

const useAuth = defineStore('auth', {
    state: () => ({
        username: null,
        role:null,
        userData:null
    }),
    getters: {
        isTeacherOrStaff: (state) => ['teacher','stuff'].includes(state.role),
        isStaff: (state) => ['stuff'].includes(state.role)
    },
    actions: {
        async getUserdata(){
            const api = useAPI()
            let response = await api.get('students/userdata')
            if (response=='false') return
            response = await response.json()
            this.role = response.role
            this.username = response.name
            this.userData = response
            console.log(response)
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
        },
        register() {

        },
        refreshToken() {

        },
    }
})

export default useAuth
