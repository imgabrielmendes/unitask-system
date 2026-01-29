<template>
  <div class="flex flex-col items-center justify-center py-12 px-6">
    <div 
      class="w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center mb-4"
      :class="pulseAnimation && 'animate-pulse'"
    >
      <i :class="['text-4xl text-gray-500', icon]"></i>
    </div>
    <h3 class="text-lg font-semibold text-gray-400 mb-2">{{ title }}</h3>
    <p class="text-sm text-gray-500 text-center max-w-sm mb-6">{{ description }}</p>
    <slot name="action"></slot>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'fa-solid fa-inbox'
  },
  title: {
    type: String,
    default: 'Nenhum item encontrado'
  },
  description: {
    type: String,
    default: 'Não há itens para exibir no momento.'
  },
  pulseAnimation: {
    type: Boolean,
    default: false
  }
})
</script>
