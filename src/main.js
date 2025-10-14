import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
import 'aos/dist/aos.css'
import AOS from 'aos'

const app = createApp(App)

// Pasang router
app.use(router)

// Jalankan AOS
AOS.init({
  duration: 800, // durasi animasi
  once: true,    // hanya jalan sekali per elemen
})

// ⬇️ Tambahkan baris ini untuk refresh AOS setelah navigasi route
router.afterEach(() => {
  AOS.refreshHard()
})

// Mount ke elemen #app
app.mount('#app')
