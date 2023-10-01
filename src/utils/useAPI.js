  import { defineStore } from 'pinia'

//export const real_url = process.env.NODE_ENV=='development' ? 'http://localhost:8200/' : 'https://da-li.co.il/'  

//export const real_url =  'https://da-li.co.il/'
//export const real_url =  'http://localhost:8200/'
export const real_url =  '/'

export const base_url =  real_url + 'lashon/'
export const dali_internal_url = base_url + 'static/new_site/index.html'

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

const useAPI = defineStore('api', {
    state: () => ({}),
    getters: {
        staticUrl: (state) => (url) => { return real_url + "static/" + url},
        newSiteImages: (state) => (name) => { return real_url + "static/images/new_site/" + name},
    },
    actions: {
        async getCSRF() {
            const res = await fetch(base_url + 'students/get_csrf_token/', {
                method: 'GET',
                credentials: 'include',
            })

        },
        async post_json(url, data) {
            data['onlyData'] = true
            const token = getCookie('csrftoken')
            if (!token) await this.getCSRF()
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
//                    "Access-Control-Allow-Origin": "*", // dEBUG
                },
                body: postData,
            })
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) return response.json();
            else return response.text()
        },
        /*
        async post_special(url, data) {
            data = JSON.parse(data['new_site_data'])
            return this.post(url,data)
        }*/
    }
})

export default useAPI

