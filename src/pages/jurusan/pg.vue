<template>
  <section>
    <!-- Pengenalan -->
    <div class="flex flex-col items-center space-y-4">
        <!-- Gambar -->
        <div id="fadeIn" class="w-full relative ">
            <div class="w-full h-60 md:h-[300px] bg-cover bg-center transition-all duration-500" :style="{ backgroundImage: `url(${pgImage})` }"></div>
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
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 1v22m6-10a6 6 0 01-12 0" />
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
        <p class="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime ipsam ducimus necessitatibus
            quibusdam, quo officiis minima doloremque reprehenderit voluptates optio saepe non aspernatur, quae tenetur.
            Accusamus provident iste praesentium assumenda!</p>
    </div>
</section>
</template>

<script setup>
import pgImage from '@/assets/images/pg_images.jpg'

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
</script>
