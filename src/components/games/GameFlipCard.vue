<template>
  <section class="min-h-[80vh] flex flex-col items-center justify-center py-10">
    <!-- Judul -->
    <div class="flex flex-col items-center mb-5">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-1 text-center">
      Flip Card Memory
      </h2>
      <p class="text-gray-500 text-xs md:text-sm text-center max-w-md">
        Cocokkan pasangan ikon secepat mungkin!
      </p>
    </div>

    <!-- Info waktu & skor -->
    <div
      class="flex items-center gap-4 mb-6 text-gray-700 text-sm md:text-base font-semibold bg-white/70 px-4 py-2 rounded-xl shadow-sm border border-gray-200"
    >
      <p>⏱️ Waktu: <span class="text-blue-600">{{ elapsedTime }}s</span></p>
      <p>Skor: <span class="text-green-600">{{ matchedCount / 2 }}</span></p>
    </div>

    <!-- Grid Kartu -->
    <div
      class="grid grid-cols-4 sm:grid-cols-5 gap-3 max-w-2xl mx-auto mb-6"
    >
      <div
        v-for="card in cards"
        :key="card.id"
        class="relative w-16 h-20 sm:w-20 sm:h-24 cursor-pointer perspective"
        @click="flipCard(card)"
      >
        <div
          class="absolute inset-0 transition-transform duration-500 preserve-3d"
          :class="{ 'rotate-y-180': card.flipped || card.matched }"
        >
          <!-- Depan (cover gambar) -->
          <div
            class="absolute inset-0 flex items-center justify-center bg-cover bg-center rounded-xl border border-gray-400 backface-hidden shadow-inner"
            :style="{ backgroundImage: `url('@/assets/images/cover.jpg')` }"
          >
            <div class="bg-black/30 w-full h-full rounded-xl"></div>
          </div>

          <!-- Belakang (ikon) -->
          <div
            class="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl rounded-xl backface-hidden rotate-y-180 shadow-md"
            :style="{
              backgroundColor: card.color,
              color: 'white',
            }"
          >
            <span class="material-symbols-outlined select-none drop-shadow-lg">
              {{ card.icon }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pesan akhir -->
    <div
      v-if="gameOver"
      class="text-center bg-white border border-gray-200 rounded-2xl px-6 py-5 shadow-xl backdrop-blur-sm text-sm md:text-base"
    >
      <h3
        v-if="matchedCount === cards.length"
        class="text-xl md:text-2xl font-bold text-green-600 mb-2"
      >
        🎉 Hebat! Semua pasangan cocok!
      </h3>
      <h3
        v-else
        class="text-xl md:text-2xl font-bold text-gray-700 mb-2"
      >
        🕒 Waktu: {{ elapsedTime }} detik
      </h3>

      <button
        @click="resetGame"
        class="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-xl transition-all text-sm md:text-base"
      >
        Main Lagi 🔁
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"
import confetti from "canvas-confetti"

// Ikon Google (Material Symbols)
const allIcons = [
  "code", "memory", "router", "computer", "terminal",
  "cloud", "keyboard", "mouse", "wifi", "bolt",
]

// warna latar belakang tiap pasangan
const colors = [
  "#f87171", "#60a5fa", "#facc15", "#34d399",
  "#a78bfa", "#fb923c", "#ec4899", "#14b8a6",
]

const cards = ref([])
const flipped = ref([])
const matchedCount = computed(() => cards.value.filter(c => c.matched).length)
const elapsedTime = ref(0)
const timer = ref(null)
const gameOver = ref(false)

// buat kartu acak
function generateCards() {
  const randomIcons = [...allIcons].sort(() => Math.random() - 0.5).slice(0, 8)
  const temp = []
  randomIcons.forEach((icon, i) => {
    const color = colors[i % colors.length]
    temp.push({ id: i * 2, icon, color, flipped: false, matched: false })
    temp.push({ id: i * 2 + 1, icon, color, flipped: false, matched: false })
  })
  cards.value = temp.sort(() => Math.random() - 0.5)
}

// fungsi flip
function flipCard(card) {
  if (gameOver.value || card.flipped || card.matched || flipped.value.length >= 2) return
  card.flipped = true
  flipped.value.push(card)

  if (flipped.value.length === 2) {
    const [a, b] = flipped.value
    if (a.icon === b.icon) {
      a.matched = b.matched = true
      flipped.value = []
      if (matchedCount.value === cards.value.length) {
        stopTimer()
        gameOver.value = true
        setTimeout(() => confetti({ spread: 80, particleCount: 120, origin: { y: 0.6 } }), 500)
      }
    } else {
      setTimeout(() => {
        a.flipped = b.flipped = false
        flipped.value = []
      }, 900)
    }
  }
}

// stopwatch
function startTimer() {
  stopTimer()
  elapsedTime.value = 0
  timer.value = setInterval(() => {
    elapsedTime.value++
  }, 1000)
}
function stopTimer() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// reset permainan
function resetGame() {
  gameOver.value = false
  elapsedTime.value = 0
  flipped.value = []
  generateCards()
  startTimer()
}

// mulai game
onMounted(() => {
  generateCards()
  startTimer()
})
onUnmounted(() => stopTimer())
</script>

<style scoped>
.perspective {
  perspective: 800px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}

/* Pastikan Google Material Symbols aktif */
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 1,
    'wght' 600,
    'GRAD' 0,
    'opsz' 48;
}
</style>
