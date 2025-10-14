<template>
  <div class="container">
    <div class="header">
      <h1>Manajemen Pertanyaan</h1>
      <button @click="showAddModal = true" class="btn-add">
        <span class="icon">+</span>
        Tambah Pertanyaan
      </button>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>

    <!-- Error Message -->
    <div v-if="error" class="alert alert-error">
      {{ error }}
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading">Memuat data...</div>

    <!-- Pertanyaan Cards -->
    <div v-else class="cards-grid">
      <div v-for="p in pertanyaan" :key="p.id" class="card">
        <div class="card-header">
          <span class="card-id">ID: {{ p.id }}</span>
        </div>
        
        <div class="card-body">
          <div class="form-group">
            <label>Teks Pertanyaan</label>
            <textarea 
              v-model="p.text" 
              rows="3"
              class="form-input"
            ></textarea>
          </div>

          <div class="form-group">
            <label>Meta</label>
            <input 
              v-model="p.meta" 
              type="text"
              class="form-input"
              placeholder="Metadata (opsional)"
            />
          </div>

          <div class="form-group">
            <label>URL Gambar</label>
            <input 
              v-model="p.image" 
              type="text"
              class="form-input"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div class="form-group">
            <label>Jurusan</label>
            <select v-model="p.jurusan_id" class="form-input">
              <option v-for="j in jurusan" :key="j.id" :value="j.id">
                {{ j.name }}
              </option>
            </select>
          </div>

          <div class="card-footer">
            <button 
              @click="updatePertanyaan(p)" 
              class="btn btn-save"
            >
              <span class="icon">💾</span>
              Simpan
            </button>
            <button 
              @click="deletePertanyaan(p.id)" 
              class="btn btn-delete"
            >
              <span class="icon">🗑️</span>
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Pertanyaan -->
    <div v-if="showAddModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>Tambah Pertanyaan Baru</h2>
          <button @click="closeModal" class="btn-close">×</button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label>Teks Pertanyaan *</label>
            <textarea 
              v-model="newPertanyaan.text" 
              rows="3"
              class="form-input"
              placeholder="Masukkan pertanyaan..."
            ></textarea>
          </div>

          <div class="form-group">
            <label>Meta</label>
            <input 
              v-model="newPertanyaan.meta" 
              type="text"
              class="form-input"
              placeholder="Metadata (opsional)"
            />
          </div>

          <div class="form-group">
            <label>URL Gambar</label>
            <input 
              v-model="newPertanyaan.image" 
              type="text"
              class="form-input"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div class="form-group">
            <label>Jurusan *</label>
            <select v-model="newPertanyaan.jurusan_id" class="form-input">
              <option value="">Pilih Jurusan</option>
              <option v-for="j in jurusan" :key="j.id" :value="j.id">
                {{ j.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="closeModal" class="btn btn-cancel">Batal</button>
          <button @click="createPertanyaan" class="btn btn-save">
            Tambah Pertanyaan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pertanyaanAPI, jurusanAPI } from '@/services/api';
import { angketAPI } from '../../services/api';

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
      newPertanyaan: {
        text: '',
        meta: '',
        image: '',
        jurusan_id: ''
      }
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
        }
      } catch (err) {
        throw new Error(' jurusan: ' + err.message);
      }
    },

    async updatePertanyaan(p) {
      try {
        const response = await pertanyaanAPI.update(p.id, {
          text: p.text,
          meta: p.meta,
          image: p.image,
          jurusan_id: p.jurusan_id
        });
        
        if (response.status === 'success') {
          this.showSuccess('Pertanyaan berhasil diperbarui!');
          await this.fetchPertanyaan();
        }
      } catch (err) {
        this.error = err.message;
      }
    },

    async deletePertanyaan(id) {
      if (!confirm('Yakin ingin menghapus pertanyaan ini?')) return;
      
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
      if (!this.newPertanyaan.text || !this.newPertanyaan.jurusan_id) {
        this.error = 'Teks pertanyaan dan jurusan wajib diisi!';
        return;
      }

      try {
        const response = await pertanyaanAPI.create({
          text: this.newPertanyaan.text,
          meta: this.newPertanyaan.meta,
          image: this.newPertanyaan.image,
          jurusan_id: parseInt(this.newPertanyaan.jurusan_id)
        });
        
        if (response.status === 'success') {
          this.showSuccess('Pertanyaan baru berhasil ditambahkan!');
          this.closeModal();
          await this.fetchPertanyaan();
        }
      } catch (err) {
        this.error = err.message;
      }
    },

    closeModal() {
      this.showAddModal = false;
      this.newPertanyaan = {
        text: '',
        meta: '',
        image: '',
        jurusan_id: ''
      };
    },

    showSuccess(message) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
}

.btn-add {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-add:hover {
  background: #2563eb;
}

.alert {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.alert-success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #34d399;
}

.alert-error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #f87171;
}

.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.125rem;
  color: #6b7280;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: #f9fafb;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-id {
  font-size: 0.75rem;
  color: #6b7280;
  font-family: monospace;
}

.card-body {
  padding: 1.25rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

textarea.form-input {
  resize: vertical;
  font-family: inherit;
}

.card-footer {
  display: flex;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save {
  background: #10b981;
  color: white;
  flex: 1;
}

.btn-save:hover {
  background: #059669;
}

.btn-delete {
  background: #ef4444;
  color: white;
  flex: 1;
}

.btn-delete:hover {
  background: #dc2626;
}

.btn-cancel {
  background: #f3f4f6;
  color: #374151;
}

.btn-cancel:hover {
  background: #e5e7eb;
}

.icon {
  font-size: 1.125rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
}

.btn-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: #6b7280;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 2rem;
  height: 2rem;
}

.btn-close:hover {
  color: #1f2937;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
}
</style>