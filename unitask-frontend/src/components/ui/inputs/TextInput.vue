<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="onInput"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      :placeholder="placeholder"
      :class="[
        'w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none',
        error ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-200',
        extraClass
      ]"
      v-bind="$attrs"
    />

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="help" class="mt-1 text-sm text-gray-500">{{ help }}</p>
  </div>
</template>

<script setup>
import { nanoid } from 'nanoid'
import { computed, ref } from 'vue'

/*
 Props:
 - modelValue: valor para v-model
 - label: texto do label (opcional)
 - placeholder: placeholder do input
 - type: tipo do input (text, email, password, ...)
 - extraClass: classes extras para customização
 - error: string de erro para exibir
 - help: texto de ajuda/descrição opcional
*/
const props = defineProps({
  modelValue: [String, Number],
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  extraClass: { type: String, default: '' },
  error: { type: String, default: '' },
  help: { type: String, default: '' },
  id: { type: String, default: null }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'input'])

const generatedId = ref(props.id || `input-${Math.random().toString(36).slice(2, 9)}`)
const id = computed(() => props.id || generatedId.value)

function onInput(e) {
  const value = e.target.value
  emit('update:modelValue', value)
  emit('input', value)             
}
</script>

<style scoped>
</style>
