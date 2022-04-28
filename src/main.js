import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'
import './assets/css/main.css';

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './utils/routes'
import mitt from 'mitt'
import VueAppend from 'vue-append'

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
// import 'primevue/resources/themes/md-light-indigo/theme.css'



const app = createApp(App)
const emitter = mitt()
app.config.globalProperties.emitter = emitter
app.use(createPinia())
app.use(router)
app.use(VueAppend)
app.use(PrimeVue);
app.use(ConfirmationService);


app.mount('#app');

window.$ = window.jQuery = require('jquery');

