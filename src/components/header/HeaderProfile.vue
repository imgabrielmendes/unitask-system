<template>
  <div class="relative">
    <button 
      @click="$emit('toggle')" 
      class="bg-[var(--gray-800)] text-white p-2 rounded-full hover:bg-[var(--gray-700)] transition-all duration-200 hover:scale-110"
    >
      <i class="fa-solid fa-user"></i>
    </button>
    <transition name="dropdown">
      <div 
        v-if="show"
        class="absolute right-0 mt-2 w-56 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-xl shadow-2xl overflow-hidden z-50"
      >
        <div class="p-4 border-b border-[var(--gray-800)]">
          <p class="text-white font-semibold">@userid</p>
          <p class="text-gray-400 text-xs mt-1">user@email.com</p>
        </div>
        <div class="py-2">
          <router-link 
            to="/preferences" 
            class="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--gray-800)] transition-colors text-gray-300 hover:text-white"
            @click="$emit('close')"
          >
            <i class="fa-solid fa-sliders text-base"></i>
            <span class="text-sm">Preferências</span>
          </router-link>
          <router-link 
            to="/settings" 
            class="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--gray-800)] transition-colors text-gray-300 hover:text-white"
            @click="$emit('close')"
          >
            <i class="fa-solid fa-gear text-base"></i>
            <span class="text-sm">Configurações</span>
          </router-link>
        </div>
        <div class="border-t border-[var(--gray-800)]">
          <button 
            @click="$emit('logout')" 
            class="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-900/20 transition-colors text-red-400 hover:text-red-300"
          >
            <i class="fa-solid fa-right-from-bracket text-base"></i>
            <span class="text-sm font-medium">Sair</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
    const props = defineProps({
    show: Boolean
    })
    const emit = defineEmits(['toggle', 'logout', 'close'])
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
    transform: translateY(0) scale(1);
  }
}
</style>
