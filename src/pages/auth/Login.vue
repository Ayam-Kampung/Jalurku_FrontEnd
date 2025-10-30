<template>
  <section class="font-inter min-h-screen flex flex-col items-center justify-center bg-white px-6">
    <!-- Card -->
    <div class="w-full max-w-md bg-white text-black rounded-2xl shadow-xl p-8 space-y-6">
      <!-- Logo -->
      <div class="flex flex-col items-center">
        <img src="@/assets/images/Logo-SMK.webp" alt="Logo SMK" class="h-14 mb-3" />
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Username -->
        <div>
          <label class="block text-sm font-semibold mb-1">Email</label>
          <input
            v-model="loginForm.identity"
            type="email"
            placeholder="Masukkan email kamu"
            class="w-full px-4 py-3 bg-white rounded-md border border-red text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <!-- Password -->
        <div class="relative">
          <label class="block text-sm font-semibold mb-1">Password</label>
          <input
            v-model="loginForm.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Masukkan password kamu"
            class="w-full px-4 py-3 bg-white rounded-md border border-red text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
            required
          />

          <!-- Icon Mata (SVG) -->
          <button
            type="button"
            @click="togglePassword"
            class="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
            :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
          >
            <svg
              v-if="!showPassword"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 013.423-4.944m3.152-1.528A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.06 10.06 0 01-4.49 5.225M3 3l18 18"
              />
            </svg>
          </button>
        </div>

        <!-- Alert -->
        <transition name="fade">
          <div
            v-if="errorMessage"
            class="text-center text-sm bg-white text-red-600 p-2 rounded-md border border-red-400"
          >
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
import { ref } from 'vue'
import { authAPI } from '@/services/api'
import { storage } from '@/utils/storage'
import { useRouter } from 'vue-router'

const loginForm = ref({ identity: '', password: '' })
const router = useRouter()
const user = ref(null)
const token = ref(storage.getToken())

const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const data = await authAPI.login(loginForm.value)

    if (data && data.status === 'success') {
      token.value = data.data.token
      user.value = data.data.user
      storage.setToken(data.data.token)
      router.push('/')
      return
    }

    // Untuk semua kasus gagal (email/password/other), tampilkan pesan generik:
    errorMessage.value = 'Email atau password salah!'
  } catch (err) {
    // Juga tampilkan pesan generik bila terjadi exception/network error:
    errorMessage.value = 'Email atau password salah!'
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
