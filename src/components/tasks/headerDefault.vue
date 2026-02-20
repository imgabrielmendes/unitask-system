<template>
  <header class="bg-[var(--gray-900)] border-b border-[var(--gray-800)] shadow-lg flex items-center justify-between px-4 md:px-8 py-3 md:py-4 transition-all duration-300">
    <!-- Botão Criar -->
    <HeaderCreateButton @click="showCreateModal = true" />
    <HeaderAddColleagueButton @click="showInviteModal = true" />

    <!-- Barra de pesquisa central -->
    <HeaderSearchBar v-model="search" @search="$emit('search', $event)" />
    <!-- Ações da direita -->
    <div class="flex items-center gap-2 md:gap-3">
      <HeaderNotifications :notifications="notifications" :show="showNotifications" @toggle="toggleNotifications" />
      <HeaderProfile :show="showProfile" @toggle="toggleProfile" @logout="handleLogout" @close="showProfile = false" />
    </div>

    <!-- Modal de convite de colega -->
    <InviteColleagueModal :open="showInviteModal" @close="showInviteModal = false" @invite="handleInviteColleague" />

    <!-- Modal de Criação -->
    <CreateModal 
      v-model:open="showCreateModal"
      @create-task="handleCreateTask"
      @create-team="handleCreateTeam"
    />

    <!-- Modal de Criar Tarefa -->
    <CreateTaskModal
      v-model:open="isCreateTaskOpen"
      :projects="[]"
      :teams="[]"
      :loading="false"
      :error="''"
      @submit="handleTaskSubmit"
    />

    <!-- Modal de Criar Time -->
    <CreateTeamModal
      v-model:open="isCreateTeamOpen"
    />
  </header>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '@/services/authService'
import CreateModal from '@/components/common/CreateModal.vue'
import CreateTaskModal from '@/components/tasks/forms/CreateTaskModal.vue'
import CreateTeamModal from '@/components/teams/CreateTeamModal.vue'
import HeaderCreateButton from '@/components/header/HeaderCreateButton.vue'
import HeaderAddColleagueButton from '@/components/header/HeaderAddColleagueButton.vue'
import HeaderSearchBar from '@/components/header/HeaderSearchBar.vue'
import HeaderNotifications from '@/components/header/HeaderNotifications.vue'
import HeaderProfile from '@/components/header/HeaderProfile.vue'
import InviteColleagueModal from '@/components/header/InviteColleagueModal.vue'

const router = useRouter()
const search = ref('')
const showNotifications = ref(false)
const showProfile = ref(false)
const showCreateModal = ref(false)
const isCreateTaskOpen = ref(false)
const isCreateTeamOpen = ref(false)
const showInviteModal = ref(false)

const notifications = ref([
  { title: 'Nova tarefa atribuída', message: 'Você foi adicionado à tarefa "Revisar código"', time: '5 min atrás' },
  { title: 'Comentário em projeto', message: 'João comentou no projeto Frontend', time: '1 hora atrás' },
  { title: 'Deadline próximo', message: 'A tarefa "Design System" vence em 2 dias', time: '3 horas atrás' },
])

function toggleNotifications() {
  showNotifications.value = !showNotifications.value
}

function toggleProfile() {
  showProfile.value = !showProfile.value
}

function handleLogout() {
  logout()
  showProfile.value = false
  router.push('/login')
}

function handleCreateTask() {
  isCreateTaskOpen.value = true
}

function handleCreateTeam() {
  isCreateTeamOpen.value = true
}

function handleTaskSubmit(payload) {
  console.log('Criar tarefa:', payload)
  isCreateTaskOpen.value = false
  // Recarregar dados ou navegar
  window.location.reload()
}

function handleInviteColleague(email) {
  // Aqui você pode integrar com API para enviar convite
  // Exemplo: await inviteColleagueByEmail(email)
  // alert('Convite enviado para ' + email)
}

// Fechar dropdown ao clicar fora
if (typeof window !== 'undefined') {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showNotifications.value = false
      showProfile.value = false
    }
  })
}
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

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
