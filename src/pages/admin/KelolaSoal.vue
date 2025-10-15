<template>
  <section class="min-h-screen bg-gray-50 text-gray-800 p-6">
    <div class="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-red-600">Kelola Soal</h1>
        <button
          @click="openAddModal"
          class="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition-all"
        >
          + Tambah Soal
        </button>
      </div>

      <!-- Tabel Soal -->
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200 rounded-md">
          <thead class="bg-red-500 text-white">
            <tr>
              <th class="py-3 px-4 text-left">#</th>
              <th class="py-3 px-4 text-left">Pertanyaan</th>
              <th class="py-3 px-4 text-left">Opsi</th>
              <th class="py-3 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(soal, i) in soals"
              :key="soal.id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="py-3 px-4">{{ i + 1 }}</td>
              <td class="py-3 px-4">{{ soal.pertanyaan }}</td>
              <td class="py-3 px-4">
                <ul class="list-disc ml-5">
                  <li v-for="(opt, j) in soal.opsi" :key="j">{{ opt }}</li>
                </ul>
              </td>
              <td class="py-3 px-4 flex gap-2">
                <button
                  @click="openEditModal(soal)"
                  class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  @click="hapusSoal(soal.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Hapus
                </button>
              </td>
            </tr>

            <tr v-if="soals.length === 0">
              <td colspan="4" class="text-center py-5 text-gray-500">
                Belum ada soal ditambahkan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tambah/Edit Soal -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
        <h2 class="text-xl font-bold mb-4">
          {{ isEditing ? 'Edit Soal' : 'Tambah Soal' }}
        </h2>

        <!-- Input -->
        <form @submit.prevent="simpanSoal">
          <label class="block font-semibold mb-1">Pertanyaan</label>
          <input
            v-model="form.pertanyaan"
            type="text"
            placeholder="Masukkan pertanyaan"
            class="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />

          <label class="block font-semibold mb-1">Opsi Jawaban</label>
          <div v-for="(opt, i) in form.opsi" :key="i" class="flex gap-2 mb-2">
            <input
              v-model="form.opsi[i]"
              type="text"
              placeholder="Opsi..."
              class="w-full border border-gray-300 rounded-md p-2"
              required
            />
            <button
              type="button"
              @click="hapusOpsi(i)"
              class="bg-red-500 text-white px-3 rounded-md hover:bg-red-600"
            >
              ×
            </button>
          </div>

          <button
            type="button"
            @click="tambahOpsi"
            class="text-sm text-red-500 hover:text-red-600 mb-4"
          >
            + Tambah Opsi
          </button>

          <div class="flex justify-end gap-3 mt-4">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// daftar soal dummy sementara (nanti ganti fetch backend)
const soals = ref([])

// form & modal
const modalOpen = ref(false)
const isEditing = ref(false)
const form = ref({ id: null, pertanyaan: '', opsi: [] })

// buka modal tambah
function openAddModal() {
  isEditing.value = false
  form.value = { id: null, pertanyaan: '', opsi: [''] }
  modalOpen.value = true
}

// buka modal edit
function openEditModal(soal) {
  isEditing.value = true
  form.value = { ...soal }
  modalOpen.value = true
}

// tutup modal
function closeModal() {
  modalOpen.value = false
}

// tambah opsi jawaban
function tambahOpsi() {
  form.value.opsi.push('')
}

// hapus opsi
function hapusOpsi(index) {
  form.value.opsi.splice(index, 1)
}

// simpan soal (tambah / edit)
async function simpanSoal() {
  if (isEditing.value) {
    // 🔄 update data
    const idx = soals.value.findIndex((s) => s.id === form.value.id)
    soals.value[idx] = { ...form.value }

    // contoh backend
    // await fetch('http://localhost:8080/api/soal/' + form.value.id, { method: 'PUT', body: JSON.stringify(form.value) })
  } else {
    // ➕ tambah baru
    const newSoal = {
      id: Date.now(),
      pertanyaan: form.value.pertanyaan,
      opsi: form.value.opsi.filter((o) => o.trim() !== ''),
    }
    soals.value.push(newSoal)

    // contoh backend
    // await fetch('http://localhost:8080/api/soal', { method: 'POST', body: JSON.stringify(newSoal) })
  }
  closeModal()
}

// hapus soal
async function hapusSoal(id) {
  if (!confirm('Yakin hapus soal ini?')) return
  soals.value = soals.value.filter((s) => s.id !== id)

  // contoh backend
  // await fetch('http://localhost:8080/api/soal/' + id, { method: 'DELETE' })
}

// contoh ambil data dari backend
onMounted(async () => {
  try {
    // const res = await fetch('http://localhost:8080/api/soal')
    // soals.value = await res.json()
    // sementara dummy:
    soals.value = [
      {
        id: 1,
        pertanyaan: 'Apa warna langit?',
        opsi: ['Biru', 'Merah', 'Kuning'],
      },
    ]
  } catch (err) {
    console.error('Gagal memuat soal:', err)
  }
})
</script>

<style scoped>
/* Fade untuk modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
