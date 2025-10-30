<template>
  <section class="pt-16 px-5 md:px-16 space-y-12 bg-gray-50 mb-16">
    <!-- INTRO -->
    <div
      class="flex flex-col md:flex-row-reverse items-center gap-10 mt-5"
      data-aos="fade-up"
    >
      <!-- Gambar utama -->
      <div
        class="w-full md:w-1/3 h-64 md:h-72 bg-contain bg-no-repeat bg-center hover:scale-105 transition-transform duration-500"
        :style="{ backgroundImage: `url(${ayamKampung})` }"
        data-aos="fade-left"
      ></div>

      <!-- Teks pengenalan -->
      <div
        class="md:w-2/3 text-center md:text-left space-y-4"
        data-aos="fade-right"
      >
        <h2
          class="text-3xl md:text-4xl font-extrabold text-red-600 tracking-tight"
        >
          Tim Ayam Kampung
        </h2>
        <p class="text-gray-700 leading-relaxed md:text-lg">
          Kami, <b>Tim Ayam Kampung</b>, punya misi sederhana — membantu
          teman-teman di luar sana yang masih bingung memilih jurusan dan arah
          masa depan.
        </p>
        <p class="text-gray-700 leading-relaxed md:text-lg">
          Lewat website ini, kami membuat proses mengenal jurusan terasa
          menyenangkan, penuh warna, dan tidak membingungkan lagi.
        </p>
      </div>
    </div>

    <!-- QUOTE -->
    <h2
      class="text-xl md:text-2xl font-semibold italic text-center text-gray-800 leading-snug"
      data-aos="zoom-in-up"
    >
      “Karena masa depan yang cerah dimulai dari langkah kecil yang tepat.”
    </h2>

    <!-- GRID 3 ORANG -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div
        v-for="(member, i) in firstRow"
        :key="i"
        class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
        data-aos="zoom-in"
        :data-aos-delay="(i + 1) * 100"
      >
        <div
          class="w-full h-56 sm:h-60 bg-contain bg-no-repeat bg-center mb-5 hover:scale-105 transition-transform duration-500"
          :style="{ backgroundImage: `url(${member.image})` }"
        ></div>
        <h3 class="font-bold text-xl text-red-600 mb-2">
          {{ member.role }}
        </h3>
        <p class="text-gray-700 leading-relaxed text-sm md:text-base">
          {{ member.desc }}
        </p>
      </div>
    </div>

    <!-- FLEX 2 ORANG (TENGAH) -->
    <div
      class="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-10"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div
        v-for="(member, i) in secondRow"
        :key="i"
        class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center w-full sm:w-[45%] md:w-[35%]"
        data-aos="zoom-in"
        :data-aos-delay="(i + 1) * 150"
      >
        <div
          class="w-full h-56 sm:h-60 bg-contain bg-no-repeat bg-center mb-5 hover:scale-105 transition-transform duration-500"
          :style="{ backgroundImage: `url(${member.image})` }"
        ></div>
        <h3 class="font-bold text-xl text-red-600 mb-2">
          {{ member.role }}
        </h3>
        <p class="text-gray-700 leading-relaxed text-sm md:text-base">
          {{ member.desc }}
        </p>
      </div>
    </div>
    
  </section
  >
  <!-- Logo Slider -->
    <!-- <div class="mt-16">
      <LogoSlider />
    </div> -->
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

import ayamKampung from '@/assets/images/ayamkampung.webp'
import orang1 from '@/assets/images/alumni_1.png'
import orang2 from '@/assets/images/copy.png'
import orang3 from '@/assets/images/admin.png'
import orang4 from '@/assets/images/alumni_2.png'
import orang5 from '@/assets/images/uiux.png'
// import LogoSlider from '@/components/LogoSlider.vue'


// Baris 1 → 3 anggota
const firstRow = [
  {
    image: orang1,
    role: 'DevOps',
    desc: 'Mengelola alur kerja pengembangan, deployment, dan server agar sistem tetap stabil.',
  },
  {
    image: orang2,
    role: 'Copywriting',
    desc: 'Menulis narasi, deskripsi jurusan, dan konten promosi yang menarik dan bermakna.',
  },
  {
    image: orang3,
    role: 'System Administrator',
    desc: 'Mengatur server dan jaringan agar website selalu aman, cepat, dan efisien.',
  },
]

// Baris 2 → 2 anggota
const secondRow = [
  {
    image: orang4,
    role: 'Digital Business',
    desc: 'Mengelola arah branding dan strategi digital agar proyek bernilai dan berkelanjutan.',
  },
  {
    image: orang5,
    role: 'UI / UX Designer',
    desc: 'Mendesain pengalaman pengguna yang menarik, sederhana, dan nyaman digunakan.',
  },
]

// Jalankan AOS
onMounted(() => {
  AOS.init({
    duration: 900,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
  })
})
</script>
