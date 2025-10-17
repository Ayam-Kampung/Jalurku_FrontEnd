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
        <!-- Username -->
        <div>
          <label class="block text-sm font-semibold mb-1">Username</label>
          <input
            v-model="registerForm.name"
            type="text"
            placeholder="Masukkan username kamu"
            class="w-full px-4 py-3 bg-white rounded-md border border text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold mb-1">Email</label>
          <input
            v-model="registerForm.email"
            type="email"
            placeholder="Masukkan email aktif kamu"
            class="w-full px-4 py-3 bg-white rounded-md border border text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
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
            class="w-full px-4 py-3 bg-white rounded-md border border text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
            required
          />

          <!-- Icon Mata -->
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
            v-if="message"
            class="text-center text-sm p-2 rounded-md"
            :class="{
              'bg-green-100 text-green-700': success,
              'bg-white text-red-600 border border-red-400': !success
            }"
          >
            {{ message }}
          </div>
        </transition>

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-all disabled:opacity-50"
        >
          <span v-if="!loading">Daftar Sekarang</span>
          <span v-else>Mendaftar...</span>
        </button>
      </form>

      <!-- Link ke login -->
      <p class="text-center text-sm mt-4 text-gray-700">
        Sudah punya akun?
        <RouterLink to="/auth/login" class="text-red-500 hover:underline">Masuk di sini</RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { authAPI } from '@/services/api'
import { useRouter } from 'vue-router'

const registerForm = ref({ name: '', email: '', password: '' })
const router = useRouter()

const loading = ref(false)
const message = ref('')
const success = ref(false)
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleRegister = async () => {
  loading.value = true
  message.value = ''
  success.value = false
  try {
    const data = await authAPI.register(registerForm.value)
    if (data.status === 'success') {
      success.value = true
      message.value = 'Registrasi berhasil! Silakan login.'
      setTimeout(() => router.push('/auth/login'), 1500)
    } else {
      success.value = false
      message.value = data.message || 'Registrasi gagal. Coba lagi.'
    }
  } catch (err) {
    success.value = false
    message.value = 'Terjadi kesalahan server. Coba lagi nanti.'
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
