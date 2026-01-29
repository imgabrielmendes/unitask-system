<template>
  <div class="flex items-center bg-[var(--gray-850)] border border-[var(--gray-700)] rounded-xl p-5 shadow hover:shadow-lg transition min-h-[90px]">
    <!-- Ícone em quadrado -->
    <div class="flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-teal-500 to-green-600 mr-4">
      <i class="fa-solid fa-diagram-project text-2xl text-white"></i>
    </div>
    <!-- Título e status -->
    <div class="flex-1 flex items-center justify-between min-w-0">
      <div class="min-w-0">
        <h2 class="text-lg font-bold truncate">{{ title }}</h2>
        <p v-if="description" class="text-xs text-[var(--gray-400)] truncate">{{ description }}</p>
      </div>
      <span
        class="ml-4 px-3 py-1 rounded-full text-xs font-semibold"
        :class="statusClass"
      >
        {{ statusLabel }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  status: {
    type: String,
    default: 'ativo'
  }
})

const statusLabel = computed(() => {
  if (props.status === 'ativo' || props.status === 'active') return 'Ativo'
  if (props.status === 'inativo' || props.status === 'inactive') return 'Inativo'
  return props.status
})

const statusClass = computed(() => {
  if (props.status === 'ativo' || props.status === 'active')
    return 'bg-teal-700/80 text-teal-300'
  if (props.status === 'inativo' || props.status === 'inactive')
    return 'bg-gray-700/80 text-gray-200'
  return 'bg-teal-700/80 text-teal-200'
})
</script>
