<template>
  <div class="min-h-screen bg-gray-50 flex items-start justify-center p-6 mt-20">
    <div class="w-full max-w-5xl relative ">
      <header class="mb-10 text-center">
        <h1 class="text-3xl font-extrabold">Roadmap Jurusan SMK Telkom Purwokerto</h1>
        <p class="text-sm text-gray-600 mt-1">Langkah demi langkah untuk menjadi profesional di bidangmu</p>
      </header>

      <!-- Pilih jurusan -->
      <div class="flex justify-center mb-12 space-x-4">
        <button v-for="j in jurusanList" :key="j" @click="selectedJurusan = j" :class="[
          'px-4 py-2 rounded-lg shadow transition',
          selectedJurusan === j ? `${jurusanColor[j]} text-white` : 'bg-white text-gray-700 border'
        ]">
          {{ j }}
        </button>
      </div>

      <!-- Garis timeline -->
      <div
        class="absolute left-1/2 transform -translate-x-1/2 border-l-4 border-dashed border-gray-200 h-full top-0 z-0 pb-24 mt-24">
      </div>

      <!-- Isi langkah-langkah -->
      <div class="space-y-24 relative z-10">
        <div v-for="(step, i) in steps[selectedJurusan]" :key="step.id" class="relative flex items-start">
          <!-- Kolom kiri (even) -->
          <div class="col-side pr-8 flex justify-end">
            <div v-if="i % 2 === 0" class="timeline-box w-full"
              :style="{ borderLeft: '4px solid ' + jurusanBorder[selectedJurusan] }">
              <div class="flex items-center justify-between">
                <h2 class="flex items-center gap-2">
                  <img :src="step.icon" alt="icon level" class="w-6 h-6" />
                  {{ step.title }}
                </h2>
                <button @click="toggle(selectedJurusan, i)" class="text-gray-400 hover:text-gray-600">
                  <span v-if="!expanded[selectedJurusan][i]">+</span>
                  <span v-else>-</span>
                </button>
              </div>
              <p class="text-sm">{{ step.summary }}</p>
              <transition name="fade-slide">
                <div v-show="expanded[selectedJurusan][i]" class="mt-2 text-sm text-gray-700">
                  <ul class="list-disc pl-5">
                    <li v-for="(m, idx) in step.details" :key="idx">{{ m }}</li>
                  </ul>
                  <div class="mt-2 text-xs text-gray-500">
                    Project: <span class="font-medium">{{ step.project }}</span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <!-- Kolom tengah (titik timeline) -->
          <div class="col-center flex flex-col items-center justify-start">
            <div class="bg-white rounded-full p-2 shadow ring-4 ring-white">
              <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: jurusanBorder[selectedJurusan] }"></div>
            </div>

            <div v-if="i !== steps[selectedJurusan].length - 1" class="mt-2">
              <svg class="w-6 h-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 4v12"></path>
                <path d="M18 10l-6 6-6-6"></path>
              </svg>
            </div>
          </div>

          <!-- Kolom kanan (odd) -->
          <div class="col-side pl-8 flex justify-start">
            <div v-if="i % 2 === 1" class="timeline-box w-full"
              :style="{ borderLeft: '4px solid ' + jurusanBorder[selectedJurusan] }">
              <div class="flex items-center justify-between">
                <h2 class="flex items-center gap-2">
                  <img :src="step.icon" alt="icon level" class="w-6 h-6" />
                  {{ step.title }}
                </h2>
                <button @click="toggle(selectedJurusan, i)" class="text-gray-400 hover:text-gray-600">
                  <span v-if="!expanded[selectedJurusan][i]">+</span>
                  <span v-else>-</span>
                </button>
              </div>
              <p class="text-sm">{{ step.summary }}</p>
              <transition name="fade-slide">
                <div v-show="expanded[selectedJurusan][i]" class="mt-2 text-sm text-gray-700">
                  <ul class="list-disc pl-5">
                    <li v-for="(m, idx) in step.details" :key="idx">{{ m }}</li>
                  </ul>
                  <div class="mt-2 text-xs text-gray-500">
                    Project: <span class="font-medium">{{ step.project }}</span>
                  </div>
                </div>
              </transition>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import rpl_lvl1 from '@/assets/images/code.png'
import rpl_lvl2 from '@/assets/images/database.png'
import rpl_lvl3 from '@/assets/images/app.png'
import rpl_lvl4 from '@/assets/images/teamwork.png'
import tkj_lvl1 from '@/assets/images/router.png'
import tkj_lvl2 from '@/assets/images/server.png'
import tkj_lvl3 from '@/assets/images/security.png'
import tkj_lvl4 from '@/assets/images/it.png'
import pg_lvl1 from '@/assets/images/curve.png'
import pg_lvl2 from '@/assets/images/animation.png'
import pg_lvl3 from '@/assets/images/animate.png'
import tja_lvl1 from '@/assets/images/lan.png'
import tja_lvl2 from '@/assets/images/fiber.png'
import tja_lvl3 from '@/assets/images/wifi.png'
import tja_lvl4 from '@/assets/images/troubleshooting.png'

const jurusanList = ['RPL', 'TKJ', 'PG', 'TJA']
const selectedJurusan = ref('RPL')

// warna untuk tombol
const jurusanColor = {
  RPL: 'bg-green-500',
  TKJ: 'bg-red-600',
  PG: 'bg-blue-500',
  TJA: 'bg-yellow-400'
}

// warna hex untuk border & titik timeline
const jurusanBorder = {
  RPL: '#22c55e', // hijau
  TKJ: '#ef4444', // merah
  PG: '#3b82f6',  // biru
  TJA: '#facc15'  // kuning
}

// roadmap per jurusan
const steps = reactive({
  RPL: [
    { id: 1, title: 'Level 1 — Dasar Pemrograman & Logika', icon: rpl_lvl1, summary: 'Pahami dasar komputer, algoritma, dan bahasa pemrograman dasar.', details: ['Dasar komputer & OS', 'Algoritma & flowchart', 'Bahasa C/Python/Java', 'Git dasar'], project: 'Program kasir sederhana' },
    { id: 2, title: 'Level 2 — Pemrograman Lanjutan & Basis Data', icon: rpl_lvl2, summary: 'OOP, desain database, dan CRUD.', details: ['OOP', 'Database MySQL/PostgreSQL', 'ERD & relasi', 'SQL dasar'], project: 'Aplikasi manajemen siswa' },
    { id: 3, title: 'Level 3 — Pengembangan Aplikasi', icon: rpl_lvl3, summary: 'Bangun aplikasi full-stack.', details: ['HTML/CSS/JS', 'Framework Vue/React/Laravel/Flutter', 'REST API', 'Deployment'], project: 'Website sekolah' },
    { id: 4, title: 'Level 4 — Profesional & Kolaborasi', icon: rpl_lvl4, summary: 'Magang/kerja: manajemen proyek, testing, DevOps dasar.', details: ['Agile/Scrum', 'CI/CD', 'UI/UX dasar', 'Testing & keamanan'], project: 'Sistem manajemen user' },
  ],
  TKJ: [
    { id: 1, title: 'Level 1 — Dasar Jaringan', icon: tkj_lvl1, summary: 'Pahami dasar jaringan & OSI Model.', details: ['TCP/IP', 'Subnetting', 'Router & Switch dasar', 'Wireshark'], project: 'Simulasi jaringan kecil' },
    { id: 2, title: 'Level 2 — Administrasi Server', icon: tkj_lvl2, summary: 'Setup server & service dasar.', details: ['Linux dasar', 'DNS/DHCP', 'HTTP/FTP server', 'Virtualisasi'], project: 'Server lokal sekolah' },
    { id: 3, title: 'Level 3 — Keamanan Jaringan', icon: tkj_lvl3, summary: 'Pahami dasar keamanan & monitoring.', details: ['Firewall', 'IDS/IPS', 'VPN', 'Penetration testing dasar'], project: 'Audit keamanan jaringan' },
    { id: 4, title: 'Level 4 — Profesional & Sertifikasi', icon: tkj_lvl4, summary: 'Siap kerja/sertifikasi.', details: ['Cisco/CompTIA', 'Monitoring jaringan', 'Manajemen proyek IT'], project: 'Sertifikasi CCNA/CompTIA' },
  ],
  PG: [
    { id: 1, title: 'Level 1 — Dasar Multimedia', icon: pg_lvl1, summary: 'Pahami desain grafis & software kreatif.', details: ['Photoshop/Illustrator', 'Teori warna', 'Tipografi', 'UI dasar'], project: 'Desain poster/flyer' },
    { id: 2, title: 'Level 2 — Animasi & Video', icon: pg_lvl2, summary: 'Buat konten multimedia.', details: ['After Effects', 'Premiere', 'Animasi 2D', 'Editing video'], project: 'Video promosi sekolah' },
    { id: 3, title: 'Level 3 — Interaktif & Web Multimedia',icon: pg_lvl3, summary: 'Buat website & interaksi multimedia.', details: ['HTML/CSS/JS', 'Animasi web', 'Audio/video integrasi'], project: 'Website portofolio' },
  ],
TJA: [
  {
    id: 1,
    title: 'Level 1 — Dasar Telekomunikasi & Jaringan Akses',
    icon: tja_lvl1,
    summary: 'Pelajari dasar sistem komunikasi & media transmisi.',
    details: [
      'Prinsip transmisi sinyal',
      'Media kabel & nirkabel',
      'Topologi jaringan akses',
      'Perangkat jaringan dasar (ONT, OLT, Modem)'
    ],
    project: 'Simulasi jaringan akses rumah (FTTH/Wireless)'
  },
  {
    id: 2,
    title: 'Level 2 — Fiber Optik & Infrastruktur Akses',
    icon: tja_lvl2,
    summary: 'Kuasai instalasi & konfigurasi jaringan fiber optik.',
    details: [
      'Jenis-jenis kabel FO (Singlemode & Multimode)',
      'Splicing & konektorisasi',
      'OTDR & pengujian redaman',
      'Manajemen patch panel & distribusi'
    ],
    project: 'Membuat jalur jaringan FO antar-ruangan'
  },
  {
    id: 3,
    title: 'Level 3 — Wireless & Teknologi Akses Modern',
    icon: tja_lvl3,
    summary: 'Pahami sistem nirkabel & konfigurasi perangkat akses.',
    details: [
      'Teknologi WLAN & WiFi 6',
      'Mikrotik Wireless & Point-to-Point',
      'Jaringan seluler (4G/5G) dasar',
      'QoS & manajemen bandwidth'
    ],
    project: 'Implementasi jaringan hotspot kampus'
  },
  {
    id: 4,
    title: 'Level 4 — Profesional & Sertifikasi Jaringan Akses',
    icon: tja_lvl4,
    summary: 'Persiapan kerja dan sertifikasi profesional.',
    details: [
      'Fiber Optic Technician',
      'Wireless Network Specialist',
      'Monitoring & troubleshooting jaringan',
      'Dokumentasi & manajemen proyek'
    ],
    project: 'Proyek akhir: Desain jaringan akses terpadu'
  },
],
})

// untuk toggle expand/collapse
const expanded = reactive({})
jurusanList.forEach(j => { expanded[j] = Array(steps[j].length).fill(false) })

function toggle(jurusan, i) { expanded[jurusan][i] = !expanded[jurusan][i] }
</script>

<style scoped>
/* Animasi expand/collapse */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 240ms ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Kolom timeline */
.col-side {
  width: 45%;
}

.col-center {
  width: 10%;
}

/* Box styling */
.timeline-box {
  background: linear-gradient(135deg, #ffffff, #f0f4ff);
  border-radius: 1rem;
  padding: 2rem;
  /* sebelumnya 1.5rem */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 160px;
  /* tambahkan tinggi minimum */
}

.timeline-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

/* Judul dengan ikon */
.timeline-box h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
}

/* Summary text */
.timeline-box p {
  margin-top: 0.5rem;
  color: #4b5563;
}

/* List detail */
.timeline-box ul li {
  margin-bottom: 0.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .relative>.flex {
    flex-direction: column;
  }

  .col-side,
  .col-center {
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .col-side {
    margin-bottom: 0.75rem;
  }
}
</style>
