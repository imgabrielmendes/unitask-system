<template>
  <aside 
    @mouseenter="expand" 
    @mouseleave="collapse"
    :class="['fixed left-0 top-0 h-screen z-30 bg-[var(--gray-900)] border-r border-[var(--gray-800)] flex flex-col transition-all duration-300', expanded ? 'w-64' : 'w-20']"
  >
    <!-- Topo: Logo verde -->
    <div class="flex items-center justify-between p-4 border-b border-[var(--gray-800)]">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-gradient-to-br from-teal-400 to-green-500 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-check text-white text-sm"></i>
        </div>
        <span v-if="expanded" class="text-xl font-bold text-white">Unitask</span>
      </div>
    </div>

    <!-- Seção de Pesquisa -->
    <div v-if="expanded" class="p-4">
      <div class="relative">
        <input 
          type="text" 
          placeholder="Pesquisar..." 
          class="w-full bg-[var(--gray-800)] text-white text-sm px-3 py-2 rounded-lg border border-[var(--gray-700)] focus:border-teal-500 focus:outline-none"
        />
        <i class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
      </div>
    </div>

    <!-- Navegação Principal -->
    <nav class="flex-1 overflow-y-auto px-3 py-2">
      <div class="space-y-1">
        <!-- Home -->
        <router-link 
          to="/home" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--gray-800)] transition text-gray-300 hover:text-white group"
          active-class="bg-teal-900/30 text-teal-400"
        >
          <i class="fa-solid fa-house text-base"></i>
          <span v-if="expanded" class="font-medium text-sm">Home</span>
        </router-link>

        <!-- Tasks -->
        <router-link 
          to="/tasks" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--gray-800)] transition text-gray-300 hover:text-white"
          active-class="bg-teal-900/30 text-teal-400"
        >
          <i class="fa-solid fa-list-check text-base"></i>
          <span v-if="expanded" class="font-medium text-sm">Tarefas</span>
        </router-link>

        <!-- Projects -->
        <router-link 
          to="/projects" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--gray-800)] transition text-gray-300 hover:text-white"
          active-class="bg-teal-900/30 text-teal-400"
        >
          <i class="fa-solid fa-diagram-project text-base"></i>
          <span v-if="expanded" class="font-medium text-sm">Projetos</span>
        </router-link>

        <!-- Divider -->
        <div class="my-3 border-t border-[var(--gray-800)]"></div>

        <!-- Teams Section -->
        <SidebarTeamsAccordion :teams="teams" :show="showTeams" :expanded="expanded" @toggle="toggleTeams" />

        <!-- Divider -->
        <div class="my-3 border-t border-[var(--gray-800)]"></div>

        <!-- API Docs -->
        <router-link 
          to="/api-docs" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-teal-900/30 transition text-gray-300"
          active-class="bg-teal-900/30 text-teal-400"
        >
          <i class="fa-solid fa-book text-lg"></i>
          <span v-if="expanded" class="font-medium">API Docs</span>
        </router-link>

        <!-- Divider -->
        <div class="my-3 border-t border-[var(--gray-800)]"></div>

        <!-- Design System -->
        <router-link 
          to="/design-system" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--gray-800)] transition text-gray-300 hover:text-white"
          active-class="bg-teal-900/30 text-teal-400"
        >
          <i class="fa-solid fa-palette text-base"></i>
          <span v-if="expanded" class="font-medium text-sm">Design System</span>
        </router-link>
      </div>
    </nav>

    <!-- Rodapé com usuário -->
    <div class="border-t border-[var(--gray-800)] p-3">
      <router-link 
        to="/profile" 
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--gray-800)] transition text-gray-300 hover:text-white"
      >
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
          <i class="fa-solid fa-user text-white text-xs"></i>
        </div>
        <div v-if="expanded" class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">@userid</p>
          <p class="text-xs text-gray-400 truncate">Ver perfil</p>
        </div>
      </router-link>
    </div>
  </aside>

</template>

<script setup>
import { ref, watch } from 'vue'
import SidebarTeamsAccordion from './SidebarTeamsAccordion.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'

const props = defineProps({
  teams: {
    type: Array,
    default: () => [],
  },
})

const expanded = ref(true)
const showTeams = ref(true)

function expand() {
  expanded.value = true
  window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: { expanded: true } }))
}

function collapse() {
  expanded.value = false
  window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: { expanded: false } }))
}

function toggleTeams() {
  showTeams.value = !showTeams.value
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

/* Animação para links */
aside a, aside button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

aside a:hover, aside button:hover {
  transform: translateX(4px);
}

/* Animação do badge */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
