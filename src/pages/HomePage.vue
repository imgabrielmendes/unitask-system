<template>
  <div class="min-h-screen bg-[var(--gray-950)]">
    <div class="p-8">
      <!-- Data e Saudação -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Olá, {{ user?.name ?? 'User' }}!</h1>
      </div>

      <!-- Seção My Favorites -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-white mb-4">My favorites</h2>
        <transition-group name="list" tag="div" class="space-y-3">
          <div 
            v-for="task in favoritesTasks" 
            :key="task.id"
            :class="getTaskCardClass(task)"
            class="rounded-2xl p-4 flex items-center justify-between transition-all duration-200 cursor-pointer hover:scale-[1.02]"
          >
            <div class="flex items-center gap-3">
              <div :class="getTaskAvatarClass(task)" class="w-10 h-10 rounded-full"></div>
              <div>
                <h3 :class="getTaskTitleClass(task)" class="font-medium">{{ task.title }}</h3>
                <p :class="getTaskDescriptionClass(task)" class="text-xs">{{ task.description || 'Sem descrição' }}</p>
              </div>
            </div>
            <i class="fa-solid fa-star text-white"></i>
          </div>
        </transition-group>
        
        <!-- Loading State para favoritos -->
        <div v-if="isLoadingTasks" class="flex items-center justify-center py-12">
          <i class="fa-solid fa-spinner fa-spin text-4xl text-teal-400"></i>
        </div>

        <!-- Empty State para favoritos -->
        <EmptyState 
          v-else-if="tarefas.length === 0"
          icon="fa-solid fa-star"
          title="Nenhuma tarefa encontrada"
          description="Crie sua primeira tarefa para começar a organizar seu trabalho."
        />
      </section>

      <!-- Divider -->
      <div class="my-8 border-t border-gray-800"></div>

      <!-- Seção My Teams -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-white mb-4">
          <i class="fa-solid fa-users mr-2 text-teal-400"></i>
          Meus Times
        </h2>
        
        <transition-group name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TeamCard 
            v-for="team in teams" 
            :key="team.slug || team.id"
            :name="team.name"
            :color="team.color"
            :icon="team.icon"
            :member-count="team.members?.length || team.member_count || 0"
          />
        </transition-group>

        <!-- Empty State para times -->
        <EmptyState 
          v-if="!isLoadingTeams && teams.length === 0"
          icon="fa-solid fa-users"
          title="Nenhum time encontrado"
          description="Você ainda não faz parte de nenhum time. Crie ou entre em um time para colaborar."
        >
          <template #action>
            <button class="px-4 py-2 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg hover:opacity-90 transition">
              <i class="fa-solid fa-plus mr-2"></i>
              Criar Time
            </button>
          </template>
        </EmptyState>

        <!-- Loading State -->
        <div v-if="isLoadingTeams" class="flex items-center justify-center py-12">
          <i class="fa-solid fa-spinner fa-spin text-4xl text-teal-400"></i>
        </div>
      </section>

      <!-- Divider -->
      <div class="my-8 border-t border-gray-800"></div>

      <!-- Cards Grandes -->
      <transition-group name="card" tag="div" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div key="card-1" class="bg-gradient-to-br from-teal-400 to-green-500 rounded-3xl p-8 min-h-[280px] hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-2">
          <h3 class="text-2xl font-bold text-white mb-2">Projects Overview</h3>
          <p class="text-white/80">Manage all your active projects</p>
        </div>
        <div key="card-2" class="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-8 min-h-[280px] hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-2">
          <h3 class="text-2xl font-bold text-white mb-2">Team Activity</h3>
          <p class="text-white/80">Track your team's progress</p>
        </div>
      </transition-group>

      <!-- Botão Flutuante -->
      <button 
        @click="isCreateOpen = true"
        class="floating-btn fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center text-white hover:scale-110"
      >
        <i class="fa-solid fa-plus text-2xl"></i>
      </button>

      <CreateModal
        v-model:open="isCreateOpen"
        @create-task="handleCreateSubmit"
      />

    </div>
  </div>
</template>

<script>
import { createTask } from '@/services/taskService.js'
import { getHome } from '@/services/homePageService.js'

import TaskList from '@/components/tasks/TaskList.vue'
import CreateModal from '@/components/common/CreateModal.vue'
import buttonteste from '@/components/ui/button.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import TeamCard from '@/components/teams/TeamCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

export default {
  name: 'HomePage',
  components: {
    TaskList,
    CreateModal,
    buttonteste,
    ProjectCard,
    TeamCard,
    EmptyState,
  },
  data() { return {
    
      user: null,
      tarefas: [],
      projectOptions: [],
      teamOptions: [],
      teams: [],
      isLoadingTeams: false,
      isLoadingTasks: false,

      isCreateOpen: false,

    }
  },

  computed: {
    currentDate() {
      const date = new Date()
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    },
    favoritesTasks() {
      // Filtra tarefas favoritas, se não houver, exibe as 3 primeiras
      const favorites = this.tarefas.filter(task => task.is_favorite || task.favorite)
      
      if (favorites.length > 0) {
        return favorites.slice(0, 3)
      }
      
      // Se não houver favoritas, retorna as 3 primeiras tarefas
      return this.tarefas.slice(0, 3)
    }
  },

  async mounted() {
    await this.fetchHomeData()
  },

  methods: {
    
    async fetchHomeData() {
      this.isLoadingTasks = true;
      this.isLoadingTeams = true;
      try {
        const response = await getHome();
        const data = response?.data?.data || {};
        this.user = data.user || null;
        // Cache user for header/sidebar to consume
        if (this.user) sessionStorage.setItem('home_user', JSON.stringify(this.user));
        this.tarefas = Array.isArray(data.tasks) ? data.tasks : [];
        this.teams = Array.isArray(data.teams) ? data.teams : [];
        this.teamOptions = this.teams.map((team) => ({
          value: team.slug,
          label: team.name ?? team.slug,
          name: team.name,
        }));
      } catch (error) {
        console.error('Erro ao buscar dados da home:', error);
        this.user = null;
        this.tarefas = [];
        this.teams = [];
        this.teamOptions = [];
      } finally {
        this.isLoadingTasks = false;
        this.isLoadingTeams = false;
      }
    },

    async fetchTeamsData() {
      this.isLoadingTeams = true
      try {
        
        const response = await getTeams()
        this.teams = response?.data?.data || response?.data || []

      } catch (error) {

        console.error('Erro ao buscar times:', error)
        this.teams = []

      } finally {
        this.isLoadingTeams = false
      }
    },

    async handleCreateSubmit(payload) {
      if (!payload?.title) return

      try {
        const response = await createTask(payload)
        const created = response?.data?.task ?? response?.data
        if (created) {
          this.tarefas = [created, ...this.tarefas]
        } else {
          await this.fetchHomeData()
        }
      } catch (error) {
        console.error('Erro ao criar tarefa:', error)
      }
    },

    // Determina se a tarefa é de alta prioridade
    isHighPriority(task) {
      return task.priority === 'high' || task.priority === 'alta' || task.status === 'urgent'
    },

    // Determina se a tarefa é para hoje
    isDueToday(task) {
      if (!task.due_date && !task.deadline) return false
      const dueDate = new Date(task.due_date || task.deadline)
      const today = new Date()
      return dueDate.toDateString() === today.toDateString()
    },

    // Determina se a tarefa é para mais de um dia
    isMultiDay(task) {
      if (!task.due_date && !task.deadline) return false
      const dueDate = new Date(task.due_date || task.deadline)
      const today = new Date()
      return dueDate > today && !this.isDueToday(task)
    },

    // Retorna as classes do card baseado no tipo de tarefa
    getTaskCardClass(task) {
      if (this.isHighPriority(task)) {
        return 'bg-gradient-to-r from-teal-700 to-teal-600 hover:opacity-90'
      }
      if (this.isDueToday(task)) {
        return 'bg-gradient-to-r from-teal-500 to-green-500 hover:opacity-90'
      }
      if (this.isMultiDay(task)) {
        return 'bg-gray-800/50 hover:bg-gray-800/70'
      }
      // Default (sem data ou status especial)
      return 'bg-gray-800/50 hover:bg-gray-800/70'
    },

    // Retorna as classes do avatar baseado no tipo
    getTaskAvatarClass(task) {
      if (this.isHighPriority(task)) return 'bg-white'
      if (this.isDueToday(task)) return 'bg-gray-900'
      return 'bg-gray-700'
    },

    // Retorna as classes do título
    getTaskTitleClass(task) {
      return 'text-white'
    },

    // Retorna as classes da descrição
    getTaskDescriptionClass(task) {
      if (this.isHighPriority(task)) return 'text-teal-200'
      if (this.isDueToday(task)) return 'text-teal-900'
      return 'text-gray-400'
    }

  }
}
</script>

<style scoped>
/* Animações de lista */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.5s ease;
}

/* Animações de card */
.card-enter-active {
  animation: cardIn 0.6s ease-out;
}

.card-leave-active {
  animation: cardIn 0.4s ease-in reverse;
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.card-move {
  transition: transform 0.6s ease;
}

/* Animação do botão flutuante */
.floating-btn {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
