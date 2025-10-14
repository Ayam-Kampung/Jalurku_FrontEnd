<template>
  <section>
    <!-- Pengenalan -->
    <div class="flex flex-col items-center space-y-4">
      <!-- Gambar -->
      <div id="fadeIn" class="w-full relative ">
        <div id="fadeIn" class="w-full relative ">
          <div class="w-full h-60 md:h-[300px] bg-cover bg-center transition-all duration-500"
            :style="{ backgroundImage: `url(${tjaImage})` }"></div>
        </div>
      </div>
      <!-- Teks -->
      <div class="text-left lg:max-w-7xl lg:mx-auto py-6 gap-2 space-y-4 w-full">
        <!-- Judul -->
        <div class="mx-5 space-y-2">
          <h2 id="heading" class="text-4xl inter">
            Teknik Jaringan Akses
          </h2>
          <span id="zoom"
            class="bg-yellow-400 text-white text-sm font-semibold px-2 py-1 rounded-md my-2 inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v22m6-10a6 6 0 01-12 0" />
            </svg>
            TJA
          </span>
        </div>
        <!-- Paragraf -->
        <div id="fadeIn" class="text-sm md:text-base inter space-y-5 lg:space-y-6 mx-5">
          <p>
            Teknik Jaringan dan Akomodasi (TJA) adalah jurusan yang berfokus pada
            <span class="text-red-600 font-bold">pembangunan, pengelolaan, dan pemeliharaan jaringan
              komputer</span>
            serta sistem komunikasi data agar perangkat dapat saling terhubung dengan baik.
            Jurusan ini mengajarkan cara membuat infrastruktur jaringan seperti LAN, WAN, dan internet yang
            stabil dan aman.
          </p>
          <p>
            Selama belajar di TJA, siswa akan mempelajari cara
            <span class="text-red-600 font-bold">merancang topologi jaringan</span>,
            mengkonfigurasi perangkat seperti router dan switch, serta memahami dasar-dasar keamanan jaringan.
            Selain itu, mereka juga mempelajari instalasi server, sistem operasi jaringan, dan teknologi
            nirkabel seperti Wi-Fi.
            Semua materi tersebut membantu siswa memahami bagaimana data bisa dikirim dengan cepat dan aman.
          </p>
          <p>
            Melalui jurusan ini, siswa dilatih untuk berpikir analitis, teliti, dan tangguh dalam menghadapi
            permasalahan teknis.
            Lulusan TJA dibekali keterampilan yang dibutuhkan di dunia kerja, seperti kemampuan mengelola
            jaringan perusahaan,
            menjadi teknisi jaringan profesional, atau bahkan membangun layanan jaringan sendiri di bidang
            teknologi informasi.
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

    <!-- Bagian Alumni (Carousel) -->
    <div class="bg-white py-16 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-5 relative">
        <h2 class="text-3xl font-bold text-center mb-10 inter text-gray-800">
          ALUMNI TJA
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
              <div class="w-full lg:w-1/2 text-gray-800 lg:pr-16">
                <h3 class="text-2xl font-bold mb-3 inter text-red-600">{{ alumni.title }}</h3>
                <p class="text-sm md:text-base leading-relaxed mb-4">
                  {{ alumni.quote1 }}
                </p>
                <p class="text-sm md:text-base leading-relaxed mb-6">
                  {{ alumni.quote2 }}
                </p>
                <span class="font-semibold text-gray-600 block mb-6">
                  — {{ alumni.name }}, Alumni TJA {{ alumni.year }}
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
            class="absolute left-0 top-1/3 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
            < </button>
              <button @click="nextSlide"
                class="absolute right-0 top-1/3 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                >
              </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import tjaImage from '@/assets/images/tja_images.jpg'
import alumni1 from '@/assets/images/alumni_1.png'
import alumni2 from '@/assets/images/alumni_2.png'
import ugm from '@/assets/images/ugm_logo.png'
import undip from '@/assets/images/undip_logo.png'
import google from '@/assets/images/google_logo.png'
import meta from '@/assets/images/meta_logo.png'
import ayamkampung from '@/assets/images/favicon.png'

const jobs = [
  'Network Administrator',
  'Network Engineer',
  'System Administrator',
  'IT Support',
  'Network Technician',
  'Cyber Security Specialist',
  'Server Administrator',
  'Cloud Engineer',
  'IoT Network Specialist',
  'Infrastructure Engineer',
]
// Data alumni carousel
const alumnis = [
  {
    // berupa sample alumni
    name: 'Mauuren Greneman',
    year: '2022',
    title: 'Network Administrator',
    quote1:
      '“Belajar di jurusan Teknik Jaringan Akses membuat saya memahami bagaimana data bisa terkirim dengan cepat dan stabil, baik melalui kabel fiber optic maupun jaringan nirkabel.”',
    quote2:
      '“Sekarang saya bekerja sebagai Network Administrator. Ilmu tentang instalasi, konfigurasi, dan pemeliharaan jaringan yang saya pelajari di TJA menjadi pondasi utama dalam pekerjaan saya setiap hari.”',
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
    title: 'IoT Engineer',
    quote1:
      '“TJA membuka wawasan saya tentang bagaimana perangkat bisa saling terhubung dan berkomunikasi secara otomatis. Dari dasar jaringan, saya mulai tertarik dengan teknologi Internet of Things (IoT).”',
    quote2:
      '“Sekarang saya berkarier sebagai IoT Engineer, mengembangkan sistem rumah pintar dan perangkat sensor industri. Semua berawal dari pengetahuan jaringan dan sistem komunikasi yang saya pelajari di TJA.”',
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
