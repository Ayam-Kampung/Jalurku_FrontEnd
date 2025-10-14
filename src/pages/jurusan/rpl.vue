<template>
  <section>
    <!-- Pengenalan -->
    <div class="flex flex-col items-center space-y-4">
      <!-- Gambar -->
      <div id="fadeIn" class="w-full relative">
        <div class="w-full h-60 md:h-[300px] bg-cover bg-center transition-all duration-500"
          :style="{ backgroundImage: `url(${rplImage})` }"></div>
      </div>
      <!-- Teks -->
      <div class="text-left lg:max-w-7xl lg:mx-auto py-6 gap-2 space-y-4 w-full">
        <!-- Judul -->
        <div class="mx-5 space-y-2">
          <h2 id="heading" class="text-4xl inter">Rekayasa Perangkat Lunak</h2>
          <span id="zoom"
            class="bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded-md my-2 inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v22m6-10a6 6 0 01-12 0" />
            </svg>
            RPL
          </span>
        </div>
        <!-- Paragraf -->
        <div id="fadeIn" class="text-sm md:text-base inter space-y-5 lg:space-y-6 mx-5">
          <p>
            Rekayasa Perangkat Lunak (RPL) adalah jurusan yang berfokus pada
            pembuatan dan pengembangan
            <span class="text-red-600 font-bold">perangkat lunak atau
              <em>software</em>.</span>
            Perangkat lunak sendiri merupakan kumpulan instruksi atau program
            yang digunakan untuk komputer dan menjalankan berbagai aplikasi,
            seperti game, sistem informasi, atau aplikasi mobile.
          </p>

          <p>
            Selama belajar di RPL, siswa akan mempelajari cara menulis kode
            pemrograman menggunakan berbagai bahasa seperti Python, Java, atau
            Kotlin. Mereka juga akan
            <span class="text-red-060 font-bold">membuat aplikasi</span> berbasis
            web, desktop, dan mobile, serta mempelajari desain antarmuka
            pengguna agar aplikasi yang dibuat menarik dan mudah digunakan.
          </p>

          <p>
            Melalui jurusan ini, siswa dilatih untuk berpikir logis, kreatif,
            dan mampu bekerja dalam tim. Semua keterampilan tersebut dibutuhkan
            agar mereka dapat menjadi pengembang aplikasi, web developer, maupun
            profesional IT yang siap menghadapi dunia industri digital di masa
            depan.
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
          ALUMNI RPL
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
                <h3 class="text-2xl font-bold mb-3 inter text-red-600">{{ alumni.title }}</h3>
                <p class="text-sm md:text-base leading-relaxed mb-4">
                  {{ alumni.quote1 }}
                </p>
                <p class="text-sm md:text-base leading-relaxed mb-6">
                  {{ alumni.quote2 }}
                </p>
                <span class="font-semibold text-gray-600 block mb-6">
                  — {{ alumni.name }}, Alumni RPL {{ alumni.year }}
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
import rplImage from '@/assets/images/rpl_images.jpg'
import alumni1 from '@/assets/images/alumni_1.png'
import alumni2 from '@/assets/images/alumni_2.png'
import ugm from '@/assets/images/ugm_logo.png'
import undip from '@/assets/images/undip_logo.png'
import google from '@/assets/images/google_logo.png'
import meta from '@/assets/images/meta_logo.png'
import ayamkampung from '@/assets/images/favicon.png'

const jobs = [
  'Software Developer',
  'Web Developer',
  'Mobile App Developer',
  'UI / UX Designer',
  'Database Administrator',
  'Data Analyst',
  'Data Engineer',
  'DevOps Engineer',
  'Cyber Security',
  'AI Developer'
]

// Data alumni carousel
const alumnis = [
  {
    // berupa sample alumni
    name: 'Mauuren Greneman',
    year: '2022',
    title: 'Full Stack Web Developer',
    quote1:
      '“Selama belajar di jurusan Rekayasa Perangkat Lunak, saya banyak belajar hal penting, mulai dari logika pemrograman, desain UI/UX, sampai cara berpikir kreatif untuk menyelesaikan masalah.”',
    quote2:
      '“Sekarang saya bekerja sebagai Full Stack Developer di sebuah startup teknologi. Bekal dari masa sekolah benar-benar jadi dasar kuat buat saya dalam membangun sistem web yang modern dan efisien.”',
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
    title: 'UI/UX Designer',
    quote1:
      '“RPL bukan cuma soal coding, tapi juga tentang bagaimana membuat aplikasi yang nyaman digunakan. Saya belajar memahami user dan menggabungkannya dengan desain yang menarik.”',
    quote2:
      '“Sekarang saya bekerja sebagai UI/UX Designer. Ilmu dari RPL sangat membantu saya memahami sisi teknis sekaligus estetika dalam dunia digital.”',
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
