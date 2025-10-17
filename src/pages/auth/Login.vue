<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-white px-6">
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
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
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
import { authAPI } from '@/services/api';
import { storage } from '@/utils/storage';
import { useRouter } from 'vue-router'

const loginForm = ref({ identity: '', password: '' });
const router = useRouter()
const user = ref(null);
const token = ref(storage.getToken());

// 👁️ Tambahan untuk toggle password
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  try {
    const data = await authAPI.login(loginForm.value);
    if (data.status === 'success') {
      token.value = data.data.token;
      user.value = data.data.user;
      storage.setToken(data.data.token);
      router.push('/')
    } else {
      alert('Login gagal: ' + data.message);
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
};
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
