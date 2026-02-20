<template>
  <div class="flex-1 flex justify-center mx-2 md:mx-4">
    <div class="relative w-full max-w-md">
      <input
        type="text"
        :placeholder="placeholder"
        class="w-full px-4 py-2 rounded-lg bg-[var(--gray-800)] text-white border border-[var(--gray-700)] focus:border-teal-500 outline-none placeholder:text-gray-400 transition-all duration-200"
        v-model="modelValueProxy"
        @keyup.enter="$emit('search', modelValueProxy)"
      />
      <i class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]"></i>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Pesquisar...'
  }
})
const emit = defineEmits(['update:modelValue', 'search'])
const modelValueProxy = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>
