<template>
  <section
    class="relative overflow-hidden py-8 bg-white"
    @mouseenter="pause"
    @mouseleave="resume"
    @mousedown="pause"
    @mouseup="resume"
  >
    <!-- Kontainer utama -->
    <div
      class="slider-track flex items-center gap-20 w-max animate-scroll"
      :class="{ paused: isPaused }"
    >
      <!-- Loop 2x agar transisi halus -->
      <template v-for="n in 2" :key="n">
        <template v-for="(logo, i) in logos" :key="`${n}-${i}`">
          <a
            :href="logo.url"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            <img
              :src="logo.src"
              :alt="logo.name"
              class="logo-img object-contain select-none transition-transform duration-300 hover:scale-110"
            />
          </a>
        </template>
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
import JIHCLogo from '@/assets/images/Logo-JHIC.webp'
import JHLogo from '@/assets/images/Logo-JH.webp'
import KOMDIGILogo from '@/assets/images/Logo-KOMDIGI.webp'
import MASPIONLogo from '@/assets/images/Logo-MASPION.webp'
import GARUDALogo from '@/assets/images/Logo-Garuda-Spark.webp'

// Daftar logo dengan link
const logos = ref([
  {
    name: 'JIHC',
    src: JIHCLogo,
    url: 'https://jagoanhosting.com/jhic/',
  },
  {
    name: 'JH',
    src: JHLogo,
    url: 'https://jagoanhosting.com',
  },
  {
    name: 'KOMDIGI',
    src: KOMDIGILogo,
    url: 'https://komdigi.id',
  },
  {
    name: 'MASPION',
    src: MASPIONLogo,
    url: 'https://maspion.com',
  },
  {
    name: 'GARUDA Spark',
    src: GARUDALogo,
    url: 'https://1000startupdigital.id/',
  },
])

// Kontrol pause/resume
const isPaused = ref(false)
const pause = () => (isPaused.value = true)
const resume = () => (isPaused.value = false)
</script>

<style scoped>
/* Scroll kiri tanpa jeda dan halus */
@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scrollLeft 25s linear infinite;
  display: flex;
  will-change: transform;
}

.slider-track > * {
  flex-shrink: 0;
}

/* Pause saat hover */
.paused {
  animation-play-state: paused;
}

.logo-img {
  height: clamp(6rem, 12vw, 12rem);
  transition: transform 0.3s ease;
}
</style>
