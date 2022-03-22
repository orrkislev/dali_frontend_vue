import { createRouter, createWebHashHistory } from "vue-router";

import Home from '../pages/home.vue'
import allgames from '../pages/allgames.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/allgames', component: allgames },
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

export default router
