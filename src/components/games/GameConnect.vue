<template>
  <section
    class="min-h-screen flex flex-col items-center justify-center  py-12 px-4"
  >
    <!-- Judul -->
    <div class="text-center mb-8">
      <h2 class="text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">
        Hubungkan Kabel Energi ⚡
      </h2>
      <p class="text-slate-600 text-base max-w-md mx-auto">
        Tarik dari titik di kiri ke titik di kanan. Pastikan semua kabel terhubung sempurna tanpa tumpang tindih!
      </p>
    </div>

    <!-- Area Game -->
    <div
      class="relative rounded-3xl shadow-2xl border border-slate-200 bg-gradient-to-tr from-white/70 via-indigo-100/40 to-blue-100/50 backdrop-blur-lg w-[350px] sm:w-[440px] h-[440px] flex items-center justify-center overflow-hidden"
    >
      <canvas ref="canvas" width="400" height="400" class="rounded-2xl"></canvas>

      <!-- Tombol -->
      <div class="absolute bottom-5 left-0 right-0 flex justify-center">
        <button
          @click="reset"
          class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95"
        >
          🔁 Ulangi
        </button>
      </div>
    </div>

    <!-- Pesan -->
    <transition name="fade">
      <p
        v-if="finished"
        class="mt-10 text-2xl font-bold text-green-600 drop-shadow-lg transition-all"
      >
        ⚡ Koneksi Energi Sempurna!
      </p>
    </transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import confetti from "canvas-confetti"

const canvas = ref(null)
let ctx

const colors = ["#FF6B6B", "#4D96FF", "#FFD93D", "#6BCB77"]

const nodes = ref([])
const lines = ref([])
let dragging = null
let finished = ref(false)

onMounted(() => {
  ctx = canvas.value.getContext("2d")
  generateRandomNodes()
  draw()
  canvas.value.addEventListener("mousedown", handleDown)
  canvas.value.addEventListener("mousemove", handleMove)
  canvas.value.addEventListener("mouseup", handleUp)
})

// 🎲 buat posisi node random
function generateRandomNodes() {
  nodes.value = []
  const pairs = 3
  const usedLeft = []
  const usedRight = []

  for (let i = 0; i < pairs; i++) {
    const color = colors[i]
    let yLeft = getUniqueY(usedLeft)
    let yRight = getUniqueY(usedRight)
    nodes.value.push({ id: i + 1, side: "left", x: 70, y: yLeft, color, pair: i + 1 })
    nodes.value.push({ id: i + 1 + pairs, side: "right", x: 330, y: yRight, color, pair: i + 1 })
  }
}

function getUniqueY(used) {
  let y
  do {
    y = Math.floor(Math.random() * 240) + 100
  } while (used.some((v) => Math.abs(v - y) < 70))
  used.push(y)
  return y
}

function draw() {
  ctx.clearRect(0, 0, 400, 400)
  drawPanelGrid()

  lines.value.forEach((l) => drawLine(l.x1, l.y1, l.x2, l.y2, l.color))
  if (dragging) drawLine(dragging.x1, dragging.y1, dragging.x2, dragging.y2, dragging.color, true)

  nodes.value.forEach((n) => drawNode(n))
}

function drawPanelGrid() {
  const gradient = ctx.createLinearGradient(0, 0, 400, 400)
  gradient.addColorStop(0, "rgba(255,255,255,0.6)")
  gradient.addColorStop(1, "rgba(255,255,255,0.9)")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 400, 400)

  ctx.strokeStyle = "rgba(0,0,0,0.06)"
  ctx.lineWidth = 1
  for (let i = 40; i < 400; i += 40) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 400)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(400, i)
    ctx.stroke()
  }
}

function drawNode(n) {
  const radius = 15
  const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 1.5)
  glow.addColorStop(0, n.color)
  glow.addColorStop(1, "transparent")

  ctx.beginPath()
  ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
  ctx.fillStyle = n.color
  ctx.fill()
  ctx.shadowBlur = 18
  ctx.shadowColor = n.color
  ctx.strokeStyle = glow
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.shadowBlur = 0
  ctx.closePath()
}

function handleDown(e) {
  const { offsetX, offsetY } = e
  const clicked = nodes.value.find((n) => dist(n.x, n.y, offsetX, offsetY) < 18)
  if (clicked) {
    dragging = {
      id: clicked.id,
      pair: clicked.pair,
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
    (n) =>
      n.pair === dragging.pair &&
      n.id !== dragging.id &&
      dist(n.x, n.y, offsetX, offsetY) < 20
  )

  if (target) {
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

function drawLine(x1, y1, x2, y2, color, temp = false) {
  ctx.beginPath()
  const cpX = (x1 + x2) / 2
  ctx.moveTo(x1, y1)
  ctx.quadraticCurveTo(cpX, (y1 + y2) / 2 - 40, x2, y2)
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
  gradient.addColorStop(0, color)
  gradient.addColorStop(1, "#ffffff")
  ctx.strokeStyle = gradient
  ctx.lineWidth = 6
  ctx.lineCap = "round"
  ctx.shadowBlur = temp ? 8 : 18
  ctx.shadowColor = color
  ctx.globalAlpha = temp ? 0.8 : 1
  ctx.stroke()
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
  ctx.closePath()
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

function checkWin() {
  if (lines.value.length === 3) {
    finished.value = true
    confetti({ spread: 80, particleCount: 140, origin: { y: 0.7 } })
  }
}

function reset() {
  lines.value = []
  dragging = null
  finished.value = false
  generateRandomNodes()
  draw()
}
</script>

<style scoped>
canvas {
  cursor: crosshair;
  background: radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 100%);
  transition: all 0.4s ease;
  border-radius: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
