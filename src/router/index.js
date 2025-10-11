import { createRouter, createWebHistory } from 'vue-router'

// Import halaman
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/404.vue'

// Jurusan
import rpl from '@/pages/jurusan/rpl.vue'
import pg from '@/pages/jurusan/pg.vue'
import tkj from '@/pages/jurusan/tkj.vue'
import tja from '@/pages/jurusan/tja.vue'

// Auth
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'

//jalurku
import jalurku from '@/pages/jalurku/Quiz.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },

  {
    path: '/jurusan',
    children: [
      { path: 'rpl', name: 'rpl', component: rpl },
      { path: 'pg', name: 'pg', component: pg },
      { path: 'tkj', name: 'tkj', component: tkj },
      { path: 'tja', name: 'tja', component: tja },
    ],
  },

  //auth
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },

  //jalurku
  { path: '/jalurku', name: 'jalurku', component: jalurku },

  // Fallback: 404
  { path: '/:pathMatch(.*)*', name: '404', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
