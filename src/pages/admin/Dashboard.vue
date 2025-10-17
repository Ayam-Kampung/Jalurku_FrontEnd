<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Sidebar kiri -->
    <div>
      <AdminSidebar
        :class="[
          'h-full bg-red-600 text-white z-50 transition-transform duration-300',
          'lg:translate-x-0 lg:static lg:block',
          isSidebarOpen ? 'translate-x-0 fixed inset-y-0 left-0 w-64' : '-translate-x-full fixed inset-y-0 left-0 w-64'
        ]"
      />
      <!-- Overlay (mobile) -->
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/40 z-40 lg:hidden"
        @click="toggleSidebar"
      ></div>
    </div>

    <!-- Main Content -->
    <div
      class="flex-1 w-full transition-all duration-300"
      :class="{ 'lg:ml-64': !isSidebarOpen }"
    >
      <!-- Navbar -->
      <header
        class="bg-white shadow-md py-4 px-4 md:px-8 flex justify-between items-center sticky top-0 z-30"
      >
        <!-- Tombol toggle sidebar (hanya muncul di mobile) -->
        <button
          @click="toggleSidebar"
          class="lg:hidden text-gray-700 hover:text-red-500 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h2 class="text-lg md:text-xl font-semibold text-gray-800">Dashboard</h2>

        <button
          @click="logout"
          class="bg-red-500 text-white px-3 md:px-4 py-2 rounded-md hover:bg-red-600 transition-all text-sm md:text-base"
        >
          Logout
        </button>
      </header>

      <!-- Content -->
      <main class="p-4 md:p-8 space-y-8">
        <!-- Welcome -->
        <section
          class="bg-red-500 text-white rounded-xl p-6 md:p-8 shadow-md text-center md:text-left"
        >
          <h3 class="text-xl md:text-2xl font-bold mb-2">Selamat Datang, Admin!</h3>
          <p class="text-white/90 text-sm md:text-base">
            Kelola data pengguna, soal, dan sistem JalurKu dari satu tempat.
          </p>
        </section>

        <!-- Statistik -->
        <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <!-- Total Soal -->
          <div
            class="bg-white shadow-md rounded-xl p-6 border-t-4 border-red-500 hover:shadow-lg transition-all"
          >
            <h4 class="text-lg font-semibold text-gray-700 mb-2">Total Soal</h4>
            <div v-if="loading" class="text-gray-400 text-2xl">...</div>
            <p v-else class="text-4xl font-bold text-red-500">{{ totalSoal }}</p>
          </div>

          <!-- Jurusan Aktif -->
          <div
            class="bg-white shadow-md rounded-xl p-6 border-t-4 border-red-500 hover:shadow-lg transition-all"
          >
            <h4 class="text-lg font-semibold text-gray-700 mb-2">Jurusan Aktif</h4>
            <div v-if="loading" class="text-gray-400 text-2xl">...</div>
            <p v-else class="text-4xl font-bold text-red-500">{{ totalJurusan }}</p>
          </div>
        </section>

        <!-- Aktivitas terbaru -->
        <section class="bg-white rounded-xl shadow-md p-6">
          <h4 class="text-lg font-bold text-gray-800 mb-4">Aktivitas Terbaru</h4>
          <ul class="space-y-3 text-gray-600 text-sm md:text-base">
            <li>Belum Ada Aktivitas</li>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from './AdminSidebar.vue'
import { angketAPI, jurusanAPI } from '@/services/api'

const totalSoal = ref(0)
const totalJurusan = ref(0)
const loading = ref(true)
const isSidebarOpen = ref(false)

onMounted(async () => {
  try {
    const [resSoal, resJurusan] = await Promise.all([
      angketAPI.getAll(),
      jurusanAPI.getAll()
    ])
    if (resSoal?.status === 'success') totalSoal.value = resSoal.data.length
    if (resJurusan?.status === 'success') totalJurusan.value = resJurusan.data.length
  } catch (err) {
    console.error('Gagal mengambil data dashboard:', err)
  } finally {
    loading.value = false
  }
})

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  window.location.href = '/#'
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<style scoped>
@media (min-width: 1024px) {
  /* di desktop sidebar nempel, konten tanpa jarak tambahan */
  .lg\:ml-64 {
    margin-left: 0 !important;
  }
}
</style>
