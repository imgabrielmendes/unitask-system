<!-- src/components/SectionCard.vue -->
<template>
  <div class="bg-gray-800 rounded-xl p-4 shadow-md">
    <h3 class="text-lg font-semibold mb-3">{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>
