import initPrimevue from './utils/primevue_components';
import './assets/css/main.css';

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './utils/routes'
import mitt from 'mitt'
import VueAppend from 'vue-append'
import './utils/fontAwesome'

const app = createApp(App)
const emitter = mitt()
app.config.globalProperties.emitter = emitter
app.use(createPinia())
app.use(router)
app.use(VueAppend)
initPrimevue(app)

app.mount('#daliApp');

window.$ = window.jQuery = require('jquery');

