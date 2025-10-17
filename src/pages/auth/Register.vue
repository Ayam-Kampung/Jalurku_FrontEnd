<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-white px-6">
    <!-- Card -->
    <div class="w-full max-w-md bg-white text-black rounded-2xl shadow-xl p-8 space-y-6">
      <!-- Logo -->
      <div class="flex flex-col items-center">
        <img src="@/assets/images/Logo-SMK.webp" alt="Logo SMK" class="h-14 mb-3" />
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- Name -->
        <div>
          <label class="block text-sm font-semibold mb-1">Nama Lengkap</label>
          <input
            v-model="registerForm.name"
            type="text"
            placeholder="Masukkan nama lengkap kamu"
            class="w-full px-4 py-3 bg-white rounded-md border border-red text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold mb-1">Email</label>
          <input
            v-model="registerForm.email"
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
            v-model="registerForm.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Masukkan password kamu"
            class="w-full px-4 py-3 bg-white rounded-md border border-red text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <!-- Tombol icon mata -->
          <button
            type="button"
            @click="togglePassword"
            class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-red-500"
            style="top: 1.9rem;"
          >
            <!-- Mata tertutup -->
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.33 4.5 12 4.5c4.67 0 8.578 3.01 9.964 7.183.07.207.07.432 0 .639C20.578 16.49 16.67 19.5 12 19.5c-4.67 0-8.578-3.01-9.964-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <!-- Mata terbuka -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.5 12c1.44 3.83 5.03 6.75 9.5 6.75 1.34 0 2.63-.26 3.8-.74M21 21L3 3m12.97 9.75a3 3 0 01-4.47 0M9.88 9.88a3 3 0 014.24 4.24" />
            </svg>
          </button>
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <label class="block text-sm font-semibold mb-1">Konfirmasi Password</label>
          <input
            v-model="registerForm.password_confirmation"
            :type="showConfirm ? 'text' : 'password'"
            placeholder="Ulangi password kamu"
            class="w-full px-4 py-3 bg-white rounded-md border border-red text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <!-- Tombol icon mata untuk konfirmasi -->
          <button
            type="button"
            @click="toggleConfirm"
            class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-red-500"
            style="top: 1.9rem;"
          >
            <svg v-if="!showConfirm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.33 4.5 12 4.5c4.67 0 8.578 3.01 9.964 7.183.07.207.07.432 0 .639C20.578 16.49 16.67 19.5 12 19.5c-4.67 0-8.578-3.01-9.964-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.5 12c1.44 3.83 5.03 6.75 9.5 6.75 1.34 0 2.63-.26 3.8-.74M21 21L3 3m12.97 9.75a3 3 0 01-4.47 0M9.88 9.88a3 3 0 014.24 4.24" />
            </svg>
          </button>
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
          <span v-if="!loading">Daftar</span>
          <span v-else>Mengirim data...</span>
        </button>
      </form>

      <!-- Login link -->
      <p class="text-center text-sm mt-4">
        Sudah punya akun?
        <RouterLink to="/auth/login" class="text-red-500 hover:underline">Masuk di sini</RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { authAPI } from '@/services/api'
import { storage } from '@/utils/storage'
import { useRouter } from 'vue-router'

const router = useRouter()

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const errorMessage = ref('')
const loading = ref(false)

// 👁️ Toggle password visibility
const showPassword = ref(false)
const showConfirm = ref(false)

const togglePassword = () => (showPassword.value = !showPassword.value)
const toggleConfirm = () => (showConfirm.value = !showConfirm.value)

// Fungsi register (tidak diubah)
const handleRegister = async () => {
  try {
    loading.value = true
    const data = await authAPI.register(registerForm.value)
    if (data.status === 'success') {
      storage.setToken(data.data.token)
      router.push('/')
    } else {
      errorMessage.value = data.message
    }
  } catch (err) {
    errorMessage.value = err.message
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
