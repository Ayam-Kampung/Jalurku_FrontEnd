<template>
  <div class="bg-white shadow-lg rounded-2xl p-6 md:p-10 w-full max-w-4xl mx-auto text-center">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
      {{ question.question }}
    </h2>

    <div class="grid md:grid-cols-2 gap-4 mt-6">
      <button
        v-for="(option, index) in question.options"
        :key="index"
        class="p-4 border-2 border-gray-300 rounded-xl font-bold text-gray-800 hover:bg-red-500 hover:text-white transition-all duration-300"
        @click="$emit('answer', option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: Object
})
</script>
