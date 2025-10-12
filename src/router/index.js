import { createRouter, createWebHistory } from 'vue-router'

// Public Pages
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/404.vue'

// Jurusan Pages
import rpl from '@/pages/jurusan/rpl.vue'
import pg from '@/pages/jurusan/pg.vue'
import tkj from '@/pages/jurusan/tkj.vue'
import tja from '@/pages/jurusan/tja.vue'

// Auth Pages
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'

// Jalurku Pages
import jalurku from '@/pages/jalurku/Quiz.vue'

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard.vue'

// Routes Config
const routes = [
  // --- Halaman utama
  { path: '/', name: 'Home', component: Home },

  // --- Jurusan
  {
    path: '/jurusan',
    name: 'Jurusan',
    children: [
      { path: 'rpl', name: 'rpl', component: rpl },
      { path: 'pg', name: 'pg', component: pg },
      { path: 'tkj', name: 'tkj', component: tkj },
      { path: 'tja', name: 'tja', component: tja },
    ],
  },

  // --- Auth
  {
    path: '/auth',
    name: 'Auth',
    children: [
      { path: 'login', name: 'login', component: Login },
      { path: 'register', name: 'register', component: Register },
    ],
  },

  // --- Jalurku
  { path: '/jalurku', name: 'jalurku', component: jalurku },

  // --- Admin
  {
    path: '/admin',
    name: 'Admin',
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: '', name: 'AdminDashboard', component: AdminDashboard },
    ],
  },

  // --- Fallback 404
  { path: '/:pathMatch(.*)*', name: '404', component: NotFound },
]

// 🧩 Router Instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Navigation Guard (proteksi admin)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  // kalau rute butuh autentikasi
  if (to.meta.requiresAuth) {
    if (!token) {
      // belum login → ke halaman login
      return next('/auth/login')
    }

    // kalau butuh role tertentu (misal admin)
    if (to.meta.role && to.meta.role !== role) {
      // misal user biasa coba buka /admin
      return next('/')
    }
  }

  next()
})

// Export router
export default router
