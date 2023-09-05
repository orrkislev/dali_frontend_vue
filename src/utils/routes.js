import { createRouter, createWebHashHistory } from "vue-router";

import Home from 'src/pages/home.vue'
import allgames from 'src/pages/allgames.vue'
import alltree from 'src/pages/alltree.vue'
import login from 'src/pages/login.vue'
import Game from 'src/pages/game.vue'
import Profile from 'src/pages/profile.vue'

import Help from 'src/pages/help.vue'
import Legal from 'src/pages/legal.vue'

import Classes from 'src/pages/manage/Classes.vue'
import Class from 'src/pages/manage/Class.vue'
import Tasks from 'src/pages/manage/Tasks.vue'
import Exams from 'src/pages/manage/Exams.vue'

import Qadmin from 'src/pages/qadmin.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/allgames', component: allgames },
    { path: '/alltree', component: alltree },
    { path: '/login', component: login },
    { path: '/profile', component: Profile },

    { path: '/game_sel/:taskid', component: Game},
    { path: '/game_sel/:taskid/:questionid', component: Game},
    { path: '/game/:taskid', component: Game},
    { path: '/exam/:taskid/:examid', component: Game},
    { path: '/game/:taskid/:questionid', component: Game},
    { path: '/gameonly/:taskid', component: Game},

    { path: '/manage/classes', component: Classes},
    { path: '/manage/classes/:classid', component: Class},
    { path: '/manage/tasks', component: Tasks},
    { path: '/manage/exams', component: Exams},
    
    { path: '/legal', component: Legal },

    { path: '/qadmin/:id', component: Qadmin },
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

export default router
