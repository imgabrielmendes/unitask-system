<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <textarea
      :id="id"
      :rows="rows"
      :value="modelValue"
      @input="onInput"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      :placeholder="placeholder"
      :class="[
        'w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none rounded-lg',
        error ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-200',
        extraClass
      ]"
      v-bind="$attrs"
      ref="textareaRef"
    ></textarea>

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="help" class="mt-1 text-sm text-gray-500">{{ help }}</p>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, defineExpose } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: [String, Number], default: 4 },
  extraClass: { type: String, default: '' },
  error: { type: String, default: '' },
  help: { type: String, default: '' },
  id: { type: String, default: null }
})

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur'])

const generatedId = (props.id) ? props.id : `textarea-${Math.random().toString(36).slice(2,9)}`
const id = computed(() => generatedId)

function onInput(e) {
  const value = e.target.value
  emit('update:modelValue', value)
  emit('input', value)
}

const textareaRef = ref(null)
function focus() {
  textareaRef.value && textareaRef.value.focus()
}
defineExpose({ focus })
</script>


