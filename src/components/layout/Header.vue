<template>
  <header class="header-bar">
    <!-- Botão criar tarefa -->
    <button class="header-create-btn" @click="$emit('create')">
      <i class="fa-solid fa-plus"></i>
      <span>Criar</span>
    </button>
    
    <!-- Botão criar equipe -->
    <button class="header-create-btn ml-2" @click="showCreateTeam = true">
      <i class="fa-solid fa-users"></i>
      <span>Criar Time</span>
    </button>

    <CreateTeamModal v-if="showCreateTeam" @close="showCreateTeam = false" @create="onCreateTeam" />
    <!-- Barra de pesquisa central -->
    <div class="header-search">
      <input
        type="text"
        placeholder="Pesquisar..."
        class="header-search-input"
        v-model="search"
        @keyup.enter="$emit('search', search)"
      />
      <i class="fa-solid fa-magnifying-glass header-search-icon"></i>
    </div>
    <!-- Espaço direito (opcional) -->
    <div class="header-right">
      <!-- Adicione perfil, notificações, etc -->
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import CreateTeamModal from '@/components/teams/CreateTeamModal.vue'
const search = ref('')
const showCreateTeam = ref(false)
function onCreateTeam(team) {
  // Aqui você pode adicionar lógica para lidar com a criação do time
  // Exemplo: emitir evento, chamar API, etc.
  // console.log('Equipe criada:', team)
}
</script>

<style scoped>
.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--gray-900);
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--gray-800);
  min-height: 64px;
  gap: 2rem;
}
.header-create-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gray-800);
  color: var(--gray-50);
  border: none;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.header-create-btn:hover {
  background: var(--gray-700);
}
.header-search {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 480px;
}
.header-search-input {
  width: 100%;
  padding: 0.7em 2.5em 0.7em 1em;
  border-radius: 8px;
  border: 1px solid var(--gray-700);
  background: var(--gray-800);
  color: var(--gray-50);
  font-size: 1em;
  outline: none;
  transition: border 0.2s;
}
.header-search-input:focus {
  border-color: var(--gray-400);
}
.header-search-icon {
  position: absolute;
  right: 1em;
  color: var(--gray-400);
  pointer-events: none;
}
.header-right {
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
