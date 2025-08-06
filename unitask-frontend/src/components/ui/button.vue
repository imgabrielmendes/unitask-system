<!-- src/components/ui/BaseButton.vue -->
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
    default: 'primary', // pode ser: primary, secondary, danger, etc.
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
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
    primary: 'bg-emerald text-white hover:bg-mint focus:ring-mint',
    secondary: 'bg-antiflashWhite text-richBlack hover:bg-white focus:ring-richBlack',
    danger: 'bg-viridian text-white hover:bg-hookersGreen focus:ring-viridian',
    dark: 'bg-darkGreen text-white hover:bg-brunswickGreen focus:ring-darkSlateGray',
  }

  const disabledStyle = props.disabled ? 'opacity-50 cursor-not-allowed' : ''

  return `${base} ${sizes[props.size]} ${variants[props.variant] || ''} ${disabledStyle}`
})
</script>
