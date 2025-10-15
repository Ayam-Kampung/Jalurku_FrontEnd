<template>
    <section class="pt-10 space-y-8">
        <div class="flex flex-col md:flex-row-reverse mt-10 w-full">
            <div class="w-full md:w-1/3 h-60  bg-contain bg-no-repeat bg-center transition-all duration-500 "
                :style="{ backgroundImage: `url(${ayamKampung})` }"></div>

            <div class="p-10 md:w-2/3">
                <h2 class="text-4xl font-bold text-red-600 mb-4">Tim Ayam Kampung</h2>
                <p class="text-gray-800 leading-relaxed mb-2 md:text-lg">
                    kami, <b>Tim Ayam Kampung</b>, punya misi sederhana yaitu membantu teman-teman di luar sana yang
                    masih
                    bingung memilih jurusan dan arah masa depan.
                </p>
                <p class="text-gray-800 leading-relaxed mb-2 md:text-lg">
                    Lewat website ini, kami membuat proses mengenal jurusan tersa menyenangkan, penuh warna, dan tidak
                    membingungkan lagi.
                </p>
            </div>
        </div>
        <h2 class="text-2xl md:text-3xl font-semibold mb-4 p-3 text-center">
            "karena masa depan yang cerah <br>dimulai dari langkah
            kecil yang tepat"
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div class="bg-white p-6 rounded-2xl shadow">
                <div class="mt-10 w-full h-60 bg-contain bg-no-repeat bg-center transition-all duration-500 mb-5"
                    :style="{ backgroundImage: `url(${orang1})` }"></div>

                <h3 class="font-bold text-xl text-red-600 mb-2">DevOps</h3>
                <p>Mengelola alur kerja pengembangan, deployment, dan server agar sistem tetap stabil.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow">
                <div class="mt-10 w-full h-60 bg-contain bg-no-repeat bg-center transition-all duration-500 mb-5"
                    :style="{ backgroundImage: `url(${orang2})` }"></div>
                <h3 class="font-bold text-xl text-red-600 mb-2">Copywriting</h3>
                <p>Menulis narasi, deskripsi jurusan, dan konten promosi yang menarik dan bermakna.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow">
                <div class="mt-10 w-full h-60 bg-contain bg-no-repeat bg-center transition-all duration-500 mb-5"
                    :style="{ backgroundImage: `url(${orang3})` }"></div>
                <h3 class="font-bold text-xl text-red-600 mb-2">System Administrator</h3>
                <p>Mengatur server dan jaringan agar website selalu aman, cepat, dan efisien.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow">
                <div class="mt-10 w-full h-60 bg-contain bg-no-repeat bg-center transition-all duration-500 mb-5"
                    :style="{ backgroundImage: `url(${orang4})` }"></div>
                <h3 class="font-bold text-xl text-red-600 mb-2">Digital Business</h3>
                <p>Mengelola arah branding dan strategi digital agar proyek bernilai dan berkelanjutan.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow">
                <div class="mt-10 w-full h-60 bg-contain bg-no-repeat bg-center transition-all duration-500 mb-5"
                    :style="{ backgroundImage: `url(${orang5})` }"></div>
                <h3 class="font-bold text-xl text-red-600 mb-2">UI / UX Designer</h3>
                <p>Mendesain pengalaman pengguna yang menarik, sederhana, dan nyaman digunakan.</p>
            </div>
        </div>

    </section>
</template>

<script setup>
import ayamKampung from '@/assets/images/ayamkampung.png'
import orang1 from '@/assets/images/alumni_1.png'
import orang2 from '@/assets/images/copy.png'
import orang3 from '@/assets/images/admin.png'
import orang4 from '@/assets/images/alumni_2.png'
import orang5 from '@/assets/images/uiux.png'
</script>