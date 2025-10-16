<template>
  <section class="min-h-[80vh] flex flex-col items-center justify-center py-10">
    <!-- Judul & Info -->
    <div class="flex flex-col items-center mb-6">
      <h2 class="text-3xl font-extrabold text-gray-800 mb-2 text-center">
        🧠 Flip Card Memory
      </h2>
      <p class="text-gray-500 text-sm text-center max-w-md">
        Cocokkan pasangan kartu sebelum waktu habis!
      </p>
    </div>

    <!-- Info waktu & skor -->
    <div
      class="flex items-center gap-6 mb-8 text-gray-700 text-lg font-semibold bg-white/70 px-6 py-3 rounded-xl shadow-sm border border-gray-200"
    >
      <p>⏱️ Waktu: <span class="text-blue-600">{{ timeLeft }}s</span></p>
      <p>🏆 Skor: <span class="text-green-600">{{ matchedCount / 2 }}</span></p>
    </div>

    <!-- Grid Kartu -->
    <div
      class="grid grid-cols-4 sm:grid-cols-5 gap-4 max-w-2xl mx-auto mb-8"
    >
      <div
        v-for="card in cards"
        :key="card.id"
        class="relative w-20 h-24 sm:w-24 sm:h-28 cursor-pointer perspective"
        @click="flipCard(card)"
      >
        <div
          class="absolute inset-0 transition-transform duration-500 preserve-3d"
          :class="{ 'rotate-y-180': card.flipped || card.matched }"
        >
          <!-- Depan (tertutup) -->
          <div
            class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl border border-gray-400 backface-hidden shadow-inner"
          >
            <span class="text-2xl select-none">❓</span>
          </div>

          <!-- Belakang (terbuka) -->
          <div
            class="absolute inset-0 flex items-center justify-center text-4xl rounded-xl backface-hidden rotate-y-180 shadow-md"
            :style="{
              backgroundColor: card.color,
              color: 'white',
            }"
          >
            <img
              :src="card.image"
              alt="icon"
              class="w-12 h-12 object-contain select-none drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Pesan akhir -->
    <div
      v-if="gameOver"
      class="text-center bg-white border border-gray-200 rounded-2xl px-8 py-6 shadow-xl backdrop-blur-sm"
    >
      <h3
        v-if="matchedCount === cards.length"
        class="text-2xl font-bold text-green-600 mb-3"
      >
        🎉 Hebat! Kamu Menyelesaikan Semua Pasangan!
      </h3>
      <h3
        v-else
        class="text-2xl font-bold text-red-600 mb-3"
      >
        ⏰ Waktu Habis! Coba Lagi!
      </h3>

      <button
        @click="resetGame"
        class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl transition-all"
      >
        Main Lagi 🔁
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"
import confetti from "canvas-confetti"

// Daftar gambar (bisa diganti dengan file PNG di /public/images/icons/)
const allImages = [
  "/images/icons/laptop.png",
  "/images/icons/router.png",
  "/images/icons/coding.png",
  "/images/icons/wrench.png",
  "/images/icons/switch.png",
  "/images/icons/monitor.png",
  "/images/icons/fiber.png",
  "/images/icons/keyboard.png",
  "/images/icons/mouse.png",
  "/images/icons/server.png",
]

// warna latar belakang tiap pasangan
const colors = [
  "#f87171", "#60a5fa", "#facc15", "#34d399",
  "#a78bfa", "#fb923c", "#ec4899", "#14b8a6",
]

const cards = ref([])
const flipped = ref([])
const matchedCount = computed(() => cards.value.filter(c => c.matched).length)
const timeLeft = ref(60) // detik waktu main
const timer = ref(null)
const gameOver = ref(false)

// buat kartu acak
function generateCards() {
  // ambil 8 gambar random unik dari allImages
  const randomImages = [...allImages].sort(() => Math.random() - 0.5).slice(0, 8)

  const temp = []
  randomImages.forEach((image, i) => {
    const color = colors[i % colors.length]
    temp.push({ id: i * 2, image, color, flipped: false, matched: false })
    temp.push({ id: i * 2 + 1, image, color, flipped: false, matched: false })
  })
  // acak urutan
  cards.value = temp.sort(() => Math.random() - 0.5)
}

// fungsi flip
function flipCard(card) {
  if (gameOver.value || card.flipped || card.matched || flipped.value.length >= 2) return

  card.flipped = true
  flipped.value.push(card)

  if (flipped.value.length === 2) {
    const [a, b] = flipped.value
    if (a.image === b.image) {
      a.matched = b.matched = true
      flipped.value = []

      if (matchedCount.value === cards.value.length) {
        gameOver.value = true
        stopTimer()
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

// timer berjalan
function startTimer() {
  stopTimer()
  timer.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      gameOver.value = true
      stopTimer()
    }
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
  timeLeft.value = 60
  flipped.value = []
  generateCards()
  startTimer()
}

// mulai game
onMounted(() => {
  generateCards()
  startTimer()
})

// pastikan timer berhenti kalau komponen ditinggalkan
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
</style>
