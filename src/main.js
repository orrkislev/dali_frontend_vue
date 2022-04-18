import './assets/css/main.css';

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './utils/routes'
import mitt from 'mitt'
import VueAppend from 'vue-append'


const app = createApp(App)
const emitter = mitt()
app.config.globalProperties.emitter = emitter
app.use(createPinia())
app.use(router)
app.use(VueAppend)
app.mount('#app');

window.$ = window.jQuery = require('jquery');

