import { createRouter, createWebHashHistory } from "vue-router";

import Home from 'src/pages/home.vue'
import allgames from 'src/pages/allgames.vue'
import login from 'src/pages/login.vue'
import Game from 'src/pages/game.vue'

import Classes from 'src/pages/manage/Classes.vue'
import Class from 'src/pages/manage/Class.vue'
import Tasks from 'src/pages/manage/Tasks.vue'
import Exams from 'src/pages/manage/Exams.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/allgames', component: allgames },
    { path: '/login', component: login },
    { path: '/game/:taskid', component: Game},
    { path: '/game/:taskid/:questionid', component: Game},

    { path: '/manage/classes', component: Classes},
    { path: '/manage/classes/:classid', component: Class},
    { path: '/manage/tasks', component: Tasks},
    { path: '/manage/exams', component: Exams},
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

export default router
