<template>
  <BaseButton v-bind="props" @click="$emit('click', $event)">
    <slot />
  </BaseButton>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

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

defineEmits(['click'])
</script>
