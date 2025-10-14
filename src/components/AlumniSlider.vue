<template>
  <section class="relative w-full max-w-6xl mx-auto mt-20 px-5 mb-10">
    <h2 class="text-3xl font-bold text-center text-red-600 mb-10">
      Cerita Alumni
    </h2>

    <div class="overflow-hidden relative rounded-2xl shadow-lg bg-white">
      <div
        class="flex transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <!-- Card Alumni -->
        <div
          v-for="(alumni, index) in alumnis"
          :key="index"
          class="flex-shrink-0 w-full flex flex-col lg:flex-row items-center gap-10 p-8"
        >
          <!-- Foto -->
          <div class="w-full lg:w-1/2 flex justify-center">
            <div class="relative group">
              <img
                :src="alumni.image"
                :alt="alumni.name"
                class="w-64 h-64 object-cover rounded-xl shadow-xl border-4 border-white group-hover:scale-105 transition-transform duration-500"
              />
              <div
                class="absolute inset-0 rounded-xl bg-gradient-to-t from-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
            </div>
          </div>

          <!-- Info -->
          <div class="w-full lg:w-1/2 text-gray-800">
            <h3 class="text-2xl font-bold mb-3 text-red-600">
              {{ alumni.title }}
            </h3>
            <p class="text-sm md:text-base leading-relaxed mb-4 text-gray-600 italic">
              "{{ alumni.quote1 }}"
            </p>
            <p class="text-sm md:text-base leading-relaxed mb-6 text-gray-600 italic">
              "{{ alumni.quote2 }}"
            </p>
            <span class="font-semibold text-gray-700 block mb-6">
              — {{ alumni.name }}, Alumni {{ alumni.major }} {{ alumni.year }}
            </span>

            <div class="flex flex-wrap gap-4 mt-2">
              <img
                v-for="(logo, i) in alumni.universities"
                :key="i"
                :src="logo.src"
                :alt="logo.alt"
                class="w-28 h-12 object-contain hover:scale-105 transition-transform"
                :title="logo.title"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Arrows -->
      <button
        @click="prevSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-red-500 text-red-600 hover:text-white rounded-full shadow-md w-10 h-10 flex items-center justify-center transition-all duration-300 border border-gray-200 backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-red-500 text-red-600 hover:text-white rounded-full shadow-md w-10 h-10 flex items-center justify-center transition-all duration-300 border border-gray-200 backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Dots -->
    <div class="flex justify-center gap-3 mt-6">
      <span
        v-for="(alumni, index) in alumnis"
        :key="'dot-' + index"
        class="w-3 h-3 rounded-full transition-all duration-300 cursor-pointer"
        :class="currentIndex === index ? 'bg-red-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'"
        @click="currentIndex = index"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props untuk menerima data dari parent (misal PG.vue)
const props = defineProps({
  alumnis: {
    type: Array,
    required: true,
  },
})

// Index slide saat ini
const currentIndex = ref(0)

// Hitung total slide
const totalSlides = computed(() => props.alumnis.length)

// Fungsi navigasi
function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value
}
</script>
