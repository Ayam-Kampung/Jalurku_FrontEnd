<template>
  <section class="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4">
    <!-- Judul -->
    <h2 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 text-center">
      Susun Cairan Berdasarkan Warna ⚗️
    </h2>

    <!-- Area Botol -->
    <div
      class="flex flex-wrap justify-center gap-6 md:gap-10 w-full max-w-5xl transition-all duration-500 ease-in-out"
    >
      <div
        v-for="(bottle, i) in bottles"
        :key="'bottle-'+i"
        class="relative w-12 sm:w-14 md:w-16 h-72 sm:h-80 md:h-96
               border-[3px] border-gray-300 rounded-b-[50px]
               bg-gradient-to-t from-gray-50 to-white shadow-[0_8px_18px_rgba(0,0,0,0.08)]
               overflow-hidden flex flex-col justify-end items-center cursor-pointer
               transition-transform duration-500 ease-in-out"
        :class="{
          'tilt-left': pouringIndex === i && tiltDirection === 'left',
          'tilt-right': pouringIndex === i && tiltDirection === 'right'
        }"
        @dragover.prevent
        @drop="drop(i)"
      >
        <!-- Label -->
        <span class="absolute -top-6 text-xs text-gray-500 font-semibold">
          Botol {{ i + 1 }}
        </span>

        <!-- Cairan -->
        <div class="absolute bottom-0 left-0 right-0 flex flex-col-reverse w-full h-full">
          <transition-group name="liquid" tag="div" class="flex flex-col-reverse h-full w-full">
            <div
              v-for="(color, j) in bottle"
              :key="'bottle-'+i+'-'+j"
              :draggable="j === bottle.length - 1 && !finished && !isPouring"
              @dragstart="drag(i)"
              class="shadow-inner"
              :style="{
                height: 100 / maxLevels + '%',
                backgroundColor: color,
                transition: 'all 0.4s ease'
              }"
            ></div>
          </transition-group>
        </div>
      </div>
    </div>

    <!-- Pesan -->
    <p
      v-if="!finished"
      class="mt-10 text-lg font-semibold text-gray-700 text-center transition-all duration-300"
    >
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
      class="mt-10 text-center bg-white border border-gray-200 rounded-2xl px-8 py-6 shadow-lg"
    >
      <h3 class="text-2xl font-bold text-gray-800 mb-2">
        🎉 Keren! Semua Warna Sudah Tersusun Rapi!
      </h3>
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

// level sangat mudah: 3 botol berisi campur, 2 kosong
const easyLayout = [
  [palette[0], palette[1], palette[0], palette[1]], // merah biru campur
  [palette[2], palette[3], palette[2], palette[3]], // kuning hijau campur
  [palette[0], palette[2], palette[1], palette[3]], // campur acak
  [], // kosong 1
  []  // kosong 2
]

const bottles = ref(structuredClone(easyLayout))
const dragFrom = ref(null)
const pouringIndex = ref(null)
const tiltDirection = ref("left")
const isPouring = ref(false)
const msg = ref("Pindahkan cairan untuk memisahkan warna yang sama 🎯")
const finished = ref(false)

// mulai drag
function drag(i) {
  dragFrom.value = i
}

// drop ke botol lain
async function drop(to) {
  if (dragFrom.value == null || finished.value || isPouring.value) return
  await pour(dragFrom.value, to)
  dragFrom.value = null
}

// logika menuang dengan animasi halus
async function pour(from, to) {
  if (from === to) return
  const source = bottles.value[from]
  const target = bottles.value[to]
  if (!source.length) return

  const color = source[source.length - 1]
  const topTarget = target[target.length - 1]

  // warna beda dan target tidak kosong → tidak bisa
  if (topTarget && topTarget !== color) {
    msg.value = "⚠️ Warna tidak cocok!"
    return
  }

  // hitung warna sama di atas source
  let sameTop = 1
  for (let i = source.length - 2; i >= 0; i--) {
    if (source[i] === color) sameTop++
    else break
  }

  const space = maxLevels - target.length
  if (space === 0) {
    msg.value = "❌ Botol penuh!"
    return
  }

  const move = Math.min(sameTop, space)

  // animasi: tentukan arah miring
  tiltDirection.value = from < to ? "right" : "left"
  pouringIndex.value = from
  isPouring.value = true
  msg.value = "🍶 Menuang..."

  // durasi miring + cairan delay
  await new Promise((resolve) => setTimeout(resolve, 450))

  // pindahkan layer per layer (seolah cairan mengalir)
  for (let i = 0; i < move; i++) {
    await new Promise((r) => setTimeout(r, 180))
    target.push(color)
    source.pop()
  }

  // kembalikan posisi
  await new Promise((resolve) => setTimeout(resolve, 300))
  pouringIndex.value = null
  isPouring.value = false

  checkWin()
}

// cek kemenangan
function checkWin() {
  const win = bottles.value.every(
    (b) => b.length === 0 || (b.length === maxLevels && b.every((c) => c === b[0]))
  )
  if (win) {
    finished.value = true
    confetti({ spread: 80, particleCount: 160, origin: { y: 0.7 } })
    msg.value = ""
  }
}

// reset ulang game
function reset() {
  bottles.value = structuredClone(easyLayout)
  dragFrom.value = null
  pouringIndex.value = null
  finished.value = false
  msg.value = "Pindahkan cairan untuk memisahkan warna yang sama 🎯"
}
</script>

<style scoped>
.liquid-enter-active,
.liquid-leave-active {
  transition: all 0.4s ease;
  transform-origin: bottom;
}
.liquid-enter-from {
  transform: scaleY(0.4);
  opacity: 0.4;
}
.liquid-enter-to {
  transform: scaleY(1);
  opacity: 1;
}

/* animasi tuang */
.tilt-left {
  transform: rotate(-18deg) translateY(8px);
  transform-origin: bottom right;
}
.tilt-right {
  transform: rotate(18deg) translateY(8px);
  transform-origin: bottom left;
}

/* transisi halus */
.tilt-left,
.tilt-right {
  transition: transform 0.6s cubic-bezier(0.55, 0.09, 0.68, 0.53);
}
</style>
