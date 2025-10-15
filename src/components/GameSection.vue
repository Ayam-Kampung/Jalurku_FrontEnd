<template>
  <section class="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4">
    <!-- Judul -->
    <h2 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 text-center">
      Susun Cairan Berdasarkan Warna ⚗️
    </h2>

    <!-- Area Gelas -->
    <div class="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-5xl transition-all duration-500 ease-in-out">
      <div
        v-for="(bottle, i) in bottles"
        :key="'bottle-'+i"
        class="relative w-14 sm:w-16 md:w-20 h-80 sm:h-88 md:h-96
               border-[4px] border-gray-400 bg-white/50 backdrop-blur-sm rounded-t-[40px] rounded-b-[60px]
               overflow-hidden flex flex-col justify-end items-center cursor-pointer shadow-[inset_0_0_12px_rgba(0,0,0,0.15)]
               transition-transform duration-500 ease-in-out"
        :class="{
          'tilt-left': pouringIndex === i && tiltDirection === 'left',
          'tilt-right': pouringIndex === i && tiltDirection === 'right'
        }"
        @dragover.prevent
        @drop="drop(i)"
      >
        <!-- Label -->
        <span class="absolute -top-6 text-xs text-gray-600 font-semibold">Gelas {{ i + 1 }}</span>

        <!-- Cairan -->
        <div class="absolute bottom-0 left-0 right-0 flex flex-col-reverse w-full h-full">
          <transition-group name="liquid" tag="div" class="flex flex-col-reverse h-full w-full">
            <div
              v-for="(color, j) in bottle"
              :key="'bottle-'+i+'-'+j"
              :draggable="j === bottle.length - 1 && !finished && !isPouring"
              @dragstart="drag(i)"
              class="shadow-inner border-t border-white/40"
              :style="{
                height: 100 / maxLevels + '%',
                backgroundColor: color,
                transition: 'all 0.5s ease'
              }"
            ></div>
          </transition-group>
        </div>
      </div>
    </div>

    <!-- Pesan -->
    <p v-if="!finished" class="mt-10 text-lg font-semibold text-gray-700 text-center transition-all duration-300">
      {{ msg }}
    </p>

    <!-- Tombol -->
    <div class="mt-6 flex gap-4">
      <button
        v-if="!finished"
        @click="reset"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-xl transition-all"
      >
        🔁 Restart
      </button>
    </div>

    <!-- Hasil -->
    <div
      v-if="finished"
      class="mt-10 text-center bg-white border border-gray-200 rounded-2xl px-8 py-6 shadow-xl backdrop-blur-sm"
    >
      <h3 class="text-2xl font-bold text-gray-800 mb-3">
        🎉 Hebat! Semua Warna Sudah Tersusun Rapi!
      </h3>
      <p class="text-lg text-gray-700 mb-4">Kamu paling cocok di jurusan:</p>
      <p
        class="text-3xl font-extrabold drop-shadow-sm"
        :class="{
          'text-red-500': result === 'RPL',
          'text-blue-500': result === 'TKJ',
          'text-yellow-500': result === 'PG',
          'text-green-500': result === 'TJA'
        }"
      >
        {{ result }}
      </p>
      <button
        @click="reset"
        class="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-xl transition-all"
      >
        Main Lagi 🔁
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue"
import confetti from "canvas-confetti"

const maxLevels = 4
const palette = ["#FF595E", "#1982C4", "#FFCA3A", "#8AC926"]

// 3 gelas campur, 2 kosong
const easyLayout = [
  [palette[0], palette[1], palette[0], palette[1]], // merah biru
  [palette[2], palette[3], palette[2], palette[3]], // kuning hijau
  [palette[0], palette[2], palette[1], palette[3]], // campur
  [], // kosong
  [] // kosong
]

const bottles = ref(structuredClone(easyLayout))
const dragFrom = ref(null)
const pouringIndex = ref(null)
const tiltDirection = ref("left")
const isPouring = ref(false)
const msg = ref("Pindahkan cairan untuk memisahkan warna yang sama 🎯")
const finished = ref(false)
const result = ref("")

function drag(i) {
  dragFrom.value = i
}

async function drop(to) {
  if (dragFrom.value == null || finished.value || isPouring.value) return
  await pour(dragFrom.value, to)
  dragFrom.value = null
}

async function pour(from, to) {
  if (from === to) return
  const source = bottles.value[from]
  const target = bottles.value[to]
  if (!source.length) return

  const color = source[source.length - 1]
  const topTarget = target[target.length - 1]

  if (topTarget && topTarget !== color) {
    msg.value = "⚠️ Warna tidak cocok!"
    return
  }

  let sameTop = 1
  for (let i = source.length - 2; i >= 0; i--) {
    if (source[i] === color) sameTop++
    else break
  }

  const space = maxLevels - target.length
  if (space === 0) {
    msg.value = "❌ Gelas penuh!"
    return
  }

  const move = Math.min(sameTop, space)

  // animasi menuang
  tiltDirection.value = from < to ? "right" : "left"
  pouringIndex.value = from
  isPouring.value = true
  msg.value = "🍶 Menuang..."

  await new Promise((resolve) => setTimeout(resolve, 500))

  for (let i = 0; i < move; i++) {
    await new Promise((r) => setTimeout(r, 200))
    target.push(color)
    source.pop()
  }

  await new Promise((resolve) => setTimeout(resolve, 400))
  pouringIndex.value = null
  isPouring.value = false

  checkWin()
}

function checkWin() {
  const win = bottles.value.every(
    (b) => b.length === 0 || (b.length === maxLevels && b.every((c) => c === b[0]))
  )

  if (win) {
    finished.value = true
    msg.value = ""
    confetti({ spread: 80, particleCount: 160, origin: { y: 0.7 } })

    // tentukan hasil berdasarkan warna terbanyak
    const counts = { RPL: 0, TKJ: 0, PG: 0, TJA: 0 }
    bottles.value.forEach((b) => {
      if (b.length > 0) {
        const color = b[0]
        if (color === "#FF595E") counts.RPL++
        if (color === "#1982C4") counts.TKJ++
        if (color === "#FFCA3A") counts.PG++
        if (color === "#8AC926") counts.TJA++
      }
    })

    result.value = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
  }
}

function reset() {
  bottles.value = structuredClone(easyLayout)
  dragFrom.value = null
  pouringIndex.value = null
  finished.value = false
  msg.value = "Pindahkan cairan untuk memisahkan warna yang sama 🎯"
  result.value = ""
}
</script>

<style scoped>
.liquid-enter-active,
.liquid-leave-active {
  transition: all 0.5s ease;
  transform-origin: bottom;
}
.liquid-enter-from {
  transform: scaleY(0.3);
  opacity: 0.5;
}
.liquid-enter-to {
  transform: scaleY(1);
  opacity: 1;
}

/* animasi tuang halus */
.tilt-left {
  transform: rotate(-18deg) translateY(10px);
  transform-origin: bottom right;
}
.tilt-right {
  transform: rotate(18deg) translateY(10px);
  transform-origin: bottom left;
}
.tilt-left,
.tilt-right {
  transition: transform 0.6s cubic-bezier(0.52, 0.04, 0.25, 0.95);
}
</style>
