<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-white px-6">
    <!-- Card -->
    <div class="w-full max-w-md bg-white text-black rounded-2xl shadow-xl p-8 space-y-6">
      <!-- Logo -->
      <div class="flex flex-col items-center">
        <img src="@/assets/images/Logo-SMK.png" alt="Logo SMK" class="h-14 mb-3" />
        <!-- <h2 class="text-2xl font-bold text-red-500">Buat Akun Baru</h2>
        <p class="text-gray-500 text-sm">Daftar untuk melanjutkan ke JalurKu</p> -->
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
        <div>
          <label class="block text-sm font-semibold mb-1">Password</label>
          <input
            v-model="registerForm.password"
            type="password"
            placeholder="Masukkan password kamu"
            class="w-full px-4 py-3 bg-white rounded-md border border text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        
        <!-- Alert -->
        <transition name="fade">
          <div v-if="message" class="text-center text-sm p-2 rounded-md" :class="{
            'bg-green-100 text-green-700': success,
            'bg-white text-red-600': !success
          }">
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
import { authAPI } from '@/services/api';
import { storage } from '@/utils/storage';
import { useRouter } from 'vue-router'

const registerForm = ref({ name: '', email: '', password: '' });
const router = useRouter()

const handleRegister = async () => {
  try {
    const data = await authAPI.register(registerForm.value);
    if (data.status === 'success') {
      alert('Registrasi berhasil! Silakan login.');
      router.push('/auth/login')
    } else {
      alert('Registrasi gagal: ' + data.message);
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
