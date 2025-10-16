<template>
  <section class="mb-5 md:mb-0 md:mt-20">
    <!-- TKJ -->
    <div class="flex flex-col-reverse md:flex-row items-center justify-between">
      <!-- Teks -->
      <div class="w-full space-y-4 mx-5 p-5 md:p-0">
        <h2 class="text-4xl font-extrabold text-gray-900">
          Teknik Komputer Jaringan
          <span
            class="bg-merah text-white text-sm font-semibold px-2 py-1 rounded-md ml-2 inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v22m6-10a6 6 0 01-12 0" />
            </svg>
            TKJ
          </span>
        </h2>
        <p class="text-gray-900">
          TKJ adalah jurusan yang mendalami cara-cara merakit komputer dan instalasi jaringan komputer.
        </p>
        <RouterLink to="/jurusan/tkj"
          class="bg-merah hover:bg-red-700 rounded-md text-white flex items-center justify-center gap-2 p-4 shadow-md hover:shadow-xl  active:bg-gray-100 active:shadow-sm transition w-60">
          Lihat Jurusan TKJ
        </RouterLink>
      </div>

      <!-- Gambar -->
      <div class="w-full relative mt-10 md:my-0">
        <div class="w-full h-60 md:h-[300px] bg-cover bg-center transition-all duration-500 clip-diagonal-1"
          :style="{ backgroundImage: `url(${tkjImg})` }"></div>
      </div>
    </div>

    <!-- TJA -->
    <div class="flex flex-col-reverse md:flex-row items-center justify-between">
      <div class="w-full space-y-4 mx-5 p-5 md:p-0">
        <h2 class="text-4xl font-extrabold text-gray-900">
          Cek Lebih Lanjut
          <span
            class="bg-yellow-400 text-white text-sm font-semibold px-2 py-1 rounded-md ml-2 inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v22m6-10a6 6 0 01-12 0" />
            </svg>
            TJA
          </span>
        </h2>
        <p class="text-gray-900">
          TJA adalah jurusan yang berkompetensi di bidang jaringan, baik itu jaringan akses kabel
          (tembaga, coaxial dan fiber optic), maupun nirkabel.
        </p>
        <RouterLink to="/jurusan/tja"
          class="bg-merah hover:bg-red-700 rounded-md text-white flex items-center justify-center gap-2 p-4 shadow-md hover:shadow-xl  active:bg-gray-100 active:shadow-sm transition w-60">
          Cek Lebih Lanjut
        </RouterLink>
      </div>
      <div class="w-full relative mt-10 md:my-0">
        <div class="w-full h-60 md:h-[300px] bg-cover bg-center transition-all duration-500 clip-diagonal-2"
          :style="{ backgroundImage: `url(${tjaImg})` }"></div>
      </div>
    </div>

    <!-- RPL -->
    <div class="flex flex-col-reverse md:flex-row items-center justify-between">
      <div class="w-full space-y-4 mx-5 p-5 md:p-0">
        <h2 class="text-4xl font-extrabold text-gray-900">
          Rekayasa Perangkat Lunak
          <span
            class="bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded-md ml-2 inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v22m6-10a6 6 0 01-12 0" />
            </svg>
            RPL
          </span>
        </h2>
        <p class="text-gray-900">
          RPL adalah jurusan yang mendalami cara-cara pengembangan perangkat lunak (software).
        </p>
        <RouterLink to="/jurusan/rpl"
          class="bg-merah hover:bg-red-700 rounded-md text-white flex items-center justify-center gap-2 p-4 shadow-md hover:shadow-xl  active:bg-gray-100 active:shadow-sm transition w-60">
          Cek Lebih Lanjut
        </RouterLink>

      </div>
      <div class="w-full relative mt-10 md:my-0">
        <div class="w-full h-60 md:h-[300px] bg-cover bg-center transition-all duration-500 clip-diagonal-1"
          :style="{ backgroundImage: `url(${rplImg}` }"></div>
      </div>
    </div>

    <!-- PG -->
    <div class="flex flex-col-reverse md:flex-row items-center justify-between">
      <div class="w-full space-y-4 mx-5 p-5 md:p-0">
        <h2 class="text-4xl font-extrabold text-gray-900">
          Pengembangan Gim
          <span
            class="bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded-md ml-2 inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v22m6-10a6 6 0 01-12 0" />
            </svg>
            PG
          </span>
        </h2>
        <p class="text-gray-900">
          PG adalah jurusan yang berfokus pada pembuatan dan pengembangan permainan digital berbasis komputer dan
          perangkat mobile.
        </p>
        <RouterLink to="/jurusan/pg"
          class="bg-merah hover:bg-red-700 rounded-md text-white flex items-center justify-center gap-2 p-4 shadow-md hover:shadow-xl  active:bg-gray-100 active:shadow-sm transition w-60">
          Cek Lebih Lanjut
        </RouterLink>
      </div>
      <div class="w-full relative mt-10 md:my-0">
        <div class="w-full h-60 md:h-[300px] bg-cover bg-center transition-all duration-500 clip-diagonal-2"
          :style="{ backgroundImage: `url(${pgImg})` }"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import tkjImg from '@/assets/images/tkj_images.jpg'
import tjaImg from '@/assets/images/tja_images.jpg'
import rplImg from '@/assets/images/rpl_images.jpg'
import pgImg from '@/assets/images/pg_images.jpg'
</script>


<style scoped>
@media (min-width: 768px) {
  .clip-diagonal-1 {
    clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
  }

  .clip-diagonal-2 {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 20% 100%);
  }
}
</style>

<style scoped>
.bg-merah {
  @apply bg-red-600;
}
</style>
