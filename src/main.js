import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // pastikan path ini benar
import './assets/css/main.css' // atau style.css kamu

// Buat aplikasi
const app = createApp(App)

// Pasang router (supaya RouterView berfungsi)
app.use(router)

// Mount ke elemen #app di index.html
app.mount('#app')