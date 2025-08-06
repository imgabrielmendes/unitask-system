<!-- src/components/ui/Search.vue -->
<template>
  <form @submit.prevent="onSearch" class="w-full max-w-xl">
    <div
      class="flex items-center w-full bg-white border border-gray-300 shadow-md rounded-full px-5 py-3 focus-within:ring-2 focus-within:ring-mint transition"
    >
      <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 mr-3" />
      <input
        v-model="query"
        type="text"
        placeholder="Pesquisar no Unitask..."
        class="flex-1 text-gray-800 placeholder-gray-400 outline-none bg-transparent"
      />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

const query = ref('')

const onSearch = () => {
  if (query.value.trim() !== '') {
    console.log('Buscando por:', query.value)
    
  }
}
</script>
