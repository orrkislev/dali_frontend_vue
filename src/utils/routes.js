import { createRouter, createWebHashHistory } from "vue-router";

import Home from '../pages/home.vue'
import allgames from '../pages/allgames.vue'
import login from '../pages/login.vue'
import Game from '../pages/game.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/allgames', component: allgames },
    { path: '/login', component: login },
    { path: '/game/:taskid', component: Game},
    { path: '/game/:taskid/:questionid', component: Game}
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

export default router
