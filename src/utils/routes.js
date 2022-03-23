import { createRouter, createWebHashHistory } from "vue-router";

import Home from '../pages/home.vue'
import allgames from '../pages/allgames.vue'
import login from '../pages/login.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/allgames', component: allgames },
    { path: '/login', component: login },
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

export default router
