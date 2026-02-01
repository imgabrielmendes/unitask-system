<template>
  <div class="min-h-screen bg-[var(--gray-950)]">
    <div class="p-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-16">
        <i class="fa-solid fa-spinner fa-spin text-6xl text-teal-400 mb-4"></i>
        <p class="text-gray-400">Carregando time...</p>
      </div>

      <!-- Conteúdo do Time -->
      <div v-else-if="team">
        <!-- Header do Time -->
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :style="{ backgroundColor: team.color || '#14b8a6' }">
              <i class="fa-solid fa-users text-white text-xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-white">{{ team.name }}</h1>
          </div>
          <p v-if="team.description" class="text-gray-400">{{ team.description }}</p>
        </div>

        <!-- Seção de Tarefas do Time -->
        <section class="mb-8">
          <h2 class="text-xl font-semibold text-white mb-4">Tarefas do Time</h2>
          
          <!-- Lista de Tarefas -->
          <div v-if="teamTasks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="task in teamTasks" 
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
              <p v-if="task.description" class="text-gray-400 text-sm mb-3">{{ task.description }}</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-12 text-center">
            <i class="fa-solid fa-tasks text-6xl text-gray-600 mb-4"></i>
            <h3 class="text-xl font-bold text-white mb-2">Nenhuma tarefa encontrada</h3>
            <p class="text-gray-400">Este time ainda não possui tarefas</p>
          </div>
        </section>

        <!-- Seção de Membros -->
        <section class="mb-8">
          <h2 class="text-xl font-semibold text-white mb-4">Membros</h2>
          
          <div v-if="team.members && team.members.length > 0" class="flex flex-wrap gap-3">
            <div 
              v-for="member in team.members" 
              :key="member.id"
              class="flex items-center gap-2 bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-lg px-4 py-2"
            >
              <div class="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">{{ getInitials(member.name) }}</span>
              </div>
              <span class="text-white">{{ member.name }}</span>
            </div>
          </div>

          <div v-else class="text-gray-400">
            Nenhum membro neste time ainda
          </div>
        </section>
      </div>

      <!-- Erro -->
      <div v-else class="flex flex-col items-center justify-center py-16">
        <i class="fa-solid fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
        <h3 class="text-xl font-bold text-white mb-2">Time não encontrado</h3>
        <p class="text-gray-400 mb-6">O time que você está procurando não existe</p>
        <router-link to="/teams" class="px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:from-teal-500 hover:to-green-500 transition-all duration-200 shadow-lg font-medium">
          <i class="fa-solid fa-arrow-left mr-2"></i>
          Voltar para Times
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getTeam } from '@/services/teamService.js'

export default {
  name: 'TeamPage',
  data() {
    return {
      team: null,
      teamTasks: [],
      isLoading: false
    }
  },
  async mounted() {
    await this.fetchTeam()
  },
  methods: {
    async fetchTeam() {
      this.isLoading = true
      try {
        const slug = this.$route.params.slug
        const response = await getTeam(slug)
        this.team = response?.data?.team || response?.data || null
        this.teamTasks = response?.data?.tasks || []
      } catch (error) {
        console.error('Erro ao buscar time:', error)
        this.team = null
      } finally {
        this.isLoading = false
      }
    },
    getInitials(name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    },
    getStatusClass(status) {
      const classes = {
        'done': 'bg-green-700/80 text-green-300',
        'completed': 'bg-green-700/80 text-green-300',
        'in_progress': 'bg-blue-700/80 text-blue-300',
        'pending': 'bg-yellow-700/80 text-yellow-300'
      }
      return classes[status] || 'bg-gray-700/80 text-gray-300'
    },
    getStatusLabel(status) {
      const labels = {
        'done': 'Concluída',
        'completed': 'Concluída',
        'in_progress': 'Em Progresso',
        'pending': 'Pendente'
      }
      return labels[status] || status
    }
  }
}
</script>
