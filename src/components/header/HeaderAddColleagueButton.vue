<template>
  <button
    class="flex items-center gap-2 bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg hover:from-teal-500 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
    @click="$emit('click')"
  >
    <i class="fa-solid fa-user-plus text-lg"></i>
    <!-- <span class="hidden sm:inline">Adicione um colega</span> -->
  </button>
</template>

<script setup>
// Nenhuma lógica extra
</script>
