<template>
  <div class="lg:mx-10 lg:my-10 mx-5 my-5">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Manajemen Pertanyaan</h1>
      <button @click="showAddModal = true" class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
        <span class="text-xl">+</span>
        Tambah Pertanyaan
      </button>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
      {{ successMessage }}
    </div>

    <!-- Error Message -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
      {{ error }}
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12 text-lg text-gray-500">Memuat data...</div>

    <!-- Pertanyaan Cards Grouped by Jurusan -->
    <div v-else>
      <div v-for="j in jurusan" :key="j.id" class="mb-12">
        <h2 class="sticky top-0 flex bg-white items-end gap-2 text-black py-2 text-2xl font-bold border-b mb-5">
          <span class="text-gray-400 font-mono text-sm">id:{{ j.id }}</span> 
          {{ j.name }} · <div class="text-gray-500">{{ getPertanyaanByJurusan(j.id).length }} Pertanyaan</div>
        </h2>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          <div v-for="p in getPertanyaanByJurusan(j.id)" :key="p.id" class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <span class="text-xs text-gray-500 font-mono">ID: {{ p.id }}</span>
            </div>
            
            <div class="p-5">
              <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Teks Pertanyaan</label>
                <textarea 
                  v-model="p.text" 
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-vertical"
                ></textarea>
              </div>

              <details class="mb-4">
                <summary class="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">Properti</summary>
                
                <div class="mt-3 space-y-3">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Meta</label>
                    <input
                      v-model="p.meta"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="gaya_belajar, minat, ..."
                    />
                  </div>
    
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">URL Gambar</label>
                    <input
                      v-model="p.image"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
    
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Jurusan</label>
                    <select v-model="p.jurusan_id" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                      <option v-for="jurusanOpt in jurusan" :key="jurusanOpt.id" :value="jurusanOpt.id">
                        {{ jurusanOpt.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </details>

              <div class="flex gap-3 pt-4 border-t border-gray-200">
                <button 
                  @click="updatePertanyaan(p)" 
                  class="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Simpan
                </button>
                <button 
                  @click="deletePertanyaan(p.id)" 
                  class="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Pertanyaan -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="closeModal">
      <div class="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl" @click.stop>
        <div class="sticky top-0 bg-white flex justify-between items-center px-6 py-4 border-b border-gray-200 z-10">
          <h2 class="text-2xl font-bold text-gray-800">Tambah Pertanyaan untuk Semua Jurusan</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 text-3xl leading-none w-8 h-8">&times;</button>
        </div>
        
        <div class="px-6 py-4">
          <div class="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-6">
            <p class="text-sm text-blue-800 font-medium">Isi pertanyaan yang berbeda untuk setiap jurusan. Semua field wajib diisi.</p>
          </div>

          <!-- Form untuk setiap jurusan -->
          <div 
            v-for="(j, index) in jurusan" 
            :key="j.id" 
            class="mb-8"
            :class="{ 'pt-8 border-t-2 border-gray-200': index > 0 }"
          >
            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-bold text-sm">
                {{ index + 1 }}
              </span>
              <h3 class="text-lg font-semibold text-gray-800">Pertanyaan untuk {{ j.name }}</h3>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Teks Pertanyaan *</label>
              <textarea 
                v-model="newPertanyaan[index].text" 
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-vertical"
                :placeholder="`Masukkan pertanyaan untuk ${j.name}...`"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Meta</label>
                <input 
                  v-model="newPertanyaan[index].meta" 
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Metadata (opsional)"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">URL Gambar</label>
                <input 
                  v-model="newPertanyaan[index].image" 
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="sticky bottom-0 bg-white flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button @click="closeModal" class="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-medium transition-colors">
            Batal
          </button>
          <button 
            @click="createPertanyaan" 
            class="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isCreating"
          >
            <span v-if="isCreating">Membuat...</span>
            <span v-else>Simpan Semua Pertanyaan</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pertanyaanAPI, jurusanAPI, angketAPI } from '@/services/api';

export default {
  name: 'JalurkuAdmin',
  data() {
    return {
      pertanyaan: [],
      jurusan: [],
      loading: true,
      error: null,
      successMessage: '',
      showAddModal: false,
      isCreating: false,
      newPertanyaan: []
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        await Promise.all([
          this.fetchPertanyaan(),
          this.fetchJurusan()
        ]);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchPertanyaan() {
      try {
        const response = await angketAPI.getAll();
        if (response.status === 'success') {
          this.pertanyaan = response.data;
        }
      } catch (err) {
        throw new Error('Gagal memuat pertanyaan: ' + err.message);
      }
    },

    async fetchJurusan() {
      try {
        const response = await jurusanAPI.getAll();
        if (response.status === 'success') {
          this.jurusan = response.data || [];
          this.initializeNewPertanyaan();
        }
      } catch (err) {
        throw new Error('Gagal memuat jurusan: ' + err.message);
      }
    },

    initializeNewPertanyaan() {
      // PERBAIKAN: Gunakan array, bukan object dengan key j.id
      this.newPertanyaan = this.jurusan.map(j => ({
        text: '',
        meta: '',
        image: '',
        jurusan_id: j.id
      }));
    },

    async updatePertanyaan(p) {
      try {
        const payload = {
          text: p.text,
          meta: p.meta || '',
          image: p.image || '',
          jurusan_id: p.jurusan_id
        };
        
        console.log('Update payload:', payload);
        
        const response = await pertanyaanAPI.update(p.id, payload);
        
        if (response.status === 'success') {
          this.showSuccess('Pertanyaan berhasil diperbarui!');
          await this.fetchPertanyaan();
        }
      } catch (err) {
        this.error = err.message;
      }
    },

    async deletePertanyaan(id) {
      if (!confirm('Menghapus 1 pertanyaan akan membuat keanehan dalam penilaian jurusan. Pastikan hapus semua pertanyaan pada setiap jurusan!')) return;
      
      try {
        const response = await pertanyaanAPI.delete(id);
        
        if (response.status === 'success') {
          this.showSuccess('Pertanyaan berhasil dihapus!');
          await this.fetchPertanyaan();
        }
      } catch (err) {
        this.error = err.message;
      }
    },

    async createPertanyaan() {
      // Validasi
      const emptyFields = [];
      this.newPertanyaan.forEach((p, index) => {
        if (!p.text.trim()) {
          emptyFields.push(this.jurusan[index].name);
        }
      });

      if (emptyFields.length > 0) {
        this.error = `Pertanyaan untuk ${emptyFields.join(', ')} masih kosong!`;
        return;
      }

      this.isCreating = true;
      this.error = null;

      try {
        // Data sudah dalam bentuk array yang benar
        console.log('Sending data:', this.newPertanyaan);
        
        const response = await pertanyaanAPI.create(this.newPertanyaan);

        if (response.status === 'success') {
          this.showSuccess(`Berhasil menambahkan ${response.count} pertanyaan untuk semua jurusan!`);
          this.closeModal();
          await this.fetchPertanyaan();
        }
      } catch (err) {
        console.error('Error creating:', err);
        if (err.response && err.response.data) {
          this.error = err.response.data.error || err.response.data.message || 'Terjadi kesalahan';
        } else {
          this.error = 'Terjadi kesalahan: ' + err.message;
        }
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
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    },

    getPertanyaanByJurusan(jurusanId) {
      const filtered = this.pertanyaan.filter(p => p.jurusan_id === jurusanId);
      return filtered;
    }
  }
}
</script>

<style scoped>
/* Tidak ada custom CSS, semua menggunakan Tailwind */
</style>