<template>
  <transition name="navbar-slide">
    <nav
      v-show="isVisible"
      class="fixed w-full z-50 flex items-center justify-between px-5 py-5 bg-white transition-all duration-500 ease-in-out"
      :class="{ 'shadow-lg': isScrolling }"
    >
      <!-- Logo -->
      <div class="roboto-mono text-sm flex items-center gap-3">
        <img :src="LogoSMK" alt="Logo SMK TELKOM" class="h-8" />
      </div>

      <!-- Tombol Hamburger -->
      <button
        @click="toggleMenu"
        class="lg:hidden flex flex-col justify-center items-center gap-[6px]"
      >
        <span class="block w-6 h-[2px] bg-gray-800 transition-all"></span>
        <span class="block w-6 h-[2px] bg-gray-800 transition-all"></span>
        <span class="block w-6 h-[2px] bg-gray-800 transition-all"></span>
      </button>

      <!-- Menu Utama -->
      <div
        :class="[ 
          'roboto-mono text-sm flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10 absolute lg:static top-20 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none px-5 py-4 lg:p-0 z-[1000] transition-all duration-300',
          menuOpen ? 'flex' : 'hidden lg:flex'
        ]"
      >

        <!-- BERANDA -->
        <RouterLink
          to="/"
          class="nav-link"
        >
          BERANDA
        </RouterLink>

        <!-- JELAJAH -->
        <a
          href="https://tour.smktelkom-pwt.sch.id/"
          class="nav-link"
        >
          JELAJAH
        </a>

        <!-- JURUSAN -->
        <div
          class="w-full lg:w-auto relative"
          @mouseenter="openDropdown('jurusan')"
          @mouseleave="closeDropdown"
        >
          <button
            @click="toggleDropdown('jurusan')"
            class="nav-link flex justify-between w-full lg:w-auto items-center"
          >
            <span>JURUSAN</span>
            <!-- Arrow hanya di mobile -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 ml-1 transition-transform duration-300 lg:hidden"
              :class="{ 'rotate-180 text-red-600': activeDropdown === 'jurusan' }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Dropdown muncul -->
          <transition name="fade">
            <div
              v-show="activeDropdown === 'jurusan'"
              class="absolute top-full left-0 mt-[6px] w-full lg:w-40 bg-white rounded-md shadow-xl border border-gray-200 z-[99999] overflow-visible"
            >
              <a href="/jurusan/rpl" class="dropdown-item">RPL</a>
              <a href="/jurusan/pg" class="dropdown-item">PG</a>
              <a href="/jurusan/tkj" class="dropdown-item">TKJ</a>
              <a href="/jurusan/tja" class="dropdown-item">TJA</a>
            </div>
          </transition>
        </div>

        <!-- TENTANG -->
        <div
          class="w-full lg:w-auto relative"
          @mouseenter="openDropdown('tentang')"
          @mouseleave="closeDropdown"
        >
          <button
            @click="toggleDropdown('tentang')"
            class="nav-link flex justify-between w-full lg:w-auto items-center"
          >
            <span>TENTANG</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 ml-1 transition-transform duration-300 lg:hidden"
              :class="{ 'rotate-180 text-red-600': activeDropdown === 'tentang' }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <transition name="fade">
            <div
              v-show="activeDropdown === 'tentang'"
              class="lg:absolute lg:right-0 mt-2 w-full lg:w-48 bg-white rounded-md shadow-xl border border-gray-200 z-[9999]"
            >
              <a href="/tentang/sekolah" class="dropdown-item">Tentang Sekolah</a>
              <a href="/tentang/visi-misi" class="dropdown-item">Visi & Misi</a>
              <a href="/tentang/prestasi" class="dropdown-item">Prestasi</a>
            </div>
          </transition>
        </div>

        <!-- HUBUNGI -->
        <div
          class="w-full lg:w-auto relative"
          @mouseenter="openDropdown('hubungi')"
          @mouseleave="closeDropdown"
        >
          <button
            @click="toggleDropdown('hubungi')"
            class="nav-link flex justify-between w-full lg:w-auto items-center"
          >
            <span>HUBUNGI</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 ml-1 transition-transform duration-300 lg:hidden"
              :class="{ 'rotate-180 text-red-600': activeDropdown === 'hubungi' }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <transition name="fade">
            <div
              v-show="activeDropdown === 'hubungi'"
              class="lg:absolute lg:right-0 mt-2 w-full lg:w-36 bg-white rounded-md shadow-xl border border-gray-200 z-[9999]"
            >
              <a href="/faqs" class="dropdown-item">FAQs</a>
              <a href="/pertanyaan" class="dropdown-item">Kirim Pertanyaan</a>
            </div>
          </transition>
        </div>
      </div>
    </nav>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import LogoSMK from '@/assets/images/Logo-SMK.png'

const menuOpen = ref(false)
const activeDropdown = ref(null)
const isVisible = ref(true)
const lastScrollY = ref(0)
const isScrolling = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function toggleDropdown(menu) {
  activeDropdown.value = activeDropdown.value === menu ? null : menu
}

function openDropdown(menu) {
  if (window.innerWidth >= 1024) activeDropdown.value = menu
}

function closeDropdown() {
  if (window.innerWidth >= 1024) activeDropdown.value = null
}

function handleScroll() {
  const currentY = window.scrollY
  isScrolling.value = currentY > 50
  if (currentY > lastScrollY.value && currentY > 150) isVisible.value = false
  else if (currentY < lastScrollY.value) isVisible.value = true
  lastScrollY.value = currentY
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>

/* Navbar slide anim */
.navbar-slide-enter-active,
.navbar-slide-leave-active {
  transition: all 0.4s ease;
}
.navbar-slide-enter-from,
.navbar-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Fade dropdown */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Dropdown items underline */
.dropdown-item {
  @apply block px-4 py-2 border-b border-gray-200 hover:text-red-500 relative transition-all duration-300;
}
.dropdown-item::after {
  content: "";
  position: absolute;
  bottom: 4px;
  left: 16px;
  width: 0;
  height: 2px;
  background-color: #ef4444;
  transition: width 0.3s ease;
}
.dropdown-item:hover::after {
  width: calc(100% - 32px);
}

/* Nav link underline animasi */
.nav-link {
  @apply relative py-2 border-b lg:border-none hover:text-red-600 cursor-pointer transition-all;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background-color: #ef4444;
  transition: width 0.3s ease;
}
.nav-link:hover::after {
  width: 100%;
}
</style>

<script>
export default {
  components: {
    DropdownLink: {
      props: ['href', 'label'],
      template: `
        <a :href="href" class="dropdown-item">{{ label }}</a>
      `,
    },
  },
}
</script>
