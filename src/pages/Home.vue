<template>
  <!-- HERO -->
  <section class="h-screen bg-fixed bg-no-repeat bg-cover bg-center relative">
    <div class="absolute inset-0"></div>
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <span class="absolute text-blue-400 text-6xl font-bold top-[23%] left-[10%] lg:left-[23%] select-none"
        data-aos="zoom-in" data-aos-delay="1200">
        <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="60px" fill="#ed1e28">
          <path
            d="M189-160q-60 0-102.5-43T42-307q0-9 1-18t3-18l84-336q14-54 57-87.5t98-33.5h390q55 0 98 33.5t57 87.5l84 336q2 9 3.5 18.5T919-306q0 61-43.5 103.5T771-160q-42 0-78-22t-54-60l-28-58q-5-10-15-15t-21-5H385q-11 0-21 5t-15 15l-28 58q-18 38-54 60t-78 22Zm3-80q19 0 34.5-10t23.5-27l28-57q15-31 44-48.5t63-17.5h190q34 0 63 18t45 48l28 57q8 17 23.5 27t34.5 10q28 0 48-18.5t21-46.5q0 1-2-19l-84-335q-7-27-28-44t-49-17H285q-28 0-49.5 17T208-659l-84 335q-2 6-2 18 0 28 20.5 47t49.5 19Zm348-280q17 0 28.5-11.5T580-560q0-17-11.5-28.5T540-600q-17 0-28.5 11.5T500-560q0 17 11.5 28.5T540-520Zm80-80q17 0 28.5-11.5T660-640q0-17-11.5-28.5T620-680q-17 0-28.5 11.5T580-640q0 17 11.5 28.5T620-600Zm0 160q17 0 28.5-11.5T660-480q0-17-11.5-28.5T620-520q-17 0-28.5 11.5T580-480q0 17 11.5 28.5T620-440Zm80-80q17 0 28.5-11.5T740-560q0-17-11.5-28.5T700-600q-17 0-28.5 11.5T660-560q0 17 11.5 28.5T700-520Zm-360 60q13 0 21.5-8.5T370-490v-40h40q13 0 21.5-8.5T440-560q0-13-8.5-21.5T410-590h-40v-40q0-13-8.5-21.5T340-660q-13 0-21.5 8.5T310-630v40h-40q-13 0-21.5 8.5T240-560q0 13 8.5 21.5T270-530h40v40q0 13 8.5 21.5T340-460Zm140-20Z" />
        </svg>
      </span>
      <span class="absolute text-blue-400 text-5xl font-semibold top-[30%] left-[85%] lg:left-[74%] select-none"
        data-aos="zoom-in" data-aos-delay="1400">
        <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#ed1e28">
          <path
            d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
        </svg>
      </span>
      <span class="absolute text-blue-400 text-7xl font-bold top-[68%] left-[15%] lg:left-[30%] select-none"
        data-aos="zoom-in" data-aos-delay="1600">
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="45px" fill="#ed1e28">
          <path
            d="M480-120q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM254-346l-84-86q59-59 138.5-93.5T480-560q92 0 171.5 35T790-430l-84 84q-44-44-102-69t-124-25q-66 0-124 25t-102 69ZM84-516 0-600q92-94 215-147t265-53q142 0 265 53t215 147l-84 84q-77-77-178.5-120.5T480-680q-116 0-217.5 43.5T84-516Z" />
        </svg>
      </span>
      <span class="absolute text-blue-400 text-6xl font-semibold top-[70%] left-[70%] lg:left-[65%] select-none"
        data-aos="zoom-in" data-aos-delay="900">
        <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="55px" fill="#ed1e28">
          <path
            d="M480-80q-33 0-56.5-23.5T400-160q0-21 11-39t29-29v-92H320q-33 0-56.5-23.5T240-400v-92q-18-9-29-27t-11-41q0-33 23.5-56.5T280-640q33 0 56.5 23.5T360-560q0 23-11 40t-29 28v92h120v-320h-80l120-160 120 160h-80v320h120v-80h-40v-160h160v160h-40v80q0 33-23.5 56.5T640-320H520v92q19 10 29.5 28t10.5 40q0 33-23.5 56.5T480-80Z" />
        </svg>
      </span>
    </div>
    
    <div class="relative flex flex-col items-center justify-center text-center mx-auto max-w-5xl h-full px-6 text-gray-800 font-inter"
      data-aos="fade-up">
      <div class="flex flex-col gap-6">
        <h1 id="heading" class="text-5xl md:text-7xl font-bold drop-shadow-lg font-inter" data-aos="fade-down" data-aos-delay="100">
          Temukan <span class="text-red-500">Jalur</span> Yang <br />
          Pas Untukmu
        </h1>

        <p class="text-lg md:text-2xl font-inter font-medium drop-shadow-md" data-aos="fade-up" data-aos-delay="300">
          Arah Tepat, Jalur Pasti, Impian Tercapai.
        </p>
      </div>

      <RouterLink to="/jalurku"
        class="mt-8 bg-red-600 text-white flex items-center justify-center gap-2 px-8 py-4 rounded-md shadow-lg hover:shadow-2xl hover:scale-110 hover:bg-red-700 active:bg-red-800 active:shadow-sm transition-all duration-300 text-lg font-semibold font-inter"
        data-aos="zoom-in" data-aos-delay="600">
        Kunjungi Jalurku →
      </RouterLink>
    </div>
  </section>

  <!-- FITUR SECTION -->
  <section class="max-w-7xl mx-auto px-5 py-16 text-gray-800 font-inter">
    <!-- Section Header -->
    <div class="text-center mb-12" data-aos="fade-up">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-inter">
        Fitur <span class="text-red-500">Jalurku</span>
      </h2>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto font-inter">
        Tiga cara mudah untuk menemukan jurusan 
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-offset="200" data-aos-duration="1000">
      <!-- Card 1 -->
      <div
        class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group font-inter"
        data-aos="zoom-in-up">
        <div class="relative overflow-hidden">
          <img
            :src="cardRencana"
            alt="Ketahui Jurusanmu" 
            class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold font-inter">
            Rencana
          </div>
        </div>
        <div class="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h3 class="text-2xl font-bold text-red-500 mb-3 font-inter">Ketahui Jurusanmu</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4 font-inter">
              Mengenalkan berbagai jurusan yang tersedia di SMK Telkom Purwokerto serta kisah sukses alumni yang bisa menginspirasimu.
            </p>
          </div>
          <RouterLink to="/Rencanaku"
            class="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 group-hover:gap-3 font-inter">
            Ketahui RencanaKu 
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </RouterLink>
        </div>
      </div>

      <!-- Card 2 -->
      <div
        class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group font-inter"
        data-aos="zoom-in-up" data-aos-delay="150">
        <div class="relative overflow-hidden">
          <img
          :src="cardEksplorasi"
            alt="Permainan Interaktif" 
            class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold font-inter">
            Eksplorasi
          </div>
        </div>
        <div class="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h3 class="text-2xl font-bold text-red-500 mb-3 font-inter">Eksplorasi Interaktif</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4 font-inter">
              Simulasi interaktif untuk eksplorasi jurusan dengan cara yang menyenangkan dan engaging melalui playground digital.
            </p>
          </div>
          <RouterLink to="/playground"
            class="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 group-hover:gap-3 font-inter">
            Coba Eksploraku 
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </RouterLink>
        </div>
      </div>

      <!-- Card 3 -->
      <div
        class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group font-inter"
        data-aos="zoom-in-up" data-aos-delay="300">
        <div class="relative overflow-hidden">
          <img
            :src="cardKuis"
            alt="Kerjakan Kuis Angket" 
            class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold font-inter">
            Kuis
          </div>
        </div>
        <div class="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h3 class="text-2xl font-bold text-red-500 mb-3 font-inter">Kerjakan Kuis Angket</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4 font-inter">
              Bantu siswa menemukan jurusan yang cocok dengan minat, bakat, dan tujuan karier mereka melalui kuis personal.
            </p>
          </div>
          <RouterLink to="/jalurku"
            class="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 group-hover:gap-3 font-inter">
            Mulai Kuis JalurKu 
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Logo Slider -->
    <div class="mt-16 font-inter">
      <h1 class="text-5xl font-bold text-center text-gray-900 font-inter">
        Partnership
      </h1>
      <LogoSlider />
    </div>
  </section>

  <!-- SECTION TENTANG -->
  <section class="relative py-24 px-6 md:px-12 overflow-hidden bg-gradient-to-br from-gray-50 to-white font-inter">
    <div class="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
      <!-- Kolom Teks -->
      <div class="w-full md:w-1/2 text-center md:text-left" data-aos="fade-right">
        <div class="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-md text-sm font-semibold mb-4 font-inter">
          Tentang Team
        </div>
        <h2 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 tracking-tight font-inter">
          Kenapa Memilih <span class="text-red-600">Jalurku</span>?
        </h2>
        <p class="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 font-inter">
          <span class="font-semibold text-red-500">Jalurku</span> adalah platform inovatif yang membantu siswa menemukan arah masa depan mereka melalui eksplorasi jurusan, kuis interaktif, dan kisah inspiratif dari alumni SMK Telkom Purwokerto.
        </p>
        <p class="text-gray-600 text-base md:text-lg leading-relaxed mb-10 font-inter">
          Kami percaya setiap siswa memiliki jalur unik menuju kesuksesan. Dengan bimbingan yang tepat, masa depan cerah bukan lagi sekadar impian — melainkan tujuan nyata yang bisa dicapai.
        </p>

        <RouterLink to="/tentang"
          class="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-3 rounded-lg shadow-lg shadow-red-300 hover:bg-red-700 hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-lg font-inter">
          Pelajari Lebih Lanjut
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </RouterLink>
      </div>

      <!-- Kolom Gambar -->
      <div class="w-full md:w-1/2 flex justify-center" data-aos="fade-left" data-aos-delay="200">
        <div
          class="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-red-200 hover:scale-105 transition-transform duration-500">
          <img
            src="@/assets/images/ayamkampung.png"
            alt="Tentang Kami - SMK Telkom Purwokerto"
            class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <p class="text-white text-lg font-semibold drop-shadow-lg font-inter">
              Bersama menapaki jalur masa depan yang gemilang
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import LogoSlider from '@/components/LogoSlider.vue'
import cardEksplorasi from '@/assets/images/Eksplorasi.webp'
import cardKuis from '@/assets/images/Kuis.webp'
import cardRencana from '@/assets/images/Rencana.webp'

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  })
})
</script>

<style scoped>
#heading span {
  font-weight: 600;
}
</style>
