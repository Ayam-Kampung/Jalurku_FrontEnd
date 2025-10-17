<template>
  <div class="h-screen flex flex-col items-center justify-center">

    <!-- Dashboard View -->
    <div data-aos="flip-up" data-aos-duration="500" v-if="currentView === 'dashboard'" class="flex flex-col items-center justify-center min-h-screen lg:w-full max-w-4xl">

      <!-- Hasil Jurusan -->
      <div v-if="latestJurusanId"
        class="p-8 text-center w-full transition-all duration-500">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          Kamu sudah cocok jadi ↓
        </h2>

          <div>
            <!-- Gambar jurusan -->
            <img :src="jurusanImages[latestJurusanName]" :alt="`Gambar jurusan ${latestJurusanName}`"
              class="w-full h-60 object-cover mx-auto rounded-t-lg shadow-md transition-transform duration-500 " />
            <!-- Nama jurusan + ikon -->
            <div
              :class="`flex justify-center items-center gap-3 py-3 px-4 rounded-b-lg text-5xl font-bold shadow-lg ${jurusanColor}`">
              <span v-html="jurusanIcons[latestJurusanName]" class="w-16 h-16"></span>
              {{ latestJurusanName }}
            </div>
          </div>

        <p class="mt-4 text-base text-gray-600 italic">
          Tapi... <br> jangan pikir ini sebagai acuan ya adik-adik ^_^
        </p>

        <div class="grid lg:flex gap-2 justify-center">
          <router-link to="/rencanaku"
            class="mt-8 bg-red-600 flex items-center gap-2 hover:bg-red-700 text-white px-3 py-2 rounded-md font-medium transition inline-block text-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            Ketahui JurusanMu
          </router-link>
          <button @click="handleMulaiAngket"
            class="mt-8 border-red-600 flex items-center gap-2 hover:bg-red-100 text-red-600 px-3 py-2 rounded-md font-medium transition">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e7000b"><path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z"/></svg>
            Mulai Angket Lagi
          </button>

        </div>
      </div>

      <!-- Belum ada hasil -->
      <div v-else-if="!latestJurusanId && user" class="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <img
          src="https://images.unsplash.com/photo-1629001528534-e8a48b636ded?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742"
          alt="Ketahui Jurusanmu"
          class="w-60 h-40 object-cover hover:scale-105 transition-transform duration-500 mx-auto my-5 rounded-xl"
          data-aos="fade-down" data-aos-delay="300" />
        <h2 class="text-xl font-semibold text-gray-700 mb-3" data-aos="fade-down" data-aos-delay="600">
          Sepertinya jurusan kamu masih jadi misteri ¯\_(ツ)_/¯
        </h2>
        <div
          class="px-4 py-2 bg-gray-800 text-white text-4xl rounded-xl inline-block mb-4 hover:scale-105  transition-transform duration-500"
          data-aos="zoom-in" data-aos-delay="1100">
          ???</div>
        <p class="text-gray-600" data-aos="fade-up" data-aos-delay="1200">Gapapa kok! Duduk santai dulu, minum air, dan
          biarkan sistem kami bekerja~</p>
        <button @click="handleMulaiAngket"
          class="mt-6 bg-green-600 hover:bg-green-700 hover:scale-105 text-white px-5 py-2 font-medium transition"
          data-aos="zoom-in" data-aos-delay="1900">
          Mulai Angket Baru
        </button>
      </div>

      <!-- Mode Tamu -->
      <div v-else-if="!user" class="grid justify-center p-8 text-center max-w-md w-full">
        <button @click="handleMulaiAngket"
          class="bg-indigo-600 flex justify-center items-center gap-2 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M312-240q-51 0-97.5-18T131-311q-48-45-69.5-106.5T40-545q0-78 38-126.5T189-720q14 0 26.5 2.5T241-710l239 89 239-89q13-5 25.5-7.5T771-720q73 0 111 48.5T920-545q0 66-21.5 127.5T829-311q-37 35-83.5 53T648-240q-66 0-112-30l-46-30h-20l-46 30q-46 30-112 30Zm0-80q37 0 69-17.5t59-42.5h80q27 25 59 42.5t69 17.5q36 0 69.5-12.5T777-371q34-34 48.5-80t14.5-94q0-41-17-68.5T769-640q-3 0-22 4L480-536 213-636q-5-2-10.5-3t-11.5-1q-37 0-54 27t-17 68q0 49 14.5 95t49.5 80q26 25 59 37.5t69 12.5Zm49-60q37 0 58-16.5t21-45.5q0-49-64.5-93.5T239-580q-37 0-58 16.5T160-518q0 49 64.5 93.5T361-380Zm-6-60q-38 0-82.5-25T220-516q5-2 11.5-3.5T245-521q38 0 82.5 25.5T380-444q-5 2-11.5 3t-13.5 1Zm244 61q72 0 136.5-45t64.5-94q0-29-20.5-46T721-581q-72 0-136.5 45T520-442q0 29 21 46t58 17Zm6-61q-7 0-13-1t-11-3q8-26 52.5-51t82.5-25q7 0 13 1t11 3q-8 26-52.5 51T605-440Zm-125-40Z"/></svg>
          Mulai Angket (sebagai tamu)
        </button>
        <p class="my-5 text-sm text-gray-400">Data hasil angket tidak akan tersimpan di pangkalan data Ayam Kampung®. Tetapi data akan sementara di proses di sistem kami.</p>
      </div>
    </div>

    <!-- Angket View -->
    <div data-aos="fade-up" data-aos-easing="ease-out-expo" data-aos-duration="600" v-if="currentView === 'angket' && currentQuestion" class="w-full justify-center max-w-2xl lg:max-w-4xl h-screen mt-20 lg:mt-24 px-5">
      <p class="font-mono">{{ currentQuestionIndex + 1 }} dari {{ pertanyaan.length }}</p>
      <div style="background: #f0f0f0; height: 5px; margin: 10px 0;"
        class="hover:scale-105 transition-all duration-300">
        <div style="background: #4CAF50; height: 5px;" :style="{ width: progress + '%' }"
          class="transition-all duration-1000 "></div>
      </div>
        <div :key="currentQuestionIndex" data-aos-easing="ease-out-expo" data-aos="fade-left" data-aos-duration="400" class="my-5">
          <p v-if="currentQuestion.image">
            <img fetchpriority="high" :src="currentQuestion.image" class="h-48 p-5 mx-auto hover:scale-105 transition-all duration-100"
              alt="Image" srcset="">
          </p>
          <h3 class="text-lg lg:text-2xl text-center font-bold p-2">{{ currentQuestion.text }}</h3>
          <div class="mx-auto max-w-xl">

            <p class="flex items-center gap-2 text-gray-500 mt-5 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M473-80q-24 0-46-9t-39-26L184-320l30-31q16-16 37.5-21.5t42.5.5l66 19v-327q0-17 11.5-28.5T400-720q17 0 28.5 11.5T440-680v433l-97-27 102 102q5 5 12.5 8.5T473-160h167q33 0 56.5-23.5T720-240v-160q0-17 11.5-28.5T760-440q17 0 28.5 11.5T800-400v160q0 66-47 113T640-80H473Zm7-280v-160q0-17 11.5-28.5T520-560q17 0 28.5 11.5T560-520v160h-80Zm120 0v-120q0-17 11.5-28.5T640-520q17 0 28.5 11.5T680-480v120h-80Zm-20 80Zm300-400H680v-60h116q-66-58-147-89t-169-31q-88 0-169 31t-147 89h116v60H80v-200h60v81q72-59 159-90t181-31q94 0 181 31t159 90v-81h60v200Z"/></svg>
              <p class="text-sm">Geser tingkat persetujuan (1-5):</p>
            </p>

            <div class="flex items-center gap-5">
              <svg class="translate-y-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ab0c0c"><path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z"/></svg>
              <div class="flex flex-col items-center w-full mt-2 mb-5">
                <label class="text-sm mb-2">
                  {{ selectedOption }} - {{ getLikertLabel(selectedOption) }}
                </label>
                <input type="range" v-model.number="selectedOption" min="1" max="5" step="1"
                  class="w-full accent-red-600 cursor-pointer" />
                <div class="flex justify-between w-full mt-1 text-sm text-gray-600 font-bold ">
                  <span v-for="n in 5" :key="n">{{ n }}</span>
                </div>
              </div>
              <svg class="translate-y-1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1cab0c"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/></svg>
            </div>

          </div>

        </div>

      <button @click="handleSubmitJawaban"
        :disabled="isSubmitting || isInitialLoading"
        :class="{ 'opacity-50 cursor-not-allowed': isSubmitting || isInitialLoading }"
        class="mx-auto rounded-md bg-red-600 text-white flex items-center justify-center gap-2 p-3 shadow-md hover:shadow-xl mt-16 lg:mt-2 hover:bg-red-700 active:bg-gray-100 active:shadow-sm transition w-60">
        {{ currentQuestionIndex < pertanyaan.length - 1 ? 'Lanjut' : 'Selesai' }} 
        <svg v-if="currentQuestionIndex < pertanyaan.length - 1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Zm80-240Zm0 90 136-90-136-90v180Z"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M360-720h80v-80h-80v80Zm160 0v-80h80v80h-80ZM360-400v-80h80v80h-80Zm320-160v-80h80v80h-80Zm0 160v-80h80v80h-80Zm-160 0v-80h80v80h-80Zm160-320v-80h80v80h-80Zm-240 80v-80h80v80h-80ZM200-160v-640h80v80h80v80h-80v80h80v80h-80v320h-80Zm400-320v-80h80v80h-80Zm-160 0v-80h80v80h-80Zm-80-80v-80h80v80h-80Zm160 0v-80h80v80h-80Zm80-80v-80h80v80h-80Z"/></svg>
      </button>
    </div>

    <!-- Hasil View -->
    <div data-aos="flip-up" data-aos-duration="500" v-if="currentView === 'hasil' && hasilAngket"
      :class="`flex flex-col items-center justify-center min-h-screen lg:w-full p-6`">
      <!-- Kartu Utama -->
      <div
        class="p-8 w-full max-w-lg text-center transition-all duration-500">
        <div :class="`rounded-xl p-5 mb-6  ${jurusanColor}`">
          <h3 :class="`text-lg font-semibold mb-2`">
            Jurusan yang sesuai untuk Anda:
          </h3>
          <div class="flex items-center justify-center gap-5">
            <span v-if="user" v-html="jurusanIcons[latestJurusanName]" class="w-16 h-16"></span>
            <h2 :class="`text-4xl font-bold mb-1`">
              {{ hasilAngket.jurusan_terbaik }}
            </h2>
          </div>
          <p class="text-sm">
            Total Skor: <span class="font-medium">{{ hasilAngket.total_skor }}</span>
          </p>
        </div>

        <p class="mt-4 text-base text-gray-600 italic">
          Tapi... <br> jangan pikir ini sebagai acuan ya adik-adik ^_^
        </p>
        
        <button @click="handleKembaliDashboard"
          class="bg-red-600 mt-5 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md shadow-md transition-transform">
          {{ user ? 'Kembali ke Dashboard' : 'Kembali ke Dashboard' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { authAPI, angketAPI, jurusanAPI } from '@/services/api';
import { storage } from '@/utils/storage';
import { getLikertLabel, formatDate } from '@/utils/helpers';
import AOS from 'aos'
import 'aos/dist/aos.css'
import tkjImg from '@/assets/images/tkj_images.jpg'
import rplImg from '@/assets/images/rpl_images.jpg'
import tjaImg from '@/assets/images/tja_images.jpg'
import pgImg from '@/assets/images/pg_images.jpg'

onMounted(() => {
  AOS.init({
    duration: 800,
    offset: 100,
  })

  // Restore session jika ada
  restoreAngketSession();
})

// Cleanup saat component unmount
onBeforeUnmount(() => {
  // Simpan state jika sedang mengerjakan angket
  if (currentView.value === 'angket' && sessionId.value) {
    saveAngketState();
  }
})

const jurusanImages = {
  TKJ: tkjImg,
  RPL: rplImg,
  TJA: tjaImg,
  PG: pgImg,
}

const currentView = ref('dashboard');
const jurusan = ref([]);
const latestJurusanName = ref('')
const user = ref(null);
const token = ref(storage.getToken());
const sessionId = ref('');
const pertanyaan = ref([]);
const currentQuestionIndex = ref(0);
const selectedOption = ref(3);
const hasilAngket = ref(null);
const isSubmitting = ref(false);
const isInitialLoading = ref(false);

const currentQuestion = computed(() => {
  return pertanyaan.value[currentQuestionIndex.value] || null;
});

const progress = computed(() => {
  if (pertanyaan.value.length === 0) return 0;
  return ((currentQuestionIndex.value / pertanyaan.value.length) * 100).toFixed(0);
});

// 🆕 Fungsi untuk menyimpan state angket
const saveAngketState = () => {
  if (sessionId.value && pertanyaan.value.length > 0) {
    storage.setAngketState({
      sessionId: sessionId.value,
      pertanyaan: pertanyaan.value,
      currentQuestionIndex: currentQuestionIndex.value,
      timestamp: Date.now()
    });
    storage.setSessionId(sessionId.value);
  }
};

// 🆕 Fungsi untuk menyimpan hasil angket
const saveHasilAngket = (hasil) => {
  if (hasil) {
    localStorage.setItem('hasil_angket', JSON.stringify({
      hasil: hasil,
      timestamp: Date.now()
    }));
  }
};

// 🆕 Fungsi untuk mengambil hasil angket
const getHasilAngket = () => {
  const saved = localStorage.getItem('hasil_angket');
  if (saved) {
    const data = JSON.parse(saved);
    // Hasil hanya valid selama 5 menit (untuk review)
    const fiveMinutes = 5 * 60 * 1000;
    if (Date.now() - data.timestamp < fiveMinutes) {
      return data.hasil;
    } else {
      localStorage.removeItem('hasil_angket');
    }
  }
  return null;
};

// 🆕 Fungsi untuk hapus hasil angket
const clearHasilAngket = () => {
  localStorage.removeItem('hasil_angket');
};

// 🆕 Fungsi untuk restore session saat refresh
const restoreAngketSession = async () => {
  const savedSessionId = storage.getSessionId();
  const savedState = storage.getAngketState();
  const savedHasil = getHasilAngket();

  // Cek apakah ada hasil angket yang tersimpan
  if (savedHasil) {
    hasilAngket.value = savedHasil;
    currentView.value = 'hasil';
    console.log('✅ Hasil angket dipulihkan');
  }
  // Cek apakah ada session yang tersimpan dan belum expired (< 1 jam)
  else if (savedSessionId && savedState) {
    const oneHour = 60 * 60 * 1000; // 1 jam dalam milidetik
    const isExpired = Date.now() - savedState.timestamp > oneHour;

    if (!isExpired) {
      // Restore state
      sessionId.value = savedState.sessionId;
      pertanyaan.value = savedState.pertanyaan;
      currentQuestionIndex.value = savedState.currentQuestionIndex;
      selectedOption.value = 3;
      currentView.value = 'angket';

      console.log('✅ Sesi angket dipulihkan:', savedSessionId);
    } else {
      // Hapus session yang sudah expired
      clearAngketSession();
      console.log('⏰ Sesi angket sudah kadaluarsa');
    }
  }

  // Load user info jika sudah login
  if (token.value) {
    await fetchUserInfo();
    await fetchJurusan();
    if (currentView.value !== 'angket' && currentView.value !== 'hasil') {
      currentView.value = 'dashboard';
    }
  }
};

// 🆕 Fungsi untuk clear session
const clearAngketSession = () => {
  storage.removeSessionId();
  storage.removeAngketState();
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
    // Hapus session lama jika ada
    clearAngketSession();

    const sessionData = await angketAPI.start();
    sessionId.value = sessionData.session_id;

    // Simpan session ID
    storage.setSessionId(sessionId.value);

    const pertanyaanData = await angketAPI.getRand();
    pertanyaan.value = pertanyaanData.data;
    currentQuestionIndex.value = 0;
    selectedOption.value = 3;
    currentView.value = 'angket';

    // Simpan state awal
    saveAngketState();

    isInitialLoading.value = true;
    setTimeout(() => {
      isInitialLoading.value = false;
    }, 1350);
  } catch (err) {
    alert('Error memulai angket: ' + err.message);
  }
};

const handleSubmitJawaban = async () => {
  
  if (selectedOption.value === null) {
    alert('Pilih jawaban terlebih dahulu!');
    return;
  }

  // Cek apakah sedang proses submit
  if (isSubmitting.value) {
    return;
  }

  console.log(selectedOption.value)

  try {
    isSubmitting.value = true; // Set flag sebelum submit

    await angketAPI.submit({
      session_id: sessionId.value,
      question_id: currentQuestion.value.id,
      selected_option: selectedOption.value
    });

    if (currentQuestionIndex.value < pertanyaan.value.length - 1) {
      currentQuestionIndex.value++;
      selectedOption.value = 3;

      // Simpan progress
      saveAngketState();

      setTimeout(() => {
        AOS.refresh();
      }, 50);
    } else {
      await handleSelesaiAngket();
    }

    // Delay 2 detik sebelum bisa submit lagi
    await new Promise(resolve => setTimeout(resolve, 1350));

  } catch (err) {
    alert('Error submit jawaban: ' + err.message);
  } finally {
    isSubmitting.value = false; // Reset flag setelah selesai
  }
};

const handleSelesaiAngket = async () => {
  try {
    const data = await angketAPI.finish(sessionId.value);
    hasilAngket.value = data.hasil;
    currentView.value = 'hasil';

    // Simpan hasil angket (untuk review sementara)
    saveHasilAngket(data.hasil);

    // Hapus session setelah selesai
    clearAngketSession();

    if (token.value) {
      await fetchUserInfo();
      // Update nama jurusan setelah fetch user info
      await fetchJurusan();
      updateJurusanName();
      window.dispatchEvent(new Event('user-updated'));
    }

    setTimeout(() => {
      AOS.refresh();
    }, 50);

  } catch (err) {
    alert('Error menyelesaikan angket: ' + err.message);
  }
};

const handleKembaliDashboard = () => {
  currentView.value = user.value ? 'dashboard' : 'dashboard';
  hasilAngket.value = null;
  pertanyaan.value = [];
  sessionId.value = '';

  // Hapus session dan hasil
  clearAngketSession();
  clearHasilAngket();
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
  PG: 'bg-blue-500 text-white',
  RPL: 'bg-green-500 text-white',
  TKJ: 'bg-red-600 text-white',
  TJA: 'bg-yellow-500 text-black',
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
  clearAngketSession();
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

// Watch untuk auto-save state
watch([currentQuestionIndex, sessionId], () => {
  if (currentView.value === 'angket' && sessionId.value) {
    saveAngketState();
  }
}, { deep: true })

watch([user, latestJurusanId], () => {
  console.log('👤 User atau jurusan ID berubah:', latestJurusanId.value)
  updateJurusanName()
}, { deep: true })
</script>