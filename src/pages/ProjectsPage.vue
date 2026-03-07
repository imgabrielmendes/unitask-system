<template>
  <div class="min-h-screen bg-[var(--gray-950)]">
    <div class="p-8">

      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-white mb-1">Projetos</h1>
          <p class="text-gray-400 text-sm">Organize e acompanhe todos os seus projetos</p>
        </div>
        <button
          @click="isCreateOpen = true"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-teal-500 to-green-500 text-white hover:from-teal-400 hover:to-green-400 transition-all duration-200 shadow-lg shadow-teal-900/30"
        >
          <i class="fa-solid fa-plus text-xs"></i>
          Novo Projeto
        </button>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-24">
        <i class="fa-solid fa-spinner fa-spin text-5xl text-teal-400 mb-4"></i>
        <p class="text-gray-400">Carregando projetos...</p>
      </div>

      <!-- Projects grid -->
      <div v-else-if="projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-[var(--gray-900)] border border-white/8 rounded-xl p-5 hover:border-teal-500/40 transition-all duration-200 hover:shadow-lg cursor-pointer group"
        >
          <!-- Color bar -->
          <div class="h-1 w-full rounded-full mb-4 bg-gradient-to-r from-teal-500 to-green-500 opacity-60 group-hover:opacity-100 transition-opacity"></div>

          <div class="flex items-start justify-between mb-3">
            <h3 class="text-base font-bold text-white group-hover:text-teal-300 transition-colors">{{ project.name ?? project.title }}</h3>
            <span class="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">#{{ project.id }}</span>
          </div>

          <p v-if="project.description" class="text-gray-400 text-sm mb-4 line-clamp-2">{{ project.description }}</p>
          <p v-else class="text-gray-600 text-sm italic mb-4">Sem descrição</p>

          <div class="flex items-center justify-between text-xs text-gray-500">
            <span class="flex items-center gap-1">
              <i class="fa-solid fa-list-check text-teal-400"></i>
              {{ project.tasks_count ?? 0 }} tarefas
            </span>
            <span v-if="project.created_at">{{ formatDate(project.created_at) }}</span>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!isLoading" class="flex flex-col items-center justify-center py-24">
        <div class="w-20 h-20 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6">
          <i class="fa-solid fa-diagram-project text-4xl text-teal-400/60"></i>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Nenhum projeto ainda</h3>
        <p class="text-gray-400 text-sm mb-6 text-center max-w-sm">Crie seu primeiro projeto para organizar tarefas e colaborar com seu time.</p>
        <button
          @click="isCreateOpen = true"
          class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-teal-500 to-green-500 text-white hover:from-teal-400 hover:to-green-400 transition-all duration-200"
        >
          <i class="fa-solid fa-plus"></i>
          Criar Projeto
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsPage',
  data() {
    return {
      projects: [],
      isLoading: false,
      isCreateOpen: false,
    }
  },
  async mounted() {
    await this.fetchProjects()
  },
  methods: {
    async fetchProjects() {
      this.isLoading = true
      try {
        const { default: api } = await import('@/axios.js')
        const response = await api.get('/projects')
        const data = response?.data?.data ?? response?.data ?? []
        this.projects = Array.isArray(data) ? data : []
      } catch (error) {
        console.error('Erro ao buscar projetos:', error)
        this.projects = []
      } finally {
        this.isLoading = false
      }
    },
    formatDate(isoStr) {
      if (!isoStr) return ''
      const d = new Date(isoStr)
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }
  }
}
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
