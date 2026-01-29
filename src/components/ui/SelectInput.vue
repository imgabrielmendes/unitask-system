<template>
  <div class="mb-4">
    <div
      class="relative"
      @click="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      tabindex="0"
      @blur="open = false"
    >
      <div
        class="flex items-center justify-between w-full bg-[var(--gray-800)] border-0 border-b-2 border-[var(--gray-400)] rounded-t-md px-3 py-3 cursor-pointer focus:outline-none transition-all"
        :class="{ 'ring-2 ring-[var(--gray-400)]': open }"
      >
        <div>
          <div class="font-semibold text-white" v-if="selectedOption">
            {{ selectedOption.label }}
          </div>
          <div class="text-xs" style="color: var(--gray-400);" v-if="selectedOption && selectedOption.description">
            {{ selectedOption.description }}
          </div>
          <span v-if="!selectedOption" style="color: var(--gray-400);">{{ placeholder }}</span>
        </div>
        <i class="fa-solid text-white" :class="open ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </div>
      <transition name="fade">
        <ul
          v-if="open"
          class="absolute z-50 left-0 right-0 mt-2 bg-[var(--gray-800)] border border-[var(--gray-700)] rounded-b-md shadow-lg max-h-60 overflow-auto"
        >
          <li
            v-for="option in options"
            :key="option.value"
            @click.stop="selectOption(option)"
            class="px-4 py-3 cursor-pointer hover:bg-[var(--gray-700)] transition-all"
            :class="{ 'bg-[var(--gray-900)]': option.value === modelValue }"
          >
            <div class="font-semibold text-white">{{ option.label }}</div>
            <div class="text-xs" style="color: var(--gray-400);" v-if="option.description">{{ option.description }}</div>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Selecione...',
  },
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const root = ref(null)

function toggleDropdown() {
  open.value = !open.value
}
function selectOption(option) {
  emit('update:modelValue', option.value)
  open.value = false
}
const selectedOption = computed(() =>
  props.options.find(opt => opt.value === props.modelValue)
)

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>