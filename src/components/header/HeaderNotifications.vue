<template>
  <div class="relative hidden md:block">
    <button 
      @click="$emit('toggle')" 
      class="relative bg-[var(--gray-800)] text-white p-2 rounded-full hover:bg-[var(--gray-700)] transition-all duration-200 hover:scale-110"
    >
      <i class="fa-solid fa-bell"></i>
      <span class="absolute -top-1 -right-1 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">{{ notifications.length }}</span>
    </button>
    <transition name="dropdown">
      <div 
        v-if="show"
        class="absolute right-0 mt-2 w-80 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-xl shadow-2xl overflow-hidden z-50"
      >
        <div class="p-4 border-b border-[var(--gray-800)]">
          <h3 class="text-white font-semibold">Notificações</h3>
        </div>
        <div class="max-h-96 overflow-y-auto">
          <div 
            v-for="(notif, index) in notifications" 
            :key="index"
            class="p-4 border-b border-[var(--gray-800)] hover:bg-[var(--gray-800)] transition-colors cursor-pointer"
          >
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-teal-500 mt-2"></div>
              <div class="flex-1">
                <p class="text-white text-sm font-medium">{{ notif.title }}</p>
                <p class="text-gray-400 text-xs mt-1">{{ notif.message }}</p>
                <p class="text-gray-500 text-xs mt-1">{{ notif.time }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-3 text-center border-t border-[var(--gray-800)]">
          <button class="text-teal-400 text-sm hover:text-teal-300 transition-colors">Ver todas</button>
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
