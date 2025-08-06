<template>
  <div class="w-full">
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <select
      class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled hidden>{{ placeholder }}</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  placeholder: {
    type: String,
    default: "Selecione..."
  },
  options: {
    type: Array,
    required: true,
    
  },
  modelValue: [String, Number]
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
/* opcional: pode customizar o select aqui */
</style>
