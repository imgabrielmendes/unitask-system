<template>
  <div class="min-h-screen bg-[var(--gray-950)]">
    <div class="p-8">
      <!-- Header da página -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Minhas Tarefas</h1>
        <p class="text-gray-400">Gerencie e organize todas as suas tarefas</p>
      </div>

      <!-- Filtros -->
      <div class="flex gap-3 mb-6 flex-wrap">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="activeFilter = filter.value"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-all duration-200',
            activeFilter === filter.value 
              ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white shadow-lg' 
              : 'bg-[var(--gray-800)] text-gray-300 hover:bg-[var(--gray-700)]'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-16">
        <i class="fa-solid fa-spinner fa-spin text-6xl text-teal-400 mb-4"></i>
        <p class="text-gray-400">Carregando tarefas...</p>
      </div>

      <!-- Lista de Tarefas -->
      <div v-else-if="tasks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="task in filteredTasks" 
          :key="task.id"
          class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-5 hover:border-teal-500/50 transition-all duration-200 hover:shadow-lg cursor-pointer"
        >
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-lg font-bold text-white">{{ task.title }}</h3>
            <span 
              :class="[
                'px-2 py-1 rounded-full text-xs font-semibold',
                getStatusClass(task.status)
              ]"
            >
              {{ getStatusLabel(task.status) }}
            </span>
          </div>
          <p v-if="task.description" class="text-gray-400 text-sm mb-3 line-clamp-2">{{ task.description }}</p>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span v-if="task.dueDate">{{ task.dueDate }}</span>
            <span 
              :class="[
                'px-2 py-0.5 rounded-full font-medium',
                getPriorityClass(task.priority)
              ]"
            >
              {{ getPriorityLabel(task.priority) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Estado vazio -->
      <div v-else-if="!isLoading" class="flex flex-col items-center justify-center py-16">
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-12 text-center">
          <i class="fa-solid fa-list-check text-6xl text-gray-600 mb-4"></i>
          <h3 class="text-xl font-bold text-white mb-2">Nenhuma tarefa encontrada</h3>
          <p class="text-gray-400 mb-6">Comece criando sua primeira tarefa</p>
          <button class="px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:from-teal-500 hover:to-green-500 transition-all duration-200 shadow-lg font-medium">
            <i class="fa-solid fa-plus mr-2"></i>
            Criar Tarefa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTarefas } from '@/services/taskService.js'

export default {
  name: 'TasksPage',
  data() {
    return {
      activeFilter: 'all',
      filters: [
        { label: 'Todas', value: 'all' },
        { label: 'Pendentes', value: 'pending' },
        { label: 'Em Progresso', value: 'in_progress' },
        { label: 'Concluídas', value: 'done' }
      ],
      tasks: [],
      isLoading: false
    };
  },
  async mounted() {
    await this.fetchTasks();
  },
  computed: {
    filteredTasks() {
      if (this.activeFilter === 'all') {
        return this.tasks;
      }
      return this.tasks.filter(task => task.status === this.activeFilter);
    }
  },
  methods: {
    async fetchTasks() {
      this.isLoading = true;
      try {
        const response = await getTarefas();
        this.tasks = response?.data || [];
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        this.tasks = [];
      } finally {
        this.isLoading = false;
      }
    },
    getStatusClass(status) {
      const classes = {
        'done': 'bg-green-700/80 text-green-300',
        'in_progress': 'bg-blue-700/80 text-blue-300',
        'pending': 'bg-yellow-700/80 text-yellow-300'
      };
      return classes[status] || 'bg-gray-700/80 text-gray-300';
    },
    getStatusLabel(status) {
      const labels = {
        'done': 'Concluída',
        'in_progress': 'Em Progresso',
        'pending': 'Pendente'
      };
      return labels[status] || status;
    },
    getPriorityClass(priority) {
      const classes = {
        'high': 'bg-red-900/60 text-red-300',
        'medium': 'bg-yellow-900/60 text-yellow-300',
        'low': 'bg-green-900/60 text-green-300'
      };
      return classes[priority] || 'bg-gray-900/60 text-gray-300';
    },
    getPriorityLabel(priority) {
      const labels = {
        'high': 'Alta',
        'medium': 'Média',
        'low': 'Baixa'
      };
      return labels[priority] || priority;
    }
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
