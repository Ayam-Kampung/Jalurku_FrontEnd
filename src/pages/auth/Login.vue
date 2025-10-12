<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-white px-6">
    <!-- Card -->
    <div class="w-full max-w-md bg-white text-black rounded-2xl shadow-xl p-8 space-y-6">
      <!-- Logo -->
      <div class="flex flex-col items-center">
        <img src="@/assets/images/Logo-SMK.png" alt="Logo SMK" class="h-14 mb-3" />
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Username -->
        <div>
          <label class="block text-sm font-semibold mb-1">Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Masukkan username kamu"
            class="w-full px-4 py-3 bg-white rounded-md border border-red text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-semibold mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Masukkan password kamu"
            class="w-full px-4 py-3 bg-white rounded-md border border-red text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <!-- Alert -->
        <transition name="fade">
          <div v-if="errorMessage" class="text-center text-sm bg-white text-red-600 p-2 rounded-md">
            {{ errorMessage }}
          </div>
        </transition>

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-all disabled:opacity-50"
        >
          <span v-if="!loading">Masuk</span>
          <span v-else>Mengautentikasi...</span>
        </button>
      </form>

      <!-- Register link -->
      <p class="text-center text-sm mt-4">
        Belum punya akun?
        <RouterLink to="/auth/register" class="text-red-500 hover:underline">Daftar di sini</RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import LogoSlider from '@/components/LogoSlider.vue'
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  try {
    const res = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (!res.ok) {
      // backend kasih pesan error misal: "username tidak ditemukan" / "password salah"
      errorMessage.value = data.message || 'Terjadi kesalahan login'
      loading.value = false
      return
    }

    // ✅ Login sukses
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)

    // Arahkan user
    if (data.role === 'admin') {
      window.location.href = '/admin'
    } else {
      window.location.href = '/'
    }
  } catch (err) {
    errorMessage.value = 'Gagal Login'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
