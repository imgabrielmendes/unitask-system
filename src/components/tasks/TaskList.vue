<template>
  <div class="space-y-6">
    <!-- Lista de tarefas em card moderno estilo vidro -->
    <ul v-if="tasks.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="group relative backdrop-blur-xl bg-white/5 border border-white/10 p-0 transition-all duration-300 shadow-lg 
        hover:bg-white/10 hover:border-purple-400/30 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 hover:scale-[1.02] 
        flex flex-col overflow-hidden cursor-pointer"
        @click="openTaskDrawer(task)"
      >
        <!-- Topo: autor, data, status -->
        <div class="flex items-center justify-between px-5 pt-5">
          <div class="flex items-center gap-2">
            <span class="text-xs text-purple-400/70">           {{ task.data_criacao}}</span>
            <span class="text-xs text-purple-200 font-semibold">{{ task.author || '' }}</span>
          </div>

          <span
            class="px-2 py-0.5 rounded-full text-xs font-bold bg-green-700/80 text-green-300 shadow"
            v-if="task.status === 'active'">Active</span>
          <span
            class="px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-700/80 text-yellow-200 shadow"
            v-else-if="task.status === 'pending'">Pending</span>

          <span
            class="px-2 py-0.5 rounded-full text-xs font-bold bg-gray-700/80 text-gray-200 shadow"
            v-else
          >{{ getStatusLabel(task.status) }}
          </span>

        </div>

        <!-- Imagem (opcional) -->
        <div v-if="task.image" class="px-5 pt-4">
          <img :src="task.image" alt="Imagem da tarefa" class="rounded-xl w-full object-cover h-32 mb-2 shadow" />
        </div>

        <!-- Título -->
        <div class="px-5 pt-2">
          <h3 class="font-bold text-white text-lg leading-tight mb-1">{{ task.title }}</h3>
          <p v-if="task.description" class="text-sm text-purple-200/60 line-clamp-2 mb-2">{{ task.description }}</p>
        </div>

        <!-- Tags -->
        <div v-if="task.tags && task.tags.length" class="px-5 pb-2 flex flex-wrap gap-2">
          <span v-for="tag in task.tags" :key="tag" class="px-2 py-0.5 rounded-lg text-xs font-medium bg-purple-900/40 text-purple-300 border border-purple-500/20">{{ tag }}</span>
        </div>

        <!-- Informações extras -->
        <div class="px-5 pb-4 flex flex-wrap gap-4 items-center text-xs text-purple-200/80">

          <div v-if="task.tool" class="flex items-center gap-1">
            <span class="font-bold">{{ task.tool }}</span>
          </div>

          <div v-if="task.value" class="flex items-center gap-1">
            <span class="font-bold">{{ task.value }}</span>
          </div>

          <div v-if="task.dueDate" class="flex items-center gap-1">
            <span>Due</span>
            <span class="font-bold">{{ task.dueDate }}</span>
          </div>

          <div v-if="task.messages" class="flex items-center gap-1">
            <span>{{ task.messages }} New Messages</span>
          </div>
          
        </div>

      </li>
    </ul>

    <!-- Estado vazio com efeito vidro -->
    <div v-else class="flex flex-col items-center justify-center py-16">
      <div class="relative">
        
        <div class="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-full blur-3xl" />

        <div class="relative backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl shadow-purple-900/30">

        <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10 pointer-events-none" />

          <svg class="relative w-20 h-20 text-purple-400 mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>

          <h3 class="relative text-xl font-semibold text-white text-center mb-2">Nenhuma tarefa ainda</h3>
          <p class="relative text-purple-200/60 text-center text-sm max-w-xs">
            Comece criando sua primeira tarefa e organize seu dia de forma eficiente.
          </p>

        </div>
      </div>
    </div>

    <TaskDrawer
      :task="selectedTask"
      :pinned="drawerPinned"
      @close="closeTaskDrawer"
      @toggle-pin="togglePinDrawer"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TaskDrawer from './TaskDrawer.vue'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
})

const selectedTask = ref(null)
const drawerPinned = ref(false)

function openTaskDrawer(task) {
  selectedTask.value = task
}
function closeTaskDrawer() {
  selectedTask.value = null
  drawerPinned.value = false
}
function togglePinDrawer() {
  drawerPinned.value = !drawerPinned.value
}

function getStatusClass(status) {
  const classes = {
    'done': 'bg-green-500/20 text-green-400 border border-green-500/30',
    'completed': 'bg-green-500/20 text-green-400 border border-green-500/30',
    'in_progress': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'pending': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  }
  return classes[status] || classes['pending']
}

function getStatusLabel(status) {
  const labels = {
    'done': 'Concluída',
    'completed': 'Concluída',
    'in_progress': 'Em Progresso',
    'pending': 'Pendente',
  }
  return labels[status] || 'Pendente'
}

function getPriorityColor(priority) {
  const colors = {
    'high': 'bg-red-500',
    'medium': 'bg-yellow-500',
    'low': 'bg-green-500',
  }
  return colors[priority] || 'bg-purple-500'
}

function getPriorityBadge(priority) {
  const badges = {
    'high': 'bg-red-500/20 text-red-400 border-red-500/30',
    'medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'low': 'bg-green-500/20 text-green-400 border-green-500/30',
  }
  return badges[priority] || 'bg-purple-500/20 text-purple-400 border-purple-500/30'
}

function getPriorityLabel(priority) {
  const labels = {
    'high': 'Alta',
    'medium': 'Média',
    'low': 'Baixa',
  }
  return labels[priority] || 'Normal'
}
</script>

<style scoped>
/* Animações suaves */
li {
  animation: fadeIn 0.4s ease-out;
  animation-fill-mode: backwards;
}

li:nth-child(1) { animation-delay: 0s; }
li:nth-child(2) { animation-delay: 0.1s; }
li:nth-child(3) { animation-delay: 0.2s; }
li:nth-child(4) { animation-delay: 0.3s; }
li:nth-child(5) { animation-delay: 0.4s; }
li:nth-child(6) { animation-delay: 0.5s; }

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Efeito de vidro mais pronunciado */
.backdrop-blur-xl {
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
}

/* Linha de corte para descrição */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transições do overlay */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores do Vue */ {
  opacity: 0;
}
</style>
