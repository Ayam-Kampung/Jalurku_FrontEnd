<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Sidebar kiri -->
    <aside
      class="w-64 bg-red-600 text-white flex flex-col fixed h-full transition-all duration-300"
    >
      <div class="flex items-center justify-center py-6 border-b border-red-400">
        <!-- <img src="@/assets/images/Logo-SMK.png" alt="Logo SMK" class="h-10 mr-2" /> -->
        <h1 class="text-lg font-bold">Admin Panel</h1>
      </div>

      <nav class="flex-grow mt-6 space-y-1 px-4">
        <RouterLink
          to="/admin"
          class="block py-3 px-4 rounded-md hover:bg-red-700 transition-all"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          to="/admin/kelolasoal"
          class="block py-3 px-4 rounded-md hover:bg-red-700 transition-all"
        >
          Kelola Soal
        </RouterLink>
        <!-- <RouterLink
          to="/admin/kelolasoal"
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

    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <!-- Navbar -->
      <header
        class="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-10"
      >
        <h2 class="text-xl font-semibold text-gray-800">Dashboard</h2>
        <button
          @click="logout"
          class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </header>

      <!-- Content -->
      <main class="p-8 space-y-8">
        <!-- Welcome -->
        <section class="bg-red-500 text-white rounded-xl p-8 shadow-md">
          <h3 class="text-2xl font-bold mb-2">Selamat Datang, Admin!</h3>
          <p class="text-white/90">
            Kelola data pengguna, soal, dan sistem JalurKu dari satu tempat.
          </p>
        </section>

        <!-- Statistik -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="bg-white shadow-md rounded-xl p-6 border-t-4 border-red-500 hover:shadow-lg transition-all"
          >
            <h4 class="text-lg font-semibold text-gray-700 mb-2">
              Total Pengguna
            </h4>
            <p class="text-4xl font-bold text-red-500">1,240</p>
          </div>

          <div
            class="bg-white shadow-md rounded-xl p-6 border-t-4 border-red-500 hover:shadow-lg transition-all"
          >
            <h4 class="text-lg font-semibold text-gray-700 mb-2">Total Soal</h4>
            <p class="text-4xl font-bold text-red-500">56</p>
          </div>

          <div
            class="bg-white shadow-md rounded-xl p-6 border-t-4 border-red-500 hover:shadow-lg transition-all"
          >
            <h4 class="text-lg font-semibold text-gray-700 mb-2">
              Jurusan Aktif
            </h4>
            <p class="text-4xl font-bold text-red-500">4</p>
          </div>
        </section>

        <!-- Aktivitas terbaru -->
        <section class="bg-white rounded-xl shadow-md p-6">
          <h4 class="text-lg font-bold text-gray-800 mb-4">Aktivitas Terbaru</h4>
          <ul class="space-y-3 text-gray-600">
            <li>Belum Ada Aktivitas</li>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from './AdminSidebar.vue'
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  window.location.href = '/#'
}
</script>

<style scoped>
/* Responsive Sidebar */
@media (max-width: 1024px) {
  aside {
    position: fixed;
    left: -100%;
    transition: left 0.3s ease;
  }
}
</style>
