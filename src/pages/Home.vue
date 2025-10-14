<template>
  <!-- HERO -->
  <section
    class="h-screen bg-[url('/images/bg-home.jpg')] bg-fixed bg-no-repeat bg-cover bg-center"
  >
    <div
      class="flex flex-col items-center justify-center text-center mx-auto max-w-5xl h-full text-gray-800"
      data-aos="fade-up"
    >
      <div class="flex flex-col gap-6">
        <h1
          id="heading"
          class="inter text-4xl md:text-7xl"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          Temukan <span class="text-red-500">Jalur</span> Yang <br />
          Pas Untukmu
        </h1>

        <p class="text-lg inter" data-aos="fade-up" data-aos-delay="300">
          Berdasarkan ahli untuk kamu.
        </p>
      </div>

      <RouterLink
        to="/jalurku"
        class="mt-10 py-3 px-8 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300 mx-auto w-fit"
        data-aos="zoom-in"
        data-aos-delay="600"
      >
        Kunjungi Jalurku →
      </RouterLink>
    </div>
  </section>

  <!-- FITUR SECTION -->
  <section class="max-w-7xl mx-auto px-5 py-16 text-gray-800">
    <div
      class="grid md:grid-cols-3 gap-8"
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-duration="1000"
    >
      <!-- Card 1 -->
      <div
        class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
        data-aos="zoom-in-up"
      >
        <img
          src=""
          alt="Ketahui Jurusanmu"
          class="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
        />
        <div class="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h3 class="text-2xl font-bold text-red-500 mb-2">Ketahui Jurusanmu</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">
              Mengenalkan berbagai jurusan yang tersedia di SMK Telkom Purwokerto serta kisah sukses alumni yang telah
              menempuh jurusan tersebut.
            </p>
          </div>
          <RouterLink
            to="/Rencanaku"
            class="mt-auto inline-block text-center w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-300"
          >
            Kunjungi →
          </RouterLink>
        </div>
      </div>

      <!-- Card 2 -->
      <div
        class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
        data-aos="zoom-in-up"
        data-aos-delay="150"
      >
        <img
          src=""
          alt="Permainan Interaktif"
          class="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
        />
        <div class="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h3 class="text-2xl font-bold text-red-500 mb-2">Permainan Interaktif</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">
              Simulasi interaktif untuk eksplorasi jurusan dengan cara yang menyenangkan dan mudah dipahami.
            </p>
          </div>
          <RouterLink
            to="/"
            class="mt-auto inline-block text-center w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-300"
          >
            Coba Sekarang →
          </RouterLink>
        </div>
      </div>

      <!-- Card 3 -->
      <div
        class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
        data-aos="zoom-in-up"
        data-aos-delay="300"
      >
        <img
          src=""
          alt="Kerjakan Kuis Angket"
          class="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
        />
        <div class="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h3 class="text-2xl font-bold text-red-500 mb-2">Kerjakan Kuis Angket</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">
              Angket studi kasus untuk membantu siswa menemukan jurusan yang paling cocok dengan minat, bakat, dan tujuan masa depan mereka.
            </p>
          </div>
          <RouterLink
            to="/jalurku"
            class="mt-auto inline-block text-center w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-300"
          >
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
