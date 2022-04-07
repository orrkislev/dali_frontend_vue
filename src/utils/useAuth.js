import { defineStore } from 'pinia'
import useAPI from './useAPI';

const useAuth = defineStore('auth', {
    state: () => ({
        username: null,
        csrfToken:null
    }),
    actions: {
        async auto_login(){
            const api = useAPI()
            await api.get('students/vue_login')
            return true
        },
        async getCsrfToken(){
            const api = useAPI()
            let response = await api.get('students/get_csrf_token/')
            response = await response.json()
            console.log(response)
            this.csrfToken = response.token
            return response
        },
        async pre_login() {
            const api = useAPI()
            let response = await api.get('students/pre_login/')
            return response
        },
        async login(username, password) {
            if (username == '') {
                username = 'אורכסלו'
                password = 'Ok061187'
            }
            const api = useAPI()
            let response = await api.post_form('students/pre_login/', {
                go_normal: 1,
                username: username,
                password: password,
                next: '/',
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
