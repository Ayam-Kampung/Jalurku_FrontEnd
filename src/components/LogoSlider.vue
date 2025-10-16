<template>
  <section
    class="relative overflow-hidden py-8 bg-white"
    @mouseenter="pause"
    @mouseleave="resume"
    @mousedown="pause"
    @mouseup="resume"
  >
    <!-- Kontainer utama -->
    <div class="flex items-center w-max animate-scroll" :class="{ paused: isPaused }">
      <!-- Loop pertama -->
      <template v-for="(logo, i) in logos" :key="'a' + i">
        <img
          :src="logo"
          alt="Logo"
          class="logo-img object-contain select-none pointer-events-none transition-transform duration-300 hover:scale-105"
        />
      </template>

      <!-- Loop kedua -->
      <template v-for="(logo, i) in logos" :key="'b' + i">
        <img
          :src="logo"
          alt="Logo"
          class="logo-img object-contain select-none pointer-events-none transition-transform duration-300 hover:scale-105"
        />
      </template>
    </div>

    <!-- Fade lembut kiri-kanan -->
    <div
      class="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"
    ></div>
    <div
      class="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"
    ></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Import logo
import JIHCLogo from '@/assets/images/Logo-JHIC.png'
import KOMDIGILogo from '@/assets/images/Logo-KOMDIGI.png'
import MASPIONLogo from '@/assets/images/Logo-MASPION.png'
import I000Logo from '@/assets/images/Logo-1000.png'

// Daftar logo
const logos = ref([JIHCLogo, KOMDIGILogo, MASPIONLogo, I000Logo])

// Kontrol pause/resume
const isPaused = ref(false)
const pause = () => (isPaused.value = true)
const resume = () => (isPaused.value = false)
</script>

<style scoped>
/* Scroll kiri tanpa jeda */
@keyframes scrollLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scrollLeft 25s linear infinite;
  display: flex;
  will-change: transform;
}

/* Pause saat hover */
.paused {
  animation-play-state: paused;
}

/* Responsive size pakai clamp agar proporsional di semua layar */
.logo-img {
  height: clamp(14rem, 28vw, 28rem); /* Mobile: 4rem → Desktop: 8rem */
  transition: transform 0.3s ease;
}

/* Hover animasi lembut */
.logo-img:hover {
  transform: scale(1.05);
}
</style>
