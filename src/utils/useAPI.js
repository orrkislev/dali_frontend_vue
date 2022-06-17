import { defineStore } from 'pinia'

export const base_url = 'http://localhost:9200/'
export const real_url = 'https://da-li.co.il/' //TODO update when production

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const useAPI = defineStore('api', {
    state: () => ({}),
    actions: {
        async post_json(url, data) {
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
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) return response.json();
            else return response.text()
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
        async post(url, data) {
            data['onlyData'] = true
            const postData = new URLSearchParams();
            const token = getCookie('csrftoken')
            Object.entries(data).forEach(pair => postData.append(pair[0], pair[1]))
            let response = await fetch(base_url + url, {
                method: 'post', credentials: 'include',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'x-csrftoken': token,
                },
                body: postData,
            })
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) return response.json();
            else return response.text()
        }
    }
})

export default useAPI

