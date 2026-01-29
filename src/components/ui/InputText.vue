<!-- src\components\ui\InputText.vue -->
<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-300 mb-2">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :class="['w-full bg-[var(--gray-800)] border border-[var(--gray-700)] rounded-lg px-4 py-2.5 text-white placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all', inputClass]"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  modelValue: String,
  placeholder: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  inputClass: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>

<style scoped>
/* Estilos customizados para inputs */
</style>
