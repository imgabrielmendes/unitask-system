<template>
  <input
    :id="id"
    :value="modelValue"
    @input="onInput"
    :placeholder="placeholder"
    class="w-full bg-transparent border-0 border-b-2 border-[var(--gray-400)] focus:border-[var(--gray-200)] text-4xl font-bold py-4 text-white placeholder:text-[var(--gray-400)] focus:outline-none transition-all"
    autocomplete="off"
  />
</template>

<script setup>
const props = defineProps({
  id: String,
  modelValue: String,
  placeholder: String,
})
const emit = defineEmits(['update:modelValue'])
function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>
