<template>
  <!-- HERO -->
  <!-- SECTION PERTAMA -->

  <section
    id="intro"
    class="min-h-screen flex flex-col items-center justify-center bg-white text-black text-center pt-24 scroll-mt-24"
    data-aos="fade-up"
  >
    <!-- Teks utama -->
    <h2 class="text-2xl md:text-4xl font-mono mb-4 tracking-wide">
      Selamat Datang di
    </h2>

    <!-- Kata "Playground" -->
    <h1
      class="text-4xl md:text-6xl font-mono font-bold flex gap-1 justify-center items-end select-none"
    >
      <!-- Huruf warna dan rotasi -->
      <span class="text-red-500 inline-block transform rotate-[-12deg]">P</span>
      <span class="text-blue-500 inline-block transform rotate-[8deg]">l</span>
      <span class="text-yellow-500 inline-block transform rotate-[-6deg]">a</span>
      <span class="text-green-500 inline-block transform rotate-[10deg]">y</span>
      <span class="text-black">ground</span>
    </h1>

    <!-- Arrow scroll -->
    <button
      @click="scrollToGame"
      class="mt-12 animate-bounce hover:scale-110 transition-transform duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 text-gray-700 hover:text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </section>

  <!-- SECTION GAME -->
  <section
    id="game"
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 text-center"
    data-aos="fade-up"
  >
    <GameSection />
     <!-- LOGO SLIDER -->
  <div>
    <!-- <LogoSlider /> -->
  </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import LogoSlider from '@/components/LogoSlider.vue'
import GameSection from '@/components/GameSection.vue'

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  })
})

// scroll arrow ke game
const scrollToGame = () => {
  const section = document.getElementById('game')
  if (section) section.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
#heading span {
  font-weight: 600;
}
</style>
  