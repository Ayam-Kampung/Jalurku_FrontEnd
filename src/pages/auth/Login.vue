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
          <label class="block text-sm font-semibold mb-1">Username</label>
          <input
            v-model="loginForm.identity"
            type="email"
            placeholder="Masukkan email kamu"
            class="w-full px-4 py-3 bg-white rounded-md border border-red text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-semibold mb-1">Password</label>
          <input
            v-model="loginForm.password"
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
import { authAPI } from '@/services/api';
import { storage } from '@/utils/storage';
import { useRouter } from 'vue-router'

const loginForm = ref({ identity: '', password: '' });
const router = useRouter()

const user = ref(null);
const token = ref(storage.getToken());

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
