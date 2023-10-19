import { defineStore } from 'pinia'
import useAPI from './useAPI';

const useAuth = defineStore('auth', {
    state: () => ({
        state: null,
        username: null,
        role:null,
        userData:null,
        locale:'science',
        showMobileWarning: null,
    }),
    getters: {
        isTeacherOrStaff: (state) =>  ['teacher','stuff'].includes(state.userData?.role),
        isStaff: (state) => ['stuff'].includes(state.userData?.role),
        isStudent: (state) => ['student','independant'].includes(state.userData?.role),
        showIntro: (state) => state.userData?.welcome_message,
        getlocale: (state) => state.locale,
        isMobileWarning: (state) => state.showMobileWarning,
        userRole: (state) => state.userData?.role,
        termsNotSigned: (state) => state.userData?.terms_signuup_date == null,
    },
    actions: {
        startLogin(){
            this.state = 'login'
        },
        async getUserdata(){
            const api = useAPI()
            let response = await api.post('students/userdata/',{})
            response = await response //.json() 
            if (response=='false')
                return
            this.username = response.name
            this.userData = response
            this.locale = response.domain
            this.state = 'authenticated'
        },
        async login(username, password) {
            const api = useAPI()
            let response = await api.post('students/vue_login/', {
                'go_normal': 1,
                'username': username,
                'password': password,
                'next': '/',
            })
            if (response.status == 'success') {
                await this.getUserdata()
                if (this.userData.role == 'teacher')
                    this.showMobileWarning = true
            }
            return response
        },
        mobileWarningAck() {
            this.showMobileWarning = false
        },
        async logout() {
            const api = useAPI()
            console.log('dd')
            let response = await api.post('students/logout/', { onlyData: true })
            if (response.status == 'success') {
                this.username = null
                this.userData = null
                this.state = null
                window.open("/lashon","_self")
            }
        },
        async updateUser(entity, field, value) {
            const api = useAPI()
            let response = await api.post('students/profile/user/', { udpate_entity: entity, udpate_param_name: field, update_new_value: value, onlyData: true })
            if (response.status == 'success') {
                this.getUserdata()
                return ''
            }
            else {
                console.log (response.error)
                return response.error
            }            
        },
        register() {

        },
        refreshToken() {

        },
    }
})

export default useAuth
