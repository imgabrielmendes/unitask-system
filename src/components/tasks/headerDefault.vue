<template>
  <header class="bg-[var(--gray-900)] border-b border-[var(--gray-800)] shadow-lg flex items-center justify-between px-4 md:px-8 py-3 md:py-4 transition-all duration-300">
    <!-- Botão Criar -->
    <button class="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-green-600 text-white px-3 md:px-4 py-2 rounded-lg hover:from-teal-500 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105" @click="showCreateModal = true">
      <i class="fa-solid fa-plus"></i>
      <span class="hidden sm:inline">Criar</span>
    </button>
    <!-- Barra de pesquisa central -->
    <div class="flex-1 flex justify-center mx-2 md:mx-4">
      <div class="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Pesquisar..."
          class="w-full px-4 py-2 rounded-lg bg-[var(--gray-800)] text-white border border-[var(--gray-700)] focus:border-teal-500 outline-none placeholder:text-gray-400 transition-all duration-200"
          v-model="search"
          @keyup.enter="$emit('search', search)"
        />
        <i class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]"></i>
      </div>
    </div>
    <!-- Ações da direita -->
    <div class="flex items-center gap-2 md:gap-3">
      <!-- Notificações - oculto em mobile -->
      <div class="relative hidden md:block">
        <button 
          @click="toggleNotifications" 
          class="relative bg-[var(--gray-800)] text-white p-2 rounded-full hover:bg-[var(--gray-700)] transition-all duration-200 hover:scale-110"
        >
          <i class="fa-solid fa-bell"></i>
          <span class="absolute -top-1 -right-1 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">3</span>
        </button>
        
        <!-- Dropdown de Notificações -->
        <transition name="dropdown">
          <div 
            v-if="showNotifications" 
            class="absolute right-0 mt-2 w-80 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div class="p-4 border-b border-[var(--gray-800)]">
              <h3 class="text-white font-semibold">Notificações</h3>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <div 
                v-for="(notif, index) in notifications" 
                :key="index"
                class="p-4 border-b border-[var(--gray-800)] hover:bg-[var(--gray-800)] transition-colors cursor-pointer"
              >
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 rounded-full bg-teal-500 mt-2"></div>
                  <div class="flex-1">
                    <p class="text-white text-sm font-medium">{{ notif.title }}</p>
                    <p class="text-gray-400 text-xs mt-1">{{ notif.message }}</p>
                    <p class="text-gray-500 text-xs mt-1">{{ notif.time }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-3 text-center border-t border-[var(--gray-800)]">
              <button class="text-teal-400 text-sm hover:text-teal-300 transition-colors">Ver todas</button>
            </div>
          </div>
        </transition>
      </div>
      
      <!-- Perfil -->
      <div class="relative">
        <button 
          @click="toggleProfile" 
          class="bg-[var(--gray-800)] text-white p-2 rounded-full hover:bg-[var(--gray-700)] transition-all duration-200 hover:scale-110"
        >
          <i class="fa-solid fa-user"></i>
        </button>
        
        <!-- Dropdown de Perfil -->
        <transition name="dropdown">
          <div 
            v-if="showProfile" 
            class="absolute right-0 mt-2 w-56 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div class="p-4 border-b border-[var(--gray-800)]">
              <p class="text-white font-semibold">@userid</p>
              <p class="text-gray-400 text-xs mt-1">user@email.com</p>
            </div>
            <div class="py-2">
              <router-link 
                to="/preferences" 
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--gray-800)] transition-colors text-gray-300 hover:text-white"
                @click="showProfile = false"
              >
                <i class="fa-solid fa-sliders text-base"></i>
                <span class="text-sm">Preferências</span>
              </router-link>
              <router-link 
                to="/settings" 
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--gray-800)] transition-colors text-gray-300 hover:text-white"
                @click="showProfile = false"
              >
                <i class="fa-solid fa-gear text-base"></i>
                <span class="text-sm">Configurações</span>
              </router-link>
            </div>
            <div class="border-t border-[var(--gray-800)]">
              <button 
                @click="handleLogout" 
                class="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-900/20 transition-colors text-red-400 hover:text-red-300"
              >
                <i class="fa-solid fa-right-from-bracket text-base"></i>
                <span class="text-sm font-medium">Sair</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>

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

const router = useRouter()
const search = ref('')
const showNotifications = ref(false)
const showProfile = ref(false)
const showCreateModal = ref(false)
const isCreateTaskOpen = ref(false)
const isCreateTeamOpen = ref(false)

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
