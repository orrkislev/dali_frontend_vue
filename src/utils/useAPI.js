import { defineStore } from 'pinia'

const base_url = 'https://localhost/'

const useAPI = defineStore('api', {
    state: () => ({}),
    actions: {
        async post(url, data) {
            data['onlyData'] = true
            let response = await fetch(base_url + url, {
                method:'post', credentials: 'include',
                headers: { "Content-Type": "application/json", },
                body:{data}
            })
            return response
        },
        async get(url) {
            let response = await fetch(base_url + url, {
                method:'get', credentials: 'include',
            })
            return response
        },
        async post_form(url, data) {
            const postData = new URLSearchParams();
            Object.entries(data).forEach(pair => postData.append(pair[0], pair[1]))
            let response = await fetch(base_url + url,{
                method:'post', credentials: 'include',
                headers: { "Content-Type": "application/x-www-form-urlencoded", },
                body:postData,
            })
            return response
        }
    }
})

export default useAPI

