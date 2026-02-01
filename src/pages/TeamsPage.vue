<template>
  <div class="min-h-screen bg-[var(--gray-950)]">
    <div class="p-8">
      <!-- Header da página -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Minhas Equipes</h1>
        <p class="text-gray-400">Gerencie e colabore com suas equipes</p>
      </div>

      <!-- Lista de Equipes -->
      <div v-if="teams.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="team in teams" 
          :key="team.id"
          class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 hover:border-teal-500/50 transition-all duration-200 hover:shadow-lg cursor-pointer"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center">
                <i class="fa-solid fa-users text-white"></i>
              </div>
              <h3 class="text-lg font-bold text-white">{{ team.name }}</h3>
            </div>
          </div>
          <p v-if="team.description" class="text-gray-400 text-sm mb-4">{{ team.description }}</p>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>
              <i class="fa-solid fa-user-group mr-1"></i>
              {{ team.members || 0 }} membros
            </span>
            <span>
              <i class="fa-solid fa-list-check mr-1"></i>
              {{ team.tasks || 0 }} tarefas
            </span>
          </div>
        </div>
      </div>

      <!-- Estado vazio -->
      <div v-else class="flex flex-col items-center justify-center py-16">
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-12 text-center">
          <i class="fa-solid fa-users text-6xl text-gray-600 mb-4"></i>
          <h3 class="text-xl font-bold text-white mb-2">Nenhuma equipe encontrada</h3>
          <p class="text-gray-400 mb-6">Crie sua primeira equipe e comece a colaborar</p>
          <button class="px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:from-teal-500 hover:to-green-500 transition-all duration-200 shadow-lg font-medium">
            <i class="fa-solid fa-plus mr-2"></i>
            Criar Equipe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamsPage',
  data() {
    return {
      teams: [
        // Exemplo de equipes (substitua com dados reais da API)
        {
          id: 1,
          name: 'Frontend',
          description: 'Equipe responsável pelo desenvolvimento da interface',
          members: 5,
          tasks: 12
        },
        {
          id: 2,
          name: 'Backend',
          description: 'Equipe responsável pelo desenvolvimento da API',
          members: 4,
          tasks: 8
        }
      ]
    };
  }
};
</script>
