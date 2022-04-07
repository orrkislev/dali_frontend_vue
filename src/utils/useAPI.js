import { defineStore } from 'pinia'

export const base_url = 'http://localhost:8200/'
export const real_url = 'https://da-li.co.il/'

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
                method: 'post', credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    'x-csrftoken': token,
                },
                body: JSON.stringify(data)
            })
            response = await response.json();
            return response
        },
        async get(url) {
            const token = getCookie('csrftoken')
            let response = await fetch(base_url + url, {
                headers: {
                    "Content-Type": "application/json",
                    'x-csrftoken': token,
                },
                method: 'get', credentials: 'include',
            })
            return response
        },
        async post_form(url, data) {
            const postData = new URLSearchParams();
            Object.entries(data).forEach(pair => postData.append(pair[0], pair[1]))
            const token = getCookie('csrftoken')
            let response = await fetch(base_url + url, {
                method: 'post', credentials: 'include',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Access-Control-Allow-Credentials': true,
                    'x-csrftoken': token,
                },
                body: postData,
            })
            return response
        }
    }
})

export default useAPI

