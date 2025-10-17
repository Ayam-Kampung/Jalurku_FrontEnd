<template>
  <section class="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
    <!-- Loading -->
    <div v-if="loading" class="text-gray-600 flex items-center gap-2 text-lg font-medium">
      <svg
        class="w-5 h-5 animate-spin text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      Memuat data profil...
    </div>

    <!-- Card Profil -->
    <div
      v-else-if="user"
      class="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-8 flex flex-col md:flex-row items-center gap-8 transition-all"
    >
      <!-- Avatar -->
      <div class="flex flex-col items-center text-center md:w-1/3">
        <div
          class="w-28 h-28 rounded-full bg-red-500 text-white text-3xl font-bold flex items-center justify-center uppercase select-none"
        >
          {{ userInitials }}
        </div>
        <h2 class="mt-4 text-2xl font-semibold text-gray-800">
          {{ user.Name || user.username }}
        </h2>
        <p class="text-gray-500 text-sm">{{ user.Email }}</p>

        <!-- Jurusan -->
        <div
          v-if="user.Jurusan"
          class="mt-4 flex items-center gap-2 py-1 px-3 rounded-md bg-blue-100 text-blue-800 font-medium"
        >
          <span class="material-symbols-rounded text-base">school</span>
          {{ user.Jurusan }}
        </div>
      </div>

      <!-- Detail Info -->
      <div class="flex-1 space-y-4 w-full">
        <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">
          Informasi Akun
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">Nama Lengkap</p>
            <p class="font-medium text-gray-800">
              {{ user.Name || '-' }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Username</p>
            <p class="font-medium text-gray-800">
              {{ user.username || '-' }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Email</p>
            <p class="font-medium text-gray-800">
              {{ user.Email || '-' }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Jurusan</p>
            <p class="font-medium text-gray-800">
              {{ user.Jurusan || '-' }}
            </p>
          </div>
        </div>

        <!-- Tombol Logout -->
        <div class="pt-6">
          <button
            @click="handleLogout"
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition font-medium"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>

    <!-- Error / Tidak ada user -->
    <div v-else class="text-gray-600 mt-10 text-center">
      Tidak dapat memuat data pengguna.
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { authAPI } from "@/services/api";
import { storage } from "@/utils/storage";

const router = useRouter();
const user = ref(null);
const loading = ref(true);

// Inisial dari nama/username
const userInitials = computed(() => {
  const name = user.value?.Name || user.value?.username || "?";
  return name.slice(0, 2).toUpperCase();
});

// Ambil data user dari API
const fetchUser = async () => {
  const token = storage.getToken();
  if (!token) {
    router.push("/auth/login");
    return;
  }

  try {
    const data = await authAPI.getUserInfo(token);
    console.log("Data user dari API:", data); // Debug log
    // ✅ ambil data dari dalam "data"
    user.value = data.data || data.user || data;
  } catch (err) {
    console.error("Gagal memuat pengguna:", err.message);
    storage.removeToken();
    router.push("/auth/login");
  } finally {
    loading.value = false;
  }
};

// Logout
const handleLogout = () => {
  storage.clearAll();
  router.push("/");
};

// Jalankan fetch saat komponen dimuat
onMounted(fetchUser);
</script>
