<template>
  <div class="relative">
    <button
      @click="$emit('toggle')"
      class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors group"
    >
      <div class="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        {{ initials }}
      </div>
      <span v-if="user?.name" class="text-sm text-gray-300 group-hover:text-white transition-colors hidden md:block max-w-[120px] truncate">{{ user.name }}</span>
      <i class="fa-solid fa-chevron-down text-gray-500 text-[10px] hidden md:block"></i>
    </button>

    <transition name="dropdown">
      <div
        v-if="show"
        class="absolute right-0 mt-2 w-60 bg-[var(--gray-900)] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
      >
        <div class="p-4 border-b border-white/5">
          <p class="text-white font-semibold text-sm truncate">{{ user?.name ?? 'Usuário' }}</p>
          <p class="text-gray-400 text-xs mt-0.5 truncate">{{ user?.email ?? '' }}</p>
        </div>
        <div class="border-t border-white/5">
          <button
            @click="$emit('logout')"
            class="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-900/20 transition-colors text-red-400 hover:text-red-300"
          >
            <i class="fa-solid fa-right-from-bracket text-sm"></i>
            <span class="text-sm font-medium">Sair</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: Boolean,
  user: { type: Object, default: null }
})
const emit = defineEmits(['toggle', 'logout', 'close'])

const initials = computed(() => {
  const name = props.user?.name ?? ''
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'U'
})
</script>

<style scoped>
.dropdown-enter-active { animation: slideDown 0.2s ease-out; }
.dropdown-leave-active { animation: slideDown 0.15s ease-in reverse; }
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
