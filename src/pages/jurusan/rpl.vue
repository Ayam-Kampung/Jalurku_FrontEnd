<template>
  <section>
    <!-- Pengenalan -->
    <div class="flex flex-col items-center space-y-4">
      <!-- Gambar -->
      <div id="fadeIn" class="w-full relative">
        <div
          class="w-full h-60 md:h-[300px] bg-cover bg-center transition-all duration-500"
          :style="{ backgroundImage: `url(${rplImage})` }"></div>
      </div>

      <!-- Teks -->
      <div class="text-left lg:max-w-7xl lg:mx-auto py-6 gap-2 space-y-4 w-full">
        <!-- Judul -->
        <div class="mx-5 space-y-2">
          <h2 id="heading" class="text-4xl inter">
            Rekayasa Perangkat Lunak
          </h2>
          <span
            id="zoom"
            class="bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded-md my-2 inline-flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 1v22m6-10a6 6 0 01-12 0"
              />
            </svg>
            RPL
          </span>
        </div>

        <!-- Paragraf -->
        <div
          id="fadeIn"
          class="text-sm md:text-base inter space-y-5 lg:space-y-6 mx-5"
        >
          <p>
            Rekayasa Perangkat Lunak (RPL) adalah jurusan yang berfokus pada
            pembuatan dan pengembangan
            <span class="text-red-500 font-bold"
              >perangkat lunak atau <em>software</em>.</span
            >
            Perangkat lunak sendiri merupakan kumpulan instruksi atau program
            yang digunakan untuk komputer dan menjalankan berbagai aplikasi,
            seperti game, sistem informasi, atau aplikasi mobile.
          </p>

          <p>
            Selama belajar di RPL, siswa akan mempelajari cara menulis kode
            pemrograman menggunakan berbagai bahasa seperti Python, Java, atau
            Kotlin. Mereka juga akan
            <span class="text-red-500 font-bold">membuat aplikasi</span> berbasis
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
    <div class="bg-red-500 py-10">
      <div class="max-w-7xl mx-auto px-5">
        <h2 class="text-white text-3xl font-bold inter mb-8">PEKERJAAN</h2>

        <div
          class="grid grid-cols-2 md:grid-cols-5 gap-4 inter text-red-500"
        >
          <div
            v-for="job in jobs"
            :key="job"
            class="bg-white p-3 text-center rounded-md shadow flex items-center justify-center hover:scale-105 transition-transform"
          >
            {{ job }}
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-14">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime ipsam
        ducimus necessitatibus quibusdam, quo officiis minima doloremque
        reprehenderit voluptates optio saepe non aspernatur, quae tenetur.
        Accusamus provident iste praesentium assumenda!
      </p>
    </div>
  </section>
</template>

<script setup>
import rplImage from '@/assets/images/rpl_images.jpg'

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
  'AI Developer',
]
</script>
