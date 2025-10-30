<template>
  <!-- SECTION PERTAMA / HERO -->
  <section id="intro"
    class="min-h-screen flex flex-col items-center justify-center bg-white text-black text-center pt-24 scroll-mt-24"
    data-aos="fade-up">
    <h2 class="text-2xl md:text-4xl font-mono mb-4 tracking-wide">
      Selamat Datang di
    </h2>

    <h1 class="text-4xl md:text-6xl font-mono font-bold flex gap-1 justify-center items-end select-none">
      <span class="text-red-500 inline-block transform rotate-[-12deg]">P</span>
      <span class="text-blue-500 inline-block transform rotate-[8deg]">l</span>
      <span class="text-yellow-500 inline-block transform rotate-[-6deg]">a</span>
      <span class="text-green-500 inline-block transform rotate-[10deg]">y</span>
      <span class="text-black">ground</span>
    </h1>

    <button @click="scrollToGame" class="mt-12 animate-bounce hover:scale-110 transition-transform duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-700 hover:text-red-500" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </section>

  <section class="flex flex-col h-screen bg-white text-black text-center scroll-mt-24" data-aos="fade-up">

    <!-- Box 1 -->
    <div class="flex flex-col md:flex-row items-center justify-center bg-white w-full h-1/2 px-8 md:px-20 text-black">
      <div class="md:basis-1/2 flex justify-center">
        <img :src="preview2" alt="Gambar game 1" class="w-64 md:w-96 rounded-lg">
      </div>
      <div class="md:basis-1/2 text-left md:pl-12 mt-10">
        <h2 class="text-2xl md:text-4xl font-medium text-center">Jangan Ragu untuk memilih Jalurmu sendiri.</h2>
      </div>
    </div>

    <!-- Box 2 -->
    <div
      class="flex flex-col md:flex-row-reverse items-center justify-center bg-red-600  w-full h-1/2 px-8 md:px-20 text-white">
      <div class="md:basis-3/4 flex justify-center">
        <img :src="preview1" alt="Gambar game 2" class="w-60 md:w-64 rounded-lg">
      </div>
      <div class="md:basis-3/4 text-left md:pr-12 mt-10">
        <h2 class="text-2xl md:text-4xl font-medium text-center">Ayo Kreasikan Dirimu!</h2>
      </div>
    </div>

  </section>

  <!-- SECTION GAME PILIHAN -->
  <section id="game"
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 text-center py-16 px-4"
    data-aos="fade-up">
    <!-- Pilihan Game -->
    <Transition name="fade" mode="out-in">
      <div v-if="!selectedGame" key="menu" class="w-full flex flex-col items-center">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10">
          Pilih Game Interaktif
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl w-full">
          <div v-for="game in games" :key="game.id"
            class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center p-6 relative overflow-hidden"
            @click="selectedGame = game.id" data-aos="zoom-in">
            <!-- Gradient hover effect -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-blue-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            </div>

            <img :src="game.image" alt="Game Image"
              class="w-40 h-40 object-contain mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {{ game.title }}
            </h3>
            <p class="text-gray-600 text-sm">{{ game.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Game yang dipilih -->
      <div v-else key="gameplay" class="w-full px-4 md:px-8">
        <button @click="backToMenu"
          class="mb-8 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-5 rounded-xl transition-all duration-300">
          Kembali ke Pilihan Game
        </button>

        <Transition name="fade" mode="out-in">
          <component :is="activeGame" key="active" />
        </Transition>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

import preview1 from '@/assets/images/ide.png'
import preview2 from '@/assets/images/happy_code.png'

// ✅ Import gambar agar muncul di dev & build
import game1 from '@/assets/images/card_memory.png'
import game2 from '@/assets/images/kabel_energi.png'

// ✅ Import game components
import GameFlipCard from '@/components/games/GameFlipCard.vue'
import GameConnect from '@/components/games/GameConnect.vue'

// ✅ State untuk game aktif
const selectedGame = ref(null)

// ✅ Daftar game
const games = [
  {
    id: 'flip',
    title: 'Flip Card Memory',
    desc: 'Coba ingat dan temukan pasangan kartu',
    image: game1,
  },
  {
    id: 'connect',
    title: 'Connect Kabel',
    desc: 'Hubungkan perangkat dengan kabel yang tepat',
    image: game2,
  },
]

// ✅ Game aktif dinamis
const activeGame = computed(() => {
  switch (selectedGame.value) {
    case 'flip':
      return GameFlipCard
    case 'connect':
      return GameConnect
    default:
      return null
  }
})

// ✅ Fungsi kembali ke menu utama
function backToMenu() {
  selectedGame.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ✅ Scroll halus ke section game
function scrollToGame() {
  const section = document.getElementById('game')
  if (section) section.scrollIntoView({ behavior: 'smooth' })
}

// ✅ Inisialisasi AOS
onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  })
})
</script>

<style scoped>
/* Animasi transisi */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
