<template>
  <!-- HERO -->
  <section class="h-screen bg-[url('/images/tja_images.jpg')] bg-fixed bg-no-repeat bg-cover bg-center">
    <!-- Teks dekoratif menyebar -->
    <div class="absolute inset-0 overflow-hidden">
      <span class="absolute text-blue-400 text-6xl font-bold top-[23%] left-[10%] lg:left-[23%] select-none "
        data-aos="zoom-in" data-aos-delay="1200">
        <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="60px" fill="#ed1e28" >
          <path
            d="M189-160q-60 0-102.5-43T42-307q0-9 1-18t3-18l84-336q14-54 57-87.5t98-33.5h390q55 0 98 33.5t57 87.5l84 336q2 9 3.5 18.5T919-306q0 61-43.5 103.5T771-160q-42 0-78-22t-54-60l-28-58q-5-10-15-15t-21-5H385q-11 0-21 5t-15 15l-28 58q-18 38-54 60t-78 22Zm3-80q19 0 34.5-10t23.5-27l28-57q15-31 44-48.5t63-17.5h190q34 0 63 18t45 48l28 57q8 17 23.5 27t34.5 10q28 0 48-18.5t21-46.5q0 1-2-19l-84-335q-7-27-28-44t-49-17H285q-28 0-49.5 17T208-659l-84 335q-2 6-2 18 0 28 20.5 47t49.5 19Zm348-280q17 0 28.5-11.5T580-560q0-17-11.5-28.5T540-600q-17 0-28.5 11.5T500-560q0 17 11.5 28.5T540-520Zm80-80q17 0 28.5-11.5T660-640q0-17-11.5-28.5T620-680q-17 0-28.5 11.5T580-640q0 17 11.5 28.5T620-600Zm0 160q17 0 28.5-11.5T660-480q0-17-11.5-28.5T620-520q-17 0-28.5 11.5T580-480q0 17 11.5 28.5T620-440Zm80-80q17 0 28.5-11.5T740-560q0-17-11.5-28.5T700-600q-17 0-28.5 11.5T660-560q0 17 11.5 28.5T700-520Zm-360 60q13 0 21.5-8.5T370-490v-40h40q13 0 21.5-8.5T440-560q0-13-8.5-21.5T410-590h-40v-40q0-13-8.5-21.5T340-660q-13 0-21.5 8.5T310-630v40h-40q-13 0-21.5 8.5T240-560q0 13 8.5 21.5T270-530h40v40q0 13 8.5 21.5T340-460Zm140-20Z" />
        </svg>
      </span>
      <span class="absolute text-blue-400 text-5xl font-semibold top-[30%] left-[85%] lg:left-[74%] select-none "
        data-aos="zoom-in" data-aos-delay="1400">
        <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#ed1e28">
          <path
            d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
        </svg>
      </span>
      <span class="absolute text-blue-400 text-7xl font-bold top-[68%] left-[15%] lg:left-[30%] select-none "
        data-aos="zoom-in" data-aos-delay="1600">
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="45px" fill="#ed1e28">
          <path
            d="M480-120q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM254-346l-84-86q59-59 138.5-93.5T480-560q92 0 171.5 35T790-430l-84 84q-44-44-102-69t-124-25q-66 0-124 25t-102 69ZM84-516 0-600q92-94 215-147t265-53q142 0 265 53t215 147l-84 84q-77-77-178.5-120.5T480-680q-116 0-217.5 43.5T84-516Z" />
        </svg>
      </span>
      <span class="absolute text-blue-400 text-6xl font-semibold top-[70%] left-[70%] lg:left-[65%] select-none "
        data-aos="zoom-in" data-aos-delay="900">
        <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="55px" fill="#ed1e28">
          <path
            d="M480-80q-33 0-56.5-23.5T400-160q0-21 11-39t29-29v-92H320q-33 0-56.5-23.5T240-400v-92q-18-9-29-27t-11-41q0-33 23.5-56.5T280-640q33 0 56.5 23.5T360-560q0 23-11 40t-29 28v92h120v-320h-80l120-160 120 160h-80v320h120v-80h-40v-160h160v160h-40v80q0 33-23.5 56.5T640-320H520v92q19 10 29.5 28t10.5 40q0 33-23.5 56.5T480-80Z" />
        </svg>
      </span>
    </div>
    <div class="flex flex-col items-center justify-center text-center mx-auto max-w-5xl h-full text-gray-800"
      data-aos="fade-up">
      <div class="flex flex-col gap-6">
        <h1 id="heading" class="inter text-5xl md:text-7xl" data-aos="fade-down" data-aos-delay="100">
          Temukan <span class="text-red-500">Jalur</span> Yang <br />
          Pas Untukmu
        </h1>

        <p class="text-lg md:text-2xl inter" data-aos="fade-up" data-aos-delay="300">
          Arah Tepat, Jalur Pasti, Impian Tercapai. </p>
      </div>

      <RouterLink to="/jalurku"
        class="mt-6 bg-red-600 text-white flex items-center justify-center gap-2 p-3 shadow-md hover:shadow-xl hover:scale-110 hover:bg-red-700 active:bg-gray-100 active:shadow-sm transition w-60"
        data-aos="zoom-in" data-aos-delay="600">
        Kunjungi Jalurku →
      </RouterLink>
    </div>
  </section>

  <!-- FITUR SECTION -->
  <section class="max-w-7xl mx-auto px-5 py-16 text-gray-800">
    <div class="grid md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-offset="200" data-aos-duration="1000">
      <!-- Card 1 -->
      <div
        class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
        data-aos="zoom-in-up">
        <img src="" alt="Ketahui Jurusanmu"
          class="w-full h-56 object-cover hover:scale-105 transition-transform duration-500" />
        <div class="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h3 class="text-2xl font-bold text-red-500 mb-2">Ketahui Jurusanmu</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">
              Mengenalkan berbagai jurusan yang tersedia di SMK Telkom Purwokerto serta kisah sukses alumni yang telah
              menempuh jurusan tersebut.
            </p>
          </div>
          <RouterLink to="/Rencanaku"
            class="mt-auto inline-block text-center w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-300">
            Kunjungi →
          </RouterLink>
        </div>
      </div>

      <!-- Card 2 -->
      <div
        class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
        data-aos="zoom-in-up" data-aos-delay="150">
        <img src="" alt="Permainan Interaktif"
          class="w-full h-56 object-cover hover:scale-105 transition-transform duration-500" />
        <div class="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h3 class="text-2xl font-bold text-red-500 mb-2">Permainan Interaktif</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">
              Simulasi interaktif untuk eksplorasi jurusan dengan cara yang menyenangkan dan mudah dipahami.
            </p>
          </div>
          <RouterLink to="/"
            class="mt-auto inline-block text-center w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-300">
            Coba Sekarang →
          </RouterLink>
        </div>
      </div>

      <!-- Card 3 -->
      <div
        class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
        data-aos="zoom-in-up" data-aos-delay="300">
        <img src="" alt="Kerjakan Kuis Angket"
          class="w-full h-56 object-cover hover:scale-105 transition-transform duration-500" />
        <div class="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h3 class="text-2xl font-bold text-red-500 mb-2">Kerjakan Kuis Angket</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">
              Angket studi kasus untuk membantu siswa menemukan jurusan yang paling cocok dengan minat, bakat, dan
              tujuan masa depan mereka.
            </p>
          </div>
          <RouterLink to="/jalurku"
            class="mt-auto inline-block text-center w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-300">
            Mulai Kuis →
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Logo Slider -->
    <div>
      <LogoSlider />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import LogoSlider from '@/components/LogoSlider.vue'

onMounted(() => {
  AOS.init({
    duration: 800, // durasi animasi
    once: true, // hanya sekali muncul
    offset: 100, // jarak mulai animasi dari bawah viewport
  })
})
</script>

<style scoped>
#heading span {
  font-weight: 600;
}
</style>
