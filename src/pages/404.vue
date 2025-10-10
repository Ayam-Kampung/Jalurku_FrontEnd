<template>
  <div class="h-screen mx-5 mb-10 flex flex-col justify-center gap-4 md:mx-auto max-w-3xl text-center">
    <div class="grid gap-5 justify-center">
      <img class="h-32 mx-auto" :src="NotFoundImage" alt="404 Not Found" />
      <h1 class="font-sans text-4xl md:text-5xl font-bold text-gray-800">Hmmm, mau nyari apa ya?</h1>
    </div>

    <div class="grid gap-10 mt-5">
      <p class="text-gray-600">
        Halaman yang kamu ingin tujui tidak ditemukan. Kamu mungkin ingin pergi ke tautan berikut:
      </p>

      <div class="grid md:grid-cols-3 gap-5">
        <!-- Link ke Beranda -->
        <RouterLink
          to="/"
          class="bg-merah text-white flex items-center justify-center gap-2 p-5 shadow-md hover:shadow-xl active:bg-gray-100 active:shadow-sm transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
          Pergi ke Beranda
        </RouterLink>

        <!-- Link ke Rencanaku -->
        <RouterLink
          to="/rencanaku"
          class="flex items-center justify-center gap-2 p-5 shadow-md hover:shadow-xl transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666">
            <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
          </svg>
          Pergi ke RencanaKu
        </RouterLink>

        <!-- Link ke Tentang -->
        <RouterLink
          to="/tentang"
          class="flex items-center justify-center gap-2 p-5 shadow-md hover:shadow-xl transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666">
            <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
          </svg>
          Tentang Kami
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import NotFoundImage from '@/assets/images/404.png'
</script>

<style scoped>
.bg-merah {
  @apply bg-red-600;
}
</style>
