<template>
  <!-- Transisi navbar muncul/hilang -->
  <transition name="navbar-slide">
    <nav
      v-show="isVisible"
      class="fixed w-full z-[9999] flex items-center justify-between px-5 py-4 bg-white/90 backdrop-blur-md transition-all duration-500 ease-in-out"
      :class="{ 'shadow-md backdrop-blur-lg': isScrolling }"
    >
      <!-- Logo -->
      <div class="roboto-mono text-sm flex items-center gap-3 select-none">
        <img :src="LogoSMK" alt="Logo SMK TELKOM" class="h-8" />
      </div>

      <!-- Tombol Hamburger -->
      <button
        @click="toggleMenu"
        class="lg:hidden flex flex-col justify-center items-center gap-[6px] group transition-all duration-300"
      >
        <span
          class="block w-6 h-[2px] bg-gray-800 transition-all duration-300"
          :class="{ 'rotate-45 translate-y-[8px]': menuOpen }"
        ></span>
        <span
          class="block w-6 h-[2px] bg-gray-800 transition-all duration-300"
          :class="{ 'opacity-0': menuOpen }"
        ></span>
        <span
          class="block w-6 h-[2px] bg-gray-800 transition-all duration-300"
          :class="{ '-rotate-45 -translate-y-[8px]': menuOpen }"
        ></span>
      </button>

      <!-- Menu Utama -->
      <div
        :class="[
          'roboto-mono text-sm transform origin-top flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10 absolute lg:static top-20 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none px-5 py-4 lg:p-0 z-[1000] transition-all duration-300 ease-in-out',
          menuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 lg:opacity-100 lg:scale-y-100'
        ]"
      >
        <!-- BERANDA -->
        <RouterLink to="/" class="nav-link">BERANDA</RouterLink>

        <!-- JELAJAH -->
        <a href="https://tour.smktelkom-pwt.sch.id/" class="nav-link">JELAJAH</a>

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 ml-1 transition-transform duration-300 lg:hidden"
              :class="{ 'rotate-180 text-red-600': activeDropdown === 'jurusan' }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <transition name="dropdown">
            <div
              v-show="activeDropdown === 'jurusan'"
              class="absolute mt-4 left-0 w-full lg:w-20 bg-white rounded-md shadow-xl border border-gray-200 "
            >
            <div class="dropdown-item">
              <a href="/jurusan/rpl" class=" flex items-center gap-2">RPL <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ed1e28"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg></a>
              </div>
               <div class="dropdown-item">
              <a href="/jurusan/pg" class="flex items-center gap-2">PG <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ed1e28"><path d="M189-160q-60 0-102.5-43T42-307q0-9 1-18t3-18l84-336q14-54 57-87.5t98-33.5h390q55 0 98 33.5t57 87.5l84 336q2 9 3.5 18.5T919-306q0 61-43.5 103.5T771-160q-42 0-78-22t-54-60l-28-58q-5-10-15-15t-21-5H385q-11 0-21 5t-15 15l-28 58q-18 38-54 60t-78 22Zm3-80q19 0 34.5-10t23.5-27l28-57q15-31 44-48.5t63-17.5h190q34 0 63 18t45 48l28 57q8 17 23.5 27t34.5 10q28 0 48-18.5t21-46.5q0 1-2-19l-84-335q-7-27-28-44t-49-17H285q-28 0-49.5 17T208-659l-84 335q-2 6-2 18 0 28 20.5 47t49.5 19Zm348-280q17 0 28.5-11.5T580-560q0-17-11.5-28.5T540-600q-17 0-28.5 11.5T500-560q0 17 11.5 28.5T540-520Zm80-80q17 0 28.5-11.5T660-640q0-17-11.5-28.5T620-680q-17 0-28.5 11.5T580-640q0 17 11.5 28.5T620-600Zm0 160q17 0 28.5-11.5T660-480q0-17-11.5-28.5T620-520q-17 0-28.5 11.5T580-480q0 17 11.5 28.5T620-440Zm80-80q17 0 28.5-11.5T740-560q0-17-11.5-28.5T700-600q-17 0-28.5 11.5T660-560q0 17 11.5 28.5T700-520Zm-360 60q13 0 21.5-8.5T370-490v-40h40q13 0 21.5-8.5T440-560q0-13-8.5-21.5T410-590h-40v-40q0-13-8.5-21.5T340-660q-13 0-21.5 8.5T310-630v40h-40q-13 0-21.5 8.5T240-560q0 13 8.5 21.5T270-530h40v40q0 13 8.5 21.5T340-460Zm140-20Z"/></svg></a>
              </div>
              <div class="dropdown-item">
              <a href="/jurusan/tkj" class="flex items-center">TKJ <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ed1e28"><path d="M480-80q-33 0-56.5-23.5T400-160q0-21 11-39t29-29v-92H320q-33 0-56.5-23.5T240-400v-92q-18-9-29-27t-11-41q0-33 23.5-56.5T280-640q33 0 56.5 23.5T360-560q0 23-11 40t-29 28v92h120v-320h-80l120-160 120 160h-80v320h120v-80h-40v-160h160v160h-40v80q0 33-23.5 56.5T640-320H520v92q19 10 29.5 28t10.5 40q0 33-23.5 56.5T480-80Z"/></svg></a>
               </div>
              <div class="dropdown-item">
                <a href="/jurusan/tja" class="flex items-center">TJA <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ed1e28"><path d="M480-120q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM254-346l-84-86q59-59 138.5-93.5T480-560q92 0 171.5 35T790-430l-84 84q-44-44-102-69t-124-25q-66 0-124 25t-102 69ZM84-516 0-600q92-94 215-147t265-53q142 0 265 53t215 147l-84 84q-77-77-178.5-120.5T480-680q-116 0-217.5 43.5T84-516Z"/></svg></a>
              </div>
             
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

          <transition name="dropdown">
            <div
              v-show="activeDropdown === 'tentang'"
              class="lg:absolute lg:right-0 mt-2 w-full lg:w- bg-white rounded-md shadow-xl border border-gray-200 z-[9999]"
            >
              <a href="/tentang" class="dropdown-item">Tentang</a>
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
  if (currentY > lastScrollY.value && currentY > 300) isVisible.value = false
  else if (currentY < lastScrollY.value) isVisible.value = true
  lastScrollY.value = currentY
}

onMounted(() => {
  isVisible.value = true
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* Navbar muncul/hilang */
.navbar-slide-enter-active,
.navbar-slide-leave-active {
  transition: all 0.4s ease;
}
.navbar-slide-enter-from,
.navbar-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Dropdown muncul halus (fade + scale) */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s ease;
  transform-origin: top;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}

/* Link underline animasi */
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

/* Dropdown item hover anim */
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
</style>
