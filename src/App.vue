<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar hanya muncul jika bukan halaman tertentu -->
    <Navbar v-if="!hideLayout" />

    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- Footer hanya muncul jika bukan halaman tertentu -->
    <Footer v-if="!hideLayout" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/partials/Navbar.vue'
import Footer from '@/components/partials/Footer.vue'

const route = useRoute()

// Daftar halaman yang TIDAK menampilkan layout utama
const noLayoutRoutes = ['404', 'login', 'register']

// Jika route.name ada di daftar di atas → sembunyikan Navbar & Footer
const hideLayout = computed(() => noLayoutRoutes.includes(route.name))
</script>
