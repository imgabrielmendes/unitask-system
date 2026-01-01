<template>
  <button
    :class="buttonClasses"
    :disabled="props.disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const buttonClasses = computed(() => {
  const base = 'rounded-xl font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  }
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }

  const disabledStyle = props.disabled ? 'opacity-50 cursor-not-allowed' : ''

  return `${base} ${sizes[props.size]} ${variants[props.variant]} ${disabledStyle}`
})
</script>
