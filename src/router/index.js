import { createRouter, createWebHistory } from 'vue-router'
import { adminAPI } from '@/services/api'

// Public Pages
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/404.vue'
import Tentang from '@/pages/Tentang.vue'

// Jurusan Pages
import rpl from '@/pages/jurusan/RPL.vue'
import pg from '@/pages/jurusan/PG.vue'
import tkj from '@/pages/jurusan/TKJ.vue'
import tja from '@/pages/jurusan/TJA.vue'

// Auth Pages
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'

// Jalurku Pages
import jalurku from '@/pages/jalurku/Quiz.vue'
import Rencanaku from '@/pages/jurusan/Rencanaku.vue'

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
      { path: 'RPL', name: 'RPL', component: rpl },
      { path: 'PG', name: 'PG', component: pg },
      { path: 'TKJ', name: 'TKJ', component: tkj },
      { path: 'TJA', name: 'TJA', component: tja },
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

  // Rencanaku
  { path: '/rencanaku', name: 'rencanaku', component: Rencanaku },

  // Tentang
  { path: '/tentang', name: 'tentang', component: Tentang },


  // --- Admin
  {
    path: '/admin',
    name: 'Admin',
    meta: { requiresAdmin: true },
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

// Navigation guard untuk cek admin
router.beforeEach(async (to, _from, next) => {
  // Jika route membutuhkan admin access
  if (to.meta.requiresAdmin) {
    try {
      // Cek ke backend apakah user adalah admin
      const response = await adminAPI.checkAdmin()
      console.log(response)

      // Cek response apakah user adalah admin
      if (response.is_admin === true && response.status === 'success') {
        next()
      } else {
        next({ name: '404' })
      }
    } catch (error) {
      next({ name: '404' })
    }
  } else {
    next()
  }
})

// Navigation Guard (proteksi admin)
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   const role = localStorage.getItem('role')

//   // kalau rute butuh autentikasi
//   if (to.meta.requiresAuth) {
//     if (!token) {
//       // belum login → ke halaman login
//       return next('/auth/login')
//     }

//     // kalau butuh role tertentu (misal admin)
//     if (to.meta.role && to.meta.role !== role) {
//       // misal user biasa coba buka /admin
//       return next('/')
//     }
//   }

//   next()
// })

// Export router
export default router
