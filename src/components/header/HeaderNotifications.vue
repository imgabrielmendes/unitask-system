<template>
  <div class="relative hidden md:block">
    <button 
      @click="$emit('toggle')" 
      class="relative bg-[var(--gray-800)] text-white p-2 rounded-full hover:bg-[var(--gray-700)] transition-all duration-200 hover:scale-110"
    >
      <i class="fa-solid fa-bell"></i>
      <span v-if="notifications.length" class="absolute -top-1 -right-1 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{{ notifications.length }}</span>
    </button>
    <transition name="dropdown">
      <div 
        v-if="show"
        class="absolute right-0 mt-2 w-80 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-xl shadow-2xl overflow-hidden z-50"
      >
        <div class="p-4 border-b border-[var(--gray-800)] flex items-center justify-between">
          <h3 class="text-white font-semibold text-sm">Notificações</h3>
          <span v-if="notifications.length" class="text-xs text-teal-400 font-medium">{{ notifications.length }} nova(s)</span>
        </div>
        <div v-if="notifications.length" class="max-h-96 overflow-y-auto">
          <div 
            v-for="(notif, index) in notifications" 
            :key="index"
            class="p-4 border-b border-[var(--gray-800)] hover:bg-[var(--gray-800)] transition-colors cursor-pointer"
          >
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0"></div>
              <div class="flex-1">
                <p class="text-white text-sm font-medium">{{ notif.title }}</p>
                <p class="text-gray-400 text-xs mt-1">{{ notif.message }}</p>
                <p class="text-gray-500 text-xs mt-1">{{ notif.time }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-10 text-center px-4">
          <i class="fa-solid fa-bell-slash text-3xl text-gray-600 mb-3"></i>
          <p class="text-sm text-gray-500">Nenhuma notificação</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  notifications: {
    type: Array,
    default: () => []
  },
  show: Boolean
})
const emit = defineEmits(['toggle'])
</script>

<style scoped>
.dropdown-enter-active {
  animation: slideDown 0.3s ease-out;
}
.dropdown-leave-active {
  animation: slideDown 0.2s ease-in reverse;
}
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
