<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 transition-all duration-300">
    <!-- Jika belum mulai -->
    <div v-if="!started && !countingDown" class="text-center space-y-6">
      <h1 class="text-4xl font-bold">Yuk Mulai Quiz Penentuan Jurusanmu! </h1>
      <p class="text-gray-600 max-w-lg mx-auto">
        Jawab beberapa pertanyaan singkat untuk menemukan jurusan yang paling cocok buat kamu.
      </p>
      <button
        @click="startCountdown"
        class="bg-red-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-600 transition-all"
      >
        Mulai Sekarang →
      </button>
    </div>

    <!-- Countdown -->
    <transition name="fade" mode="out-in">
      <div v-if="countingDown && !started" key="countdown" class="text-8xl font-bold text-red-500 animate-pulse">
        {{ countdown }}
      </div>
    </transition>

    <!-- Quiz muncul setelah countdown -->
    <transition name="fade" mode="out-in">
      <div v-if="started" key="quiz" class="w-full max-w-3xl p-5 text-center">
        <h2 class="text-2xl font-semibold mb-6">Mana yang lebih menggambarkan diri kamu?</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <button class="bg-red-500 text-white py-4 rounded-md hover:bg-red-600 transition-all duration-300">
            Praktik langsung utak-atik barang
          </button>
          <button class="border-2 border-gray-400 py-4 rounded-md hover:border-red-500 transition-all duration-300">
            Menyusun skema dan rencana program
          </button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const started = ref(false)
const countingDown = ref(false)
const countdown = ref(3)

const startCountdown = () => {
  countingDown.value = true
  countdown.value = 3

  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(interval)
      countingDown.value = false
      started.value = true
    }
  }, 1000)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
