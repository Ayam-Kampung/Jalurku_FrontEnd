<template>
  <div class="bg-[#f9f5f0] py-10 overflow-hidden select-none">
    <!-- Layer 1 -->
    <div
      class="flex whitespace-nowrap mb-6 animate-scroll-left"
      :class="{ 'paused': paused }"
      @mouseenter="pause"
      @mouseleave="resume"
    >
      <div
        v-for="(item, i) in layer1"
        :key="'l1-' + i"
        class="inline-block mx-2 rounded-md overflow-hidden shadow-md bg-white"
      >
        <img :src="item.image" alt="" class="h-48 w-auto object-cover" />
      </div>
      <!-- Duplicate for seamless loop -->
      <div
        v-for="(item, i) in layer1"
        :key="'l1-copy-' + i"
        class="inline-block mx-2 rounded-md overflow-hidden shadow-md bg-white"
      >
        <img :src="item.image" alt="" class="h-48 w-auto object-cover" />
      </div>
    </div>

    <!-- Layer 2 (arah kanan) -->
    <div
      class="flex whitespace-nowrap mb-6 animate-scroll-right"
      :class="{ 'paused': paused }"
      @mouseenter="pause"
      @mouseleave="resume"
    >
      <div
        v-for="(item, i) in layer2"
        :key="'l2-' + i"
        class="inline-block mx-2 rounded-md overflow-hidden shadow-md bg-white"
      >
        <img :src="item.image" alt="" class="h-48 w-auto object-cover" />
      </div>
      <div
        v-for="(item, i) in layer2"
        :key="'l2-copy-' + i"
        class="inline-block mx-2 rounded-md overflow-hidden shadow-md bg-white"
      >
        <img :src="item.image" alt="" class="h-48 w-auto object-cover" />
      </div>
    </div>

    <!-- Layer 3 (arah kiri, sama seperti 1) -->
    <div
      class="flex whitespace-nowrap animate-scroll-left"
      :class="{ 'paused': paused }"
      @mouseenter="pause"
      @mouseleave="resume"
    >
      <div
        v-for="(item, i) in layer3"
        :key="'l3-' + i"
        class="inline-block mx-2 rounded-md overflow-hidden shadow-md bg-white"
      >
        <img :src="item.image" alt="" class="h-48 w-auto object-cover" />
      </div>
      <div
        v-for="(item, i) in layer3"
        :key="'l3-copy-' + i"
        class="inline-block mx-2 rounded-md overflow-hidden shadow-md bg-white"
      >
        <img :src="item.image" alt="" class="h-48 w-auto object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// contoh isi layer (bisa gambar atau teks)
const layer1 = ref([
  { image: '/images/art1.jpg' },
  { image: '/images/art2.jpg' },
  { image: '/images/art3.jpg' },
  { image: '/images/art4.jpg' },
  { image: '/images/art5.jpg' },
])
const layer2 = ref([
  { image: '/images/art6.jpg' },
  { image: '/images/art7.jpg' },
  { image: '/images/art8.jpg' },
  { image: '/images/art9.jpg' },
  { image: '/images/art10.jpg' },
])
const layer3 = ref([
  { image: '/images/art11.jpg' },
  { image: '/images/art12.jpg' },
  { image: '/images/art13.jpg' },
  { image: '/images/art14.jpg' },
  { image: '/images/art15.jpg' },
])

// pause / resume animation
const paused = ref(false)
const pause = () => (paused.value = true)
const resume = () => (paused.value = false)
</script>

<style scoped>
@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
@keyframes scrollRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(50%);
  }
}

/* layer animation speed (bisa disesuaikan) */
.animate-scroll-left {
  animation: scrollLeft 40s linear infinite;
}
.animate-scroll-right {
  animation: scrollRight 45s linear infinite;
}

/* pause effect */
.paused {
  animation-play-state: paused !important;
}
</style>
