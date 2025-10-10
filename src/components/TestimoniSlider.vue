<template>
  <div
    class="overflow-hidden whitespace-nowrap py-10 bg-gray-50"
    @mouseenter="pause"
    @mouseleave="resume"
    @mousedown="pause"
    @mouseup="resume"
  >
    <div
      class="inline-flex gap-8 animate-scroll"
      :class="{ 'paused': isPaused }"
    >
      <!-- Loop isi testimoni -->
      <div
        v-for="(item, i) in testimonials"
        :key="i"
        class="bg-white shadow-md rounded-xl p-6 min-w-[250px] md:min-w-[300px] hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center text-center"
      >
        <img
          v-if="item.image"
          :src="item.image"
          class="h-20 w-20 rounded-full object-cover mb-3"
          alt="profile"
        />
        <p class="italic text-gray-700 mb-2">“{{ item.text }}”</p>
        <h3 class="font-semibold text-gray-900">{{ item.name }}</h3>
        <p class="text-sm text-gray-500">{{ item.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// data testimoni / gambar
const testimonials = ref([
  {
    text: 'Website ini membantu saya menemukan jurusan yang tepat!',
    name: 'Andini Putri',
    role: 'Siswa RPL 2025',
    image: '/images/testimoni1.jpg',
  },
  {
    text: 'Desainnya keren dan mudah digunakan 👍',
    name: 'Bima Satya',
    role: 'Siswa TKJ',
    image: '/images/testimoni2.jpg',
  },
  {
    text: 'Informasi jurusan sangat lengkap dan bermanfaat.',
    name: 'Citra Maharani',
    role: 'Orang Tua Murid',
    image: '/images/testimoni3.jpg',
  },
  {
    text: 'Suka banget fitur “JalurKu”! Bikin penasaran jurusan lain 😄',
    name: 'Eka Darmawan',
    role: 'Siswa PG',
    image: '/images/testimoni4.jpg',
  },
])

// kontrol pause/resume scroll
const isPaused = ref(false)
const pause = () => (isPaused.value = true)
const resume = () => (isPaused.value = false)
</script>

<style scoped>
/* Animasi auto scroll */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 10s linear infinite;
  will-change: transform;
}

/* Saat di-pause */
.paused {
  animation-play-state: paused;
}
</style>
