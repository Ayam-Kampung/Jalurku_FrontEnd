<template>
  <section class="min-h-screen bg-gray-50 text-gray-800 p-6">
    
    <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 border border-gray-100">
      
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        
        <h1 class="text-3xl font-bold text-gray-800">Manajemen Pertanyaan</h1>
        <button
          @click="showAddModal = true"
          class="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors shadow-sm"
        >
          <span class="text-xl">+</span> Tambah Pertanyaan
        </button>
      </div>

      <!-- Notifikasi -->
      <transition name="fade">
        <div
          v-if="successMessage"
          class="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-md mb-4"
        >
          {{ successMessage }}
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="error"
          class="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md mb-4"
        >
          {{ error }}
        </div>
      </transition>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-12 text-gray-500">
        Memuat data pertanyaan...
      </div>

      <!-- Data Pertanyaan Grouped by Jurusan -->
      <div v-else>
        <div
          v-for="(j, index) in jurusan"
          :key="j.id"
          class="mb-6 border border-gray-200 rounded-lg shadow-sm overflow-hidden"
        >
          <!-- Header jurusan -->
          <div
            @click="toggleJurusan(j.id)"
            class="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 px-5 py-3 transition"
          >
            <div class="flex items-center gap-2">
              <span class="text-gray-400 font-mono text-sm">id:{{ j.id }}</span>
              <h2 class="text-lg font-semibold text-gray-800">{{ j.name }}</h2>
              <span class="text-gray-500 text-sm">
                · {{ getPertanyaanByJurusan(j.id).length }} Pertanyaan
              </span>
            </div>

            <svg
              :class="[
                'w-5 h-5 text-gray-600 transition-transform duration-300',
                expandedJurusan.includes(j.id) ? 'rotate-90' : ''
              ]"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <!-- Isi pertanyaan (expandable) -->
          <transition name="expand">
            <div v-if="expandedJurusan.includes(j.id)" class="bg-white px-5 py-4">
              <div
                class="grid lg:grid-cols-3 md:grid-cols-2 gap-4"
                v-if="getPertanyaanByJurusan(j.id).length > 0"
              >
                <div
                  v-for="p in getPertanyaanByJurusan(j.id)"
                  :key="p.id"
                  class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <span class="text-xs text-gray-500 font-mono">ID: {{ p.id }}</span>
                  </div>

                  <div class="p-5">
                    <div class="mb-4">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Teks Pertanyaan
                      </label>
                      <textarea
                        v-model="p.text"
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 resize-vertical"
                      ></textarea>
                    </div>

                    <details class="mb-4">
                      <summary
                        class="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800"
                      >
                        Properti
                      </summary>
                      <div class="mt-3 space-y-3">
                        <div>
                          <label class="block text-sm font-semibold text-gray-700 mb-2">Meta</label>
                          <input
                            v-model="p.meta"
                            type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          />
                        </div>

                        <div>
                          <label class="block text-sm font-semibold text-gray-700 mb-2"
                            >URL Gambar</label
                          >
                          <input
                            v-model="p.image"
                            type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          />
                        </div>

                        <div>
                          <label class="block text-sm font-semibold text-gray-700 mb-2"
                            >Jurusan</label
                          >
                          <select
                            v-model="p.jurusan_id"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          >
                            <option
                              v-for="jurusanOpt in jurusan"
                              :key="jurusanOpt.id"
                              :value="jurusanOpt.id"
                            >
                              {{ jurusanOpt.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </details>

                    <div class="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        @click="updatePertanyaan(p)"
                        class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Simpan
                      </button>
                      <button
                        @click="deletePertanyaan(p.id)"
                        class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-else
                class="text-center text-gray-400 italic py-4 border border-dashed rounded-md"
              >
                Belum ada pertanyaan untuk jurusan ini.
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Pertanyaan -->
    <transition name="fade">
      <div
        v-if="showAddModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click="closeModal"
      >
        <div
          class="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl"
          @click.stop
        >
          <div
            class="sticky top-0 bg-white flex justify-between items-center px-6 py-4 border-b border-gray-200 z-10"
          >
            <h2 class="text-2xl font-bold text-gray-800">
              Tambah Pertanyaan untuk Semua Jurusan
            </h2>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 text-3xl leading-none w-8 h-8"
            >
              &times;
            </button>
          </div>

          <!-- isi modal tetap sama -->
          <div class="px-6 py-4">
            <div
              class="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6"
            >
              <p class="text-sm text-red-800 font-medium">
                Isi pertanyaan berbeda untuk setiap jurusan.
              </p>
            </div>

            <div
              v-for="(j, index) in jurusan"
              :key="j.id"
              class="mb-8"
              :class="{ 'pt-8 border-t-2 border-gray-200': index > 0 }"
            >
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full font-bold text-sm"
                >
                  {{ index + 1 }}
                </span>
                <h3 class="text-lg font-semibold text-gray-800">
                  Pertanyaan untuk {{ j.name }}
                </h3>
              </div>

              <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Teks Pertanyaan *</label
                >
                <textarea
                  v-model="newPertanyaan[index].text"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 resize-vertical"
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Meta</label>
                  <input
                    v-model="newPertanyaan[index].meta"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2"
                    >URL Gambar</label
                  >
                  <input
                    v-model="newPertanyaan[index].image"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="sticky bottom-0 bg-white flex justify-end gap-3 px-6 py-4 border-t border-gray-200"
          >
            <button
              @click="closeModal"
              class="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-medium transition-colors"
            >
              Batal
            </button>
            <button
              @click="createPertanyaan"
              class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isCreating"
            >
              <span v-if="isCreating">Membuat...</span>
              <span v-else>Simpan Semua Pertanyaan</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import AdminSidebar from './AdminSidebar.vue'
</script>
<script>
import { pertanyaanAPI, jurusanAPI, angketAPI } from '@/services/api';

export default {
  name: 'KelolaSoal',
  data() {
    return {
      pertanyaan: [],
      jurusan: [],
      expandedJurusan: [], // <- state untuk expand/collapse tiap jurusan
      loading: true,
      error: null,
      successMessage: '',
      showAddModal: false,
      isCreating: false,
      newPertanyaan: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    toggleJurusan(id) {
      const idx = this.expandedJurusan.indexOf(id);
      if (idx > -1) this.expandedJurusan.splice(idx, 1);
      else this.expandedJurusan.push(id);
    },
    async loadData() {
      this.loading = true;
      try {
        await Promise.all([this.fetchPertanyaan(), this.fetchJurusan()]);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchPertanyaan() {
      const response = await angketAPI.getAll();
      if (response.status === 'success') this.pertanyaan = response.data;
    },
    async fetchJurusan() {
      const response = await jurusanAPI.getAll();
      if (response.status === 'success') {
        this.jurusan = response.data || [];
        this.initializeNewPertanyaan();
      }
    },
    initializeNewPertanyaan() {
      if (!this.jurusan || this.jurusan.length === 0) return;
      this.newPertanyaan = this.jurusan.map((j) => ({
        text: '',
        meta: '',
        image: '',
        jurusan_id: j.id,
      }));
    },
    async updatePertanyaan(p) {
      const payload = {
        text: p.text,
        meta: p.meta || '',
        image: p.image || '',
        jurusan_id: p.jurusan_id,
      };
      const response = await pertanyaanAPI.update(p.id, payload);
      if (response.status === 'success') {
        this.showSuccess('Pertanyaan berhasil diperbarui!');
        await this.fetchPertanyaan();
      }
    },
    async deletePertanyaan(id) {
      if (!confirm('Yakin ingin hapus pertanyaan ini?')) return;
      const response = await pertanyaanAPI.delete(id);
      if (response.status === 'success') {
        this.showSuccess('Pertanyaan berhasil dihapus!');
        await this.fetchPertanyaan();
      }
    },
    async createPertanyaan() {
      const emptyFields = [];
      this.newPertanyaan.forEach((p, i) => {
        if (!p.text.trim()) emptyFields.push(this.jurusan[i].name);
      });
      if (emptyFields.length > 0) {
        this.error = `Pertanyaan untuk ${emptyFields.join(', ')} masih kosong!`;
        return;
      }
      this.isCreating = true;
      this.error = null;
      try {
        const response = await pertanyaanAPI.create(this.newPertanyaan);
        if (response.status === 'success') {
          this.showSuccess('Berhasil menambahkan pertanyaan!');
          this.closeModal();
          await this.fetchPertanyaan();
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isCreating = false;
      }
    },
    closeModal() {
      this.showAddModal = false;
      this.initializeNewPertanyaan();
      this.error = null;
    },
    showSuccess(message) {
      this.successMessage = message;
      setTimeout(() => (this.successMessage = ''), 3000);
    },
    getPertanyaanByJurusan(id) {
      return this.pertanyaan.filter((p) => p.jurusan_id === id);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
