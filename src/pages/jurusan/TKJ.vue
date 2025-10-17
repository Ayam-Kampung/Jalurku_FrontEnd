<template>
  <section>
    <!-- Pengenalan -->
    <div class="flex flex-col items-center space-y-4">
      <!-- Gambar -->
      <div id="fadeIn" class="w-full mt-20 relative group overflow-hidden shadow-lg">
        <div class="w-full h-60 md:h-[300px] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          :style="{ backgroundImage: `url(${tkjImage})` }"></div>
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
      </div>

      <!-- Teks -->
      <div class="text-left lg:max-w-7xl lg:mx-auto py-6 gap-2 space-y-4 w-full">
        <!-- Judul -->
        <div class="mx-5 space-y-2">
          <h2 id="heading" class="text-4xl inter">
            Teknik Komputer Jaringan
          </h2>
          <span id="zoom"
            class="bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded-md my-2 inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v22m6-10a6 6 0 01-12 0" />
            </svg>
            TKJ
          </span>
        </div>
        <!-- Paragraf -->
        <div id="fadeIn" class="text-sm md:text-base inter space-y-5 lg:space-y-6 mx-5">
          <p>
            Teknik Komputer dan Jaringan (TKJ) adalah jurusan yang berfokus pada
            <span class="text-red-600 font-bold">perakitan, instalasi, dan pengelolaan jaringan komputer</span>
            serta sistem perangkat keras dan lunak agar dapat bekerja secara optimal.
            Jurusan ini mengajarkan bagaimana komputer dapat saling terhubung dan berkomunikasi dengan baik
            melalui jaringan lokal maupun internet.
          </p>
          <p>
            Selama belajar di TKJ, siswa akan mempelajari cara
            <span class="text-red-600 font-bold">merakit komputer, menginstal sistem operasi, dan mengonfigurasi
              jaringan</span>
            menggunakan berbagai perangkat seperti router, switch, dan access point.
            Selain itu, mereka juga mempelajari keamanan jaringan, troubleshooting, serta layanan server seperti
            web server dan mail server.
            Semua ini bertujuan agar siswa mampu membangun dan memelihara sistem komputer yang handal.
          </p>
          <p>
            Melalui jurusan TKJ, siswa dilatih untuk berpikir logis, teliti, dan terampil dalam menangani
            masalah teknis.
            Lulusan TKJ memiliki peluang besar di dunia kerja, baik sebagai teknisi komputer, administrator
            jaringan,
            maupun profesional IT yang mampu menciptakan solusi teknologi di berbagai bidang.
          </p>
        </div>
      </div>
    </div>

    <!-- Bagian Pekerjaan -->
    <div class="bg-red-600 py-10 mt-10">
      <div class="max-w-7xl mx-auto px-5">
        <h2 class="text-white text-3xl font-bold inter mb-8">PEKERJAAN</h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 inter text-red-600">
          <div v-for="job in jobs" :key="job"
            class="bg-white p-3 text-center rounded-md shadow flex items-center justify-center hover:scale-105 transition-transform">
            {{ job }}
          </div>
        </div>
      </div>
    </div>
    <AlumniSlider :alumnis="alumnis" />
  </section>
</template>

<script setup>
import tkjImage from '@/assets/images/tkj_images.jpg'
import alumni1 from '@/assets/images/alumni_1.png'
import alumni2 from '@/assets/images/alumni_2.png'
import ugm from '@/assets/images/ugm_logo.png'
import undip from '@/assets/images/undip_logo.png'
import google from '@/assets/images/google_logo.png'
import meta from '@/assets/images/meta_logo.png'
import ayamkampung from '@/assets/images/favicon.webp'
import AlumniSlider from '@/components/AlumniSlider.vue'

const jobs = [
  'Teknisi Komputer',
  'Network Administrator',
  'IT Support',
  'System Administrator',
  'Network Engineer',
  'Server Technician',
  'Cyber Security Specialist',
  'Technical Support Engineer',
  'Cloud Infrastructure Technician',
  'IT Consultant',
]

// Data alumni carousel
const alumnis = [
  {
    // berupa sample alumni
    name: 'Mauuren Greneman',
    year: '2022',
    title: 'Cyber Security Specialist',
    quote1:
      '“TKJ membuat saya memahami pentingnya keamanan jaringan. Saya belajar menganalisis celah keamanan dan memahami cara hacker bekerja agar bisa mencegah serangan sejak dini.”',
    quote2:
      '“Sekarang saya berkarier di bidang Cyber Security. Ilmu jaringan dan sistem operasi dari TKJ menjadi pondasi kuat untuk melindungi data perusahaan dari ancaman siber yang terus berkembang.”',
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
    title: 'System Administrator',
    quote1:
      '“Belajar di TKJ mengajarkan saya bagaimana sistem komputer dan jaringan bekerja dari nol, mulai dari merakit PC, mengonfigurasi router, hingga memahami keamanan jaringan.”',
    quote2:
      '“Kini saya bekerja sebagai System Administrator. Pengalaman praktik dan troubleshooting selama di TKJ sangat membantu saya menjaga stabilitas server dan jaringan perusahaan agar tetap aman dan berjalan lancar”',
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
