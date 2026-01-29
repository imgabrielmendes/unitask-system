<template>
  <div>
    <button @click="$emit('toggle')" class="flex items-center w-full gap-3 px-4 py-3 rounded-lg hover:bg-teal-900/30 transition text-gray-300">
      <i class="fa-solid fa-users text-lg"></i>
      <span v-if="expanded" class="font-medium flex-1 text-left">Meus Times</span>
      <i v-if="expanded" :class="show ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'" class="ml-auto"></i>
    </button>
    <transition name="fade">
      <ul v-show="show && expanded" class="pl-8 pr-2 mt-1 space-y-1">
        <li v-for="team in teams" :key="team.id">
          <router-link :to="`/team/${team.id}`" class="flex items-center gap-2 px-2 py-2 rounded hover:bg-teal-900/20 text-gray-300">
            <i class="fa-solid fa-circle text-xs" :style="{ color: team.color || '#14b8a6' }"></i>
            <span class="truncate">{{ team.name }}</span>
          </router-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.min.css'
const props = defineProps({
  teams: {
    type: Array,
    default: () => [],
  },
  show: Boolean,
  expanded: Boolean
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  max-height: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
