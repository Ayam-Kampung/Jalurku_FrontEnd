<template>
  <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <h1>Jalurku - Angket Jurusan</h1>
    
    <!-- Login View -->
    <div v-if="currentView === 'login'">
      <h2>Login</h2>
      <div>
        <input v-model="loginForm.identity" placeholder="Email atau Username" style="display: block; margin: 10px 0; padding: 8px; width: 100%;">
        <input v-model="loginForm.password" type="password" placeholder="Password" style="display: block; margin: 10px 0; padding: 8px; width: 100%;">
        <button @click="handleLogin" style="padding: 10px 20px; margin: 10px 10px 10px 0;">Login</button>
        <button @click="currentView = 'register'" style="padding: 10px 20px;">Register</button>
        <button @click="handleMulaiAngket" style="padding: 10px 20px; margin-left: 10px;">Mulai Angket (Guest)</button>
      </div>
    </div>

    <!-- Register View -->
    <div v-if="currentView === 'register'">
      <h2>Register</h2>
      <div>
        <input v-model="registerForm.username" placeholder="Username" style="display: block; margin: 10px 0; padding: 8px; width: 100%;">
        <input v-model="registerForm.email" placeholder="Email" style="display: block; margin: 10px 0; padding: 8px; width: 100%;">
        <input v-model="registerForm.password" type="password" placeholder="Password" style="display: block; margin: 10px 0; padding: 8px; width: 100%;">
        <button @click="handleRegister" style="padding: 10px 20px; margin: 10px 10px 10px 0;">Register</button>
        <button @click="currentView = 'login'" style="padding: 10px 20px;">Kembali ke Login</button>
      </div>
    </div>

    <!-- Dashboard View -->
    <div v-if="currentView === 'dashboard'">
      <h2>Dashboard</h2>
      <p>Selamat datang, {{ user?.Name || user?.username }}!</p>
      <p>Email: {{ user?.Email || user?.email }}</p>
      <button @click="handleMulaiAngket" style="padding: 10px 20px; margin: 10px 10px 10px 0;">Mulai Angket Baru</button>
      <button @click="handleLogout" style="padding: 10px 20px;">Logout</button>
      
      <div v-if="user?.HasilAngket && user.HasilAngket.length > 0" style="margin-top: 20px;">
        <h3>Riwayat Angket:</h3>
        <ul>
          <li v-for="hasil in user.HasilAngket" :key="hasil.id" style="margin: 5px 0;">
            Jurusan ID: {{ hasil.jurusan_id }} - {{ formatDate(hasil.CreatedAt) }}
          </li>
        </ul>
      </div>
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
        <p v-if="currentQuestion.image">Gambar: {{ currentQuestion.image }}</p>
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
import { ref, computed, onMounted } from 'vue';
import { authAPI, angketAPI } from '@/services/api';
import { storage } from '@/utils/storage';
import { getLikertLabel, formatDate } from '@/utils/helpers';

const currentView = ref('login');
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

// Auth Handlers
const handleRegister = async () => {
  try {
    const data = await authAPI.register(registerForm.value);
    if (data.status === 'success') {
      alert('Registrasi berhasil! Silakan login.');
      currentView.value = 'login';
    } else {
      alert('Registrasi gagal: ' + data.message);
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
};

const handleLogin = async () => {
  try {
    const data = await authAPI.login(loginForm.value);
    if (data.status === 'success') {
      token.value = data.data.token;
      user.value = data.data.user;
      storage.setToken(data.data.token);
      currentView.value = 'dashboard';
    } else {
      alert('Login gagal: ' + data.message);
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
};

const handleLogout = () => {
  token.value = '';
  user.value = null;
  storage.removeToken();
  currentView.value = 'login';
};

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

onMounted(() => {
  if (token.value) {
    fetchUserInfo();
    currentView.value = 'dashboard';
  }
});
</script>