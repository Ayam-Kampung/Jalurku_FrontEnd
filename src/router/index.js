// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import halaman
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/404.vue'
import rpl from '@/pages/jurusan/rpl.vue'
import pg from '@/pages/jurusan/pg.vue'
import tkj from '@/pages/jurusan/tkj.vue'
import tja from '@/pages/jurusan/tja.vue'
// import Pg from '@/pages/Pg.vue'
// import Tentang from '@/pages/Tentang.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/rpl', name: 'rpl', component: rpl },
  { path: '/pg', name: 'pg', component: pg },
  { path: '/tkj', name: 'tkj', component: tkj },
  { path: '/tja', name: 'tja', component: tja },
  // { path: '/tentang', name: 'tentang', component: Tentang },

  // Fallback: 404
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
  },
]

// Buat instance router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
