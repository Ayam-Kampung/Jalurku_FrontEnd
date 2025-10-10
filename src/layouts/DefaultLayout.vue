<template>
  <div>
    <Navbar />
    <main class="pt-20 min-h-screen">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/partials/Navbar.vue'
import Footer from '@/components/partials/Footer.vue'
</script>
