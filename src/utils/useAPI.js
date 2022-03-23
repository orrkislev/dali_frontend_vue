import { defineStore } from 'pinia'

const base_url = 'https://localhost/'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

const useAPI = defineStore('api', {
    state: () => ({}),
    actions: {
        async post(url, data) {
            data['onlyData'] = true
            const token = getCookie('csrftoken')
            let response = await fetch(base_url + url, {
                method:'post', credentials: 'include',
                headers: { 
                    "Content-Type": "application/json",
                    'x-csrftoken': token },
                // body:{data}
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

