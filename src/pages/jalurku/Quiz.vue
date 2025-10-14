<template>
  <div class="h-screen flex flex-col items-center justify-center" style="padding: 20px; max-width: 800px; margin: 0 auto;">

    <!-- Dashboard View -->
    <div v-if="currentView === 'dashboard'">
      
      <div v-if="latestJurusanId">
        <h2>Kamu sekarang cocok menjadi:</h2>
        <div :class= "`flex items-center gap-2 py-1 px-2 rounded-md text-4xl ${jurusanColor}`">
          <span v-html="jurusanIcons[latestJurusanName]" class="w-5 h-5"></span>
          {{ latestJurusanName }}
        </div>
        <p>Mantaps betul!!</p>
        <button @click="handleMulaiAngket" style="padding: 10px 20px; margin: 10px 10px 10px 0;">Mulai Angket Lagi</button>
      </div>

      <div v-if="!latestJurusanId && user">
        <h2>Sepertinya jurusan kamu masih jadi misteri :v</h2>
        <div class="px-2 rounded-md bg-gray-700 text-white text-4xl">???</div>
        <p>Gapapa kok kita bakal pandu! Duduk, tenang, dan minumlah jika kamu haus, dan biarlah sistem kami bekerja!!!</p>
        <button @click="handleMulaiAngket">Mulai Angket Baru!</button>
      </div>

      <div v-if="!user">
        <button @click="handleMulaiAngket" style="padding: 10px 20px; margin: 10px 10px 10px 0;">Mulai Angket Baru! (sebagai tamu)</button>
      </div>

      <!-- <div v-if="user?.HasilAngket && user.HasilAngket.length > 0" style="margin-top: 20px;">
        <h3>Riwayat Angket:</h3>
        <ul>
          <li v-for="hasil in user.HasilAngket" :key="hasil.id" style="margin: 5px 0;">
            Jurusan ID: {{ hasil.jurusan_id }} - {{ formatDate(hasil.CreatedAt) }}
          </li>
        </ul>
      </div> -->
    </div>

    <!-- Angket View -->
    <div v-if="currentView === 'angket' && currentQuestion">
      <h2>Angket Jurusan</h2>
      <p>Pertanyaan {{ currentQuestionIndex + 1 }} dari {{ pertanyaan.length }}</p>
      <div style="background: #f0f0f0; height: 20px; margin: 10px 0;">
        <div style="background: #4CAF50; height: 20px;" :style="{ width: progress + '%' }"></div>
      </div>
      
      <div style="margin: 20px 0; padding: 20px; border: 1px solid #ddd;">
        <h3>{{ currentQuestion.text }}</h3>
        <p v-if="currentQuestion.image">
          <img :src="currentQuestion.image" class="max-h-50" alt="Image" srcset="">
        </p>
        <p>Meta: {{ currentQuestion.meta }}</p>
        <p>Jurusan: {{ currentQuestion.Jurusan.name }}</p>
        
        <div style="margin: 20px 0;">
          <p><strong>Pilih tingkat persetujuan (1-5):</strong></p>
          <div v-for="n in 5" :key="n" style="margin: 10px 0;">
            <label>
              <input type="radio" :value="n" v-model="selectedOption" name="likert">
              {{ n }} - {{ getLikertLabel(n) }}
            </label>
          </div>
        </div>
      </div>
      
      <button @click="handleSubmitJawaban" style="padding: 10px 20px;">
        {{ currentQuestionIndex < pertanyaan.length - 1 ? 'Lanjut' : 'Selesai' }}
      </button>
    </div>

    <!-- Hasil View -->
    <div v-if="currentView === 'hasil' && hasilAngket">
      <h2>Hasil Angket</h2>
      <div style="padding: 20px; border: 2px solid #4CAF50; margin: 20px 0;">
        <h3>Jurusan Terbaik untuk Anda:</h3>
        <h2 style="color: #4CAF50;">{{ hasilAngket.jurusan_terbaik }}</h2>
        <p>Total Skor: {{ hasilAngket.total_skor }}</p>
      </div>
      
      <h3>Detail Skor per Jurusan:</h3>
      <ul>
        <li v-for="(skor, jurusanId) in hasilAngket.detail_skor" :key="jurusanId" style="margin: 5px 0;">
          Jurusan ID {{ jurusanId }}: {{ skor }} poin
        </li>
      </ul>
      
      <button @click="handleKembaliDashboard" style="padding: 10px 20px; margin-top: 20px;">
        {{ user ? 'Kembali ke Dashboard' : 'Kembali ke Login' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { authAPI, angketAPI, jurusanAPI } from '@/services/api';
import { storage } from '@/utils/storage';
import { getLikertLabel, formatDate } from '@/utils/helpers';

const currentView = ref('dashboard');
const jurusan = ref([]);
const latestJurusanName = ref('')
const user = ref(null);
const token = ref(storage.getToken());
const sessionId = ref('');
const pertanyaan = ref([]);
const currentQuestionIndex = ref(0);
const selectedOption = ref(null);
const hasilAngket = ref(null);

const loginForm = ref({ identity: '', password: '' });
const registerForm = ref({ username: '', email: '', password: '' });

const currentQuestion = computed(() => {
  return pertanyaan.value[currentQuestionIndex.value] || null;
});

const progress = computed(() => {
  if (pertanyaan.value.length === 0) return 0;
  return ((currentQuestionIndex.value / pertanyaan.value.length) * 100).toFixed(0);
});

const fetchUserInfo = async () => {
  try {
    const data = await authAPI.getUserInfo(token.value);
    if (data.status === 'success') {
      user.value = data.data;
    }
  } catch (err) {
    console.error('Error fetching user info:', err);
  }
};

// Angket Handlers
const handleMulaiAngket = async () => {
  try {
    const sessionData = await angketAPI.start();
    sessionId.value = sessionData.session_id;
    
    const pertanyaanData = await angketAPI.getRand();
    pertanyaan.value = pertanyaanData.data;
    currentQuestionIndex.value = 0;
    selectedOption.value = null;
    currentView.value = 'angket';
  } catch (err) {
    alert('Error memulai angket: ' + err.message);
  }
};

const handleSubmitJawaban = async () => {
  if (selectedOption.value === null) {
    alert('Pilih jawaban terlebih dahulu!');
    return;
  }

  try {
    await angketAPI.submit({
      session_id: sessionId.value,
      question_id: currentQuestion.value.id,
      selected_option: selectedOption.value
    });

    if (currentQuestionIndex.value < pertanyaan.value.length - 1) {
      currentQuestionIndex.value++;
      selectedOption.value = null;
    } else {
      await handleSelesaiAngket();
    }
  } catch (err) {
    alert('Error submit jawaban: ' + err.message);
  }
};

const handleSelesaiAngket = async () => {
  try {
    const data = await angketAPI.finish(sessionId.value);
    hasilAngket.value = data.hasil;
    currentView.value = 'hasil';
    
    if (token.value) {
      await fetchUserInfo();
    }
  } catch (err) {
    alert('Error menyelesaikan angket: ' + err.message);
  }
};

const handleKembaliDashboard = () => {
  currentView.value = user.value ? 'dashboard' : 'login';
  hasilAngket.value = null;
  pertanyaan.value = [];
  sessionId.value = '';
};



const latestJurusanId = computed(() => {
  if (user.value?.HasilAngket && user.value.HasilAngket.length > 0) {
    return user.value.HasilAngket[0].jurusan_id;
  }
  return null;
});

const jurusanColor = computed(() => {
  const name = latestJurusanName.value
  return jurusanColors[name] || 'bg-gray-300 text-black'
})

const jurusanIcon = computed(() => jurusanIcons[latestJurusanName.value] || '❓')

const jurusanColors = {
  PG: 'bg-red-500 text-white',     // misal PG warna merah
  RPL: 'bg-blue-500 text-white',   // RPL biru
  TKJ: 'bg-green-500 text-white',  // TKJ hijau
  TJA: 'bg-yellow-500 text-black', // TJA kuning
}

const jurusanIcons = {
  PG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#FFFFFF" >
          <path
            d="M189-160q-60 0-102.5-43T42-307q0-9 1-18t3-18l84-336q14-54 57-87.5t98-33.5h390q55 0 98 33.5t57 87.5l84 336q2 9 3.5 18.5T919-306q0 61-43.5 103.5T771-160q-42 0-78-22t-54-60l-28-58q-5-10-15-15t-21-5H385q-11 0-21 5t-15 15l-28 58q-18 38-54 60t-78 22Zm3-80q19 0 34.5-10t23.5-27l28-57q15-31 44-48.5t63-17.5h190q34 0 63 18t45 48l28 57q8 17 23.5 27t34.5 10q28 0 48-18.5t21-46.5q0 1-2-19l-84-335q-7-27-28-44t-49-17H285q-28 0-49.5 17T208-659l-84 335q-2 6-2 18 0 28 20.5 47t49.5 19Zm348-280q17 0 28.5-11.5T580-560q0-17-11.5-28.5T540-600q-17 0-28.5 11.5T500-560q0 17 11.5 28.5T540-520Zm80-80q17 0 28.5-11.5T660-640q0-17-11.5-28.5T620-680q-17 0-28.5 11.5T580-640q0 17 11.5 28.5T620-600Zm0 160q17 0 28.5-11.5T660-480q0-17-11.5-28.5T620-520q-17 0-28.5 11.5T580-480q0 17 11.5 28.5T620-440Zm80-80q17 0 28.5-11.5T740-560q0-17-11.5-28.5T700-600q-17 0-28.5 11.5T660-560q0 17 11.5 28.5T700-520Zm-360 60q13 0 21.5-8.5T370-490v-40h40q13 0 21.5-8.5T440-560q0-13-8.5-21.5T410-590h-40v-40q0-13-8.5-21.5T340-660q-13 0-21.5 8.5T310-630v40h-40q-13 0-21.5 8.5T240-560q0 13 8.5 21.5T270-530h40v40q0 13 8.5 21.5T340-460Zm140-20Z" />
        </svg>`,
  RPL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#FFFFFF">
          <path
            d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
        </svg>`,
  TKJ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#FFFFFF">
          <path
            d="M480-80q-33 0-56.5-23.5T400-160q0-21 11-39t29-29v-92H320q-33 0-56.5-23.5T240-400v-92q-18-9-29-27t-11-41q0-33 23.5-56.5T280-640q33 0 56.5 23.5T360-560q0 23-11 40t-29 28v92h120v-320h-80l120-160 120 160h-80v320h120v-80h-40v-160h160v160h-40v80q0 33-23.5 56.5T640-320H520v92q19 10 29.5 28t10.5 40q0 33-23.5 56.5T480-80Z" />
        </svg>`,
  TJA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000">
          <path
            d="M480-120q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM254-346l-84-86q59-59 138.5-93.5T480-560q92 0 171.5 35T790-430l-84 84q-44-44-102-69t-124-25q-66 0-124 25t-102 69ZM84-516 0-600q92-94 215-147t265-53q142 0 265 53t215 147l-84 84q-77-77-178.5-120.5T480-680q-116 0-217.5 43.5T84-516Z" />
        </svg>`,
}

const handleLogout = () => {
  token.value = '';
  user.value = null;
  storage.removeToken();
  currentView.value = 'login';
};

const fetchJurusan = async () => {
  try {
    const response = await jurusanAPI.getAll()
    if (response.status === 'success') {
      jurusan.value = response.data
      console.log('✅ jurusan.value:', jurusan.value)
      updateJurusanName()
    }
  } catch (err) {
    console.error('jurusan:', err.message)
  }
}

const updateJurusanName = () => {
  if (!jurusan.value.length || !latestJurusanId.value) return

  const found = jurusan.value.find(j => j.id === Number(latestJurusanId.value))
  if (found) {
    latestJurusanName.value = found.name
    console.log('🎯 Jurusan ditemukan:', latestJurusanName.value)
  } else {
    console.warn('⚠️ Jurusan dengan ID', latestJurusanId.value, 'tidak ditemukan')
  }
}

onMounted(() => {
  if (token.value) {
    fetchUserInfo();
    fetchJurusan();
    currentView.value = 'dashboard';
  }
});

watch([user, latestJurusanId], () => {
  console.log('👤 User atau jurusan ID berubah:', latestJurusanId.value)
  updateJurusanName()
}, { deep: true })
</script>