<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  disabled: { type: Boolean, default: false },
})

const buttonClass = computed(() => {
  const base = 'rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d0a14] transition-all duration-200'
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  const variants = {
    primary: 'bg-gradient-to-r from-teal-600 to-green-600 text-white hover:from-teal-500 hover:to-green-500 focus:ring-teal-500 shadow-lg shadow-teal-500/25',
    secondary: 'bg-teal-900/30 text-gray-200 border border-teal-500/30 hover:bg-teal-900/50 hover:border-teal-500/50 focus:ring-teal-500',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500 focus:ring-red-500 shadow-lg shadow-red-500/25',
  }

  return `${base} ${sizes[props.size]} ${variants[props.variant]} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`
})
</script>
