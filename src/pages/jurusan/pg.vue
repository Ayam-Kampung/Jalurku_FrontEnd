<template>
  <section>
    <!-- Pengenalan -->
    <div class="flex flex-col items-center space-y-4">
      <!-- Gambar -->
      <div id="fadeIn" class="w-full relative ">
        <div class="w-full h-60 md:h-[300px] bg-cover bg-center transition-all duration-500"
          :style="{ backgroundImage: `url(${pgImage})` }"></div>
      </div>
      <!-- Teks -->
      <div class="text-left lg:max-w-7xl lg:mx-auto py-6 gap-2 space-y-4 w-full">
        <!-- Judul -->
        <div class="mx-5 space-y-2">
          <h2 id="heading" class="text-4xl inter">
            Pengembangan Gim
          </h2>
          <span id="zoom"
            class="bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded-md my-2 inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v22m6-10a6 6 0 01-12 0" />
            </svg>
            PG
          </span>
        </div>
        <!-- Paragraf -->
        <div id="fadeIn" class="text-sm md:text-base inter space-y-5 lg:space-y-6 mx-5">
          <p>
            Pengembangan Gim adalah jurusan yang berfokus pada
            <span class="text-merah font-bold">pembuatan, perancangan, dan pengembangan permainan digital</span>
            baik untuk platform komputer, mobile, maupun konsol. Jurusan ini menggabungkan unsur seni, logika,
            dan teknologi
            untuk menciptakan pengalaman bermain yang menarik dan interaktif.
          </p>
          <p>
            Selama belajar di jurusan ini, siswa akan mempelajari berbagai aspek dalam pembuatan gim seperti
            <span class="text-merah font-bold">pemrograman, desain karakter, animasi, dan mekanik
              permainan</span>.
            Mereka juga belajar menggunakan game engine seperti Unity dan Unreal Engine untuk mengembangkan
            proyek gim secara nyata.
            Selain itu, siswa diajarkan konsep <em>storytelling</em> dan desain level agar gim memiliki alur
            yang seru dan menantang.
          </p>
          <p>
            Jurusan Pengembangan Gim melatih siswa untuk berpikir kreatif, kolaboratif, dan solutif dalam
            menyelesaikan masalah teknis maupun artistik.
            Lulusan jurusan ini memiliki peluang besar di industri kreatif dan teknologi, baik sebagai
            pengembang gim independen,
            desainer, maupun profesional di perusahaan hiburan digital.
          </p>
        </div>
      </div>
    </div>

    <!-- Bagian Pekerjaan -->
    <div class="bg-red-500 py-10">
      <div class="max-w-7xl mx-auto px-5">
        <h2 class="text-white text-3xl font-bold inter mb-8">PEKERJAAN</h2>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 inter text-red-500">
          <div v-for="job in jobs" :key="job"
            class="bg-white p-3 text-center rounded-md shadow flex items-center justify-center hover:scale-105 transition-transform">
            {{ job }}
          </div>
        </div>
      </div>
    </div>

    <!-- Bagian Alumni (Carousel) -->
    <div class="bg-white py-16 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-5 relative">
        <h2 class="text-3xl font-bold text-center mb-10 inter text-gray-800">
          ALUMNI PG
        </h2>

        <!-- Wrapper Carousel -->
        <div class="overflow-hidden relative">
          <div class="flex transition-transform duration-700 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <!-- Card Alumni -->
            <div v-for="(alumni, index) in alumnis" :key="index"
              class="flex-shrink-0 w-full flex flex-col lg:flex-row items-center gap-10">
              <!-- Foto -->
              <div class="relative w-full lg:w-1/2 flex justify-center">
                <img :src="alumni.image" :alt="alumni.name"
                  class="relative z-10 w-64 h-64 object-cover rounded-xl shadow-lg" />
              </div>

              <!-- Info -->
              <div class="w-full lg:w-1/2 text-gray-800">
                <h3 class="text-2xl font-bold mb-3 inter">{{ alumni.title }}</h3>
                <p class="text-sm md:text-base leading-relaxed mb-4">
                  {{ alumni.quote1 }}
                </p>
                <p class="text-sm md:text-base leading-relaxed mb-6">
                  {{ alumni.quote2 }}
                </p>
                <span class="font-semibold text-gray-600 block mb-6">
                  — {{ alumni.name }}, Alumni PG {{ alumni.year }}
                </span>

                <!-- Logo Universitas -->
                <div class="flex items-center gap-6 mt-4">
                  <img v-for="(logo, i) in alumni.universities" :key="i" :src="logo.src" :alt="logo.alt"
                    class="w-50 h-16 object-contain" :title="logo.title" />
                </div>
              </div>
            </div>
          </div>

          <!-- Tombol Navigasi -->
          <button @click="prevSlide"
            class="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
            < </button>
              <button @click="nextSlide"
                class="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                >
              </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import pgImage from '@/assets/images/pg_images.jpg'
import alumni1 from '@/assets/images/alumni_1.png'
import alumni2 from '@/assets/images/alumni_2.png'
import ugm from '@/assets/images/ugm_logo.png'
import undip from '@/assets/images/undip_logo.png'
import google from '@/assets/images/google_logo.png'
import meta from '@/assets/images/meta_logo.png'
import ayamkampung from '@/assets/images/favicon.png'

const jobs = [
  'Game Developer',
  'Game Designer',
  'Level Designer',
  'Game Programmer',
  '2D / 3D Artist',
  'Animator',
  'UI / UX Designer',
  'Game Tester / QA',
  'Sound Designer',
  'Game Producer',
]

// Data alumni carousel
const alumnis = [
  {
    // berupa sample alumni
    name: 'Mauuren Greneman',
    year: '2022',
    title: 'Game Developer',
    quote1:
      '“Belajar di jurusan Pengembangan Gim membuat saya memahami seluruh proses pembuatan game — mulai dari ide, desain karakter, hingga penulisan kode yang menghidupkan dunia virtual.”',
    quote2:
      '“Sekarang saya bekerja sebagai Game Developer dan sudah merilis beberapa gim indie di platform digital. Semua berawal dari pengalaman seru belajar membuat proyek gim sederhana di sekolah.”',
    image: alumni1,
    universities: [
      { src: ugm, alt: 'UGM', title: 'Universitas Gadjah Mada' },
      { src: google, alt: 'GOOGLE', title: 'google' },
      { src: ayamkampung, alt: 'AYAMKAMPUNG', title: 'AYAMKAMPUNG' }
    ]
  },
  {
    name: 'Rangga Zeevier',
    year: '2023',
    title: '2D/3D Animator',
    quote1:
      '“Jurusan PG bukan hanya tentang membuat game, tapi juga tentang seni bercerita melalui animasi. Saya belajar bagaimana gerakan, ekspresi, dan visual bisa menyampaikan emosi kepada pemain.”',
    quote2:
      '“Kini saya berkarier sebagai Animator. Dasar desain karakter dan animasi yang saya pelajari di PG membantu saya menciptakan karya yang hidup, imajinatif, dan penuh warna.”',
    image: alumni2,
    universities: [
      { src: undip, alt: 'UNDIP', title: 'Universitas Diponegoro' },
      { src: meta, alt: 'META', title: 'Meta' },
      { src: ayamkampung, alt: 'AYAMKAMPUNG', title: 'AYAMKAMPUNG' }

    ]
  }
]

// Logika carousel
import { ref } from 'vue'
const currentIndex = ref(0)

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % alumnis.length
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + alumnis.length) % alumnis.length
}
</script>
