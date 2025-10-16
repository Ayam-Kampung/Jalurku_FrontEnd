<template>
  <aside
    class="w-64 bg-red-600 text-white flex flex-col fixed h-full transition-all duration-300 z-50"
  >
    <div class="flex items-center justify-center py-6 border-b border-red-400">
      <!-- Logo -->
      <!-- <img src="@/assets/images/Logo-SMK.png" alt="Logo SMK" class="h-10 mr-2" /> -->
      <h1 class="text-lg font-bold">Admin Panel</h1>
    </div>

    <nav class="flex-grow mt-6 space-y-1 px-4">
      <RouterLink
        to="/admin"
        class="block py-3 px-4 rounded-md hover:bg-red-700 transition-all"
        :class="{ 'bg-red-700': isActive('/admin') }"
      >
        Dashboard
      </RouterLink>

      <RouterLink
        to="/admin/kelolasoal"
        class="block py-3 px-4 rounded-md hover:bg-red-700 transition-all"
        :class="{ 'bg-red-700': isActive('/admin/kelolasoal') }"
      >
        Kelola Soal
      </RouterLink>

      <!-- Contoh tambahan menu -->
      <!-- <RouterLink
        to="/admin/pengguna"
        class="block py-3 px-4 rounded-md hover:bg-red-700 transition-all"
      >
        Pengguna
      </RouterLink> -->

      <RouterLink
        to="/"
        class="block py-3 px-4 rounded-md hover:bg-red-700 transition-all"
      >
        Kembali ke Situs
      </RouterLink>
    </nav>

    <div class="p-4 border-t border-red-400 text-center text-sm text-white/80">
      © {{ new Date().getFullYear() }} AyamKampung Admin
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// Fungsi untuk menandai link aktif
const isActive = (path) => {
  return route.path === path
}
</script>
