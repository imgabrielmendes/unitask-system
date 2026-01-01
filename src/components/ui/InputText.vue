<!-- src\components\ui\InputText.vue -->
<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      class="mt-1 block w-full rounded-md bg-white border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  label: String,
  modelValue: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
})

const emit = defineEmits(['update:modelValue'])

function onInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

