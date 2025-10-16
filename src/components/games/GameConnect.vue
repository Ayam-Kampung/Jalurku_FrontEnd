<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4">
    <!-- Judul -->
    <h2 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
      Hubungkan Kabelnya ⚡
    </h2>
    <p class="text-gray-600 text-center mb-10">
      Tarik dari titik kiri ke titik kanan dengan kabel. Jangan sampai tumpang tindih!
    </p>

    <!-- Area Game -->
    <div class="relative bg-gray-50 rounded-2xl shadow-lg border border-gray-200 p-6 w-[350px] sm:w-[420px] h-[420px]">
      <canvas ref="canvas" width="400" height="400" class="rounded-xl"></canvas>

      <!-- Tombol -->
      <div class="absolute bottom-4 left-0 right-0 flex justify-center">
        <button
          @click="reset"
          class="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-5 rounded-xl transition-all"
        >
          🔁 Ulangi
        </button>
      </div>
    </div>

    <!-- Pesan -->
    <p
      v-if="finished"
      class="mt-10 text-2xl font-bold text-green-600 drop-shadow-sm transition-all"
    >
      ⚡ Koneksi Sempurna!
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import confetti from "canvas-confetti"

const canvas = ref(null)
let ctx

const nodes = ref([
  { id: 1, x: 60, y: 100, color: "#FF595E", paired: 1 },
  { id: 2, x: 60, y: 220, color: "#1982C4", paired: 2 },
  { id: 3, x: 60, y: 340, color: "#8AC926", paired: 3 },

  { id: 4, x: 340, y: 100, color: "#FF595E", paired: 1 },
  { id: 5, x: 340, y: 220, color: "#1982C4", paired: 2 },
  { id: 6, x: 340, y: 340, color: "#8AC926", paired: 3 }
])

let lines = ref([]) // koneksi yang sudah terhubung
let dragging = null
let finished = ref(false)

onMounted(() => {
  ctx = canvas.value.getContext("2d")
  draw()
  canvas.value.addEventListener("mousedown", handleDown)
  canvas.value.addEventListener("mousemove", handleMove)
  canvas.value.addEventListener("mouseup", handleUp)
})

function draw() {
  ctx.clearRect(0, 0, 400, 400)

  // gambar garis
  lines.value.forEach((l) => {
    drawLine(l.x1, l.y1, l.x2, l.y2, l.color)
  })

  // kalau sedang drag
  if (dragging) {
    drawLine(dragging.x1, dragging.y1, dragging.x2, dragging.y2, dragging.color, true)
  }

  // gambar titik
  nodes.value.forEach((n) => {
    ctx.beginPath()
    ctx.arc(n.x, n.y, 15, 0, Math.PI * 2)
    ctx.fillStyle = n.color
    ctx.shadowBlur = 10
    ctx.shadowColor = n.color
    ctx.fill()
    ctx.shadowBlur = 0
    ctx.closePath()
  })
}

function handleDown(e) {
  const { offsetX, offsetY } = e
  const clicked = nodes.value.find((n) => dist(n.x, n.y, offsetX, offsetY) < 15)
  if (clicked) {
    dragging = {
      id: clicked.id,
      paired: clicked.paired,
      x1: clicked.x,
      y1: clicked.y,
      x2: offsetX,
      y2: offsetY,
      color: clicked.color
    }
  }
}

function handleMove(e) {
  if (!dragging) return
  dragging.x2 = e.offsetX
  dragging.y2 = e.offsetY
  draw()
}

function handleUp(e) {
  if (!dragging) return
  const { offsetX, offsetY } = e
  const target = nodes.value.find(
    (n) => n.paired === dragging.paired && n.id !== dragging.id && dist(n.x, n.y, offsetX, offsetY) < 20
  )

  if (target) {
    // pastikan belum ada garis warna sama
    const exists = lines.value.some((l) => l.color === dragging.color)
    if (!exists) {
      lines.value.push({
        x1: dragging.x1,
        y1: dragging.y1,
        x2: target.x,
        y2: target.y,
        color: dragging.color
      })
    }
  }

  dragging = null
  draw()
  checkWin()
}

function drawLine(x1, y1, x2, y2, color, isTemp = false) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = 6
  ctx.lineCap = "round"
  ctx.shadowColor = color
  ctx.shadowBlur = isTemp ? 8 : 15
  ctx.stroke()
  ctx.closePath()
  ctx.shadowBlur = 0
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

function checkWin() {
  if (lines.value.length === 3) {
    finished.value = true
    confetti({ spread: 70, particleCount: 120, origin: { y: 0.7 } })
  }
}

function reset() {
  lines.value = []
  dragging = null
  finished.value = false
  draw()
}
</script>

<style scoped>
canvas {
  cursor: crosshair;
  background: radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 100%);
  transition: all 0.3s ease;
}
</style>
