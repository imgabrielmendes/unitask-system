<template>
  <div class="flex items-center bg-[var(--gray-850)] border border-[var(--gray-700)] rounded-xl p-5 shadow hover:shadow-lg hover:border-teal-500/30 transition-all duration-200 min-h-[90px] cursor-pointer group">
    <!-- Ícone em quadrado com cor do time -->
    <div 
      class="flex items-center justify-center w-14 h-14 rounded-lg mr-4 transition-transform duration-200 group-hover:scale-110"
      :style="{ background: teamColor || 'linear-gradient(135deg, var(--teal-500), var(--green-600))' }"
    >
      <i :class="['text-2xl text-white', icon || 'fa-solid fa-users']"></i>
    </div>
    <!-- Título e membros -->
    <div class="flex-1 flex items-center justify-between min-w-0">
      <div class="min-w-0">
        <h2 class="text-lg font-bold text-white truncate">{{ name }}</h2>
        <p class="text-xs text-[var(--gray-400)]">
          <i class="fa-solid fa-user-group mr-1"></i>
          {{ memberCount }} {{ memberCount === 1 ? 'membro' : 'membros' }}
        </p>
      </div>
      <i class="fa-solid fa-arrow-right text-gray-600 group-hover:text-teal-400 text-xl transition-all duration-200 group-hover:translate-x-1"></i>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  memberCount: {
    type: Number,
    default: 0
  }
})

const teamColor = computed(() => {
  if (!props.color) return null
  // Se a cor vier como hex (#RRGGBB), retorna como gradiente
  if (props.color.startsWith('#')) {
    return `linear-gradient(135deg, ${props.color}, ${props.color}dd)`
  }
  return props.color
})
</script>
