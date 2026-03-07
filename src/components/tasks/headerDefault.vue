<template>
  <header class="bg-[var(--gray-900)] border-b border-[var(--gray-800)] shadow-lg flex items-center justify-between px-4 md:px-8 py-3 md:py-4 transition-all duration-300">

    <!-- Left: Criar + Convidar -->
    <div class="flex items-center gap-2">
      <button
        @click="showCreateModal = true"
        class="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/8 transition-all duration-200"
      >
        <i class="fa-solid fa-plus text-teal-400 text-xs"></i>
        <span class="hidden sm:inline">Criar</span>
      </button>

      <button
        @click="showInviteModal = true"
        class="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/8 transition-all duration-200"
        title="Convidar colega"
      >
        <i class="fa-solid fa-user-plus text-xs"></i>
        <span class="hidden sm:inline">Convidar</span>
      </button>
    </div>

    <!-- Center: Search -->
    <HeaderSearchBar v-model="search" @search="$emit('search', $event)" />

    <!-- Right: Notifications + Profile -->
    <div class="flex items-center gap-1 md:gap-2">
      <HeaderNotifications :notifications="notifications" :show="showNotifications" @toggle="toggleNotifications" />
      <HeaderProfile :show="showProfile" :user="currentUser" @toggle="toggleProfile" @logout="handleLogout" @close="showProfile = false" />
    </div>

    <!-- Modals -->
    <InviteColleagueModal :open="showInviteModal" @close="showInviteModal = false" @invite="handleInviteColleague" />

    <CreateModal
      v-model:open="showCreateModal"
      @create-task="handleCreateTask"
      @create-team="handleCreateTeam"
    />

    <CreateTeamModal v-model:open="isCreateTeamOpen" />
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '@/services/authService'
import CreateModal from '@/components/common/CreateModal.vue'
import CreateTeamModal from '@/components/teams/CreateTeamModal.vue'
import HeaderSearchBar from '@/components/header/HeaderSearchBar.vue'
import HeaderNotifications from '@/components/header/HeaderNotifications.vue'
import HeaderProfile from '@/components/header/HeaderProfile.vue'
import InviteColleagueModal from '@/components/header/InviteColleagueModal.vue'

const router = useRouter()
const search = ref('')
const showNotifications = ref(false)
const showProfile = ref(false)
const showCreateModal = ref(false)
const isCreateTeamOpen = ref(false)
const showInviteModal = ref(false)

// Empty — real notifications will come from the API in the future
const notifications = ref([])

// User — loaded from /home endpoint cache (stored by HomePage)
const currentUser = ref(null)

onMounted(() => {
  try {
    const cached = sessionStorage.getItem('home_user')
    if (cached) currentUser.value = JSON.parse(cached)
  } catch {}
})

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

async function handleCreateTask(payload) {
  if (!payload?.title) return
  try {
    const { createTask } = await import('@/services/taskService.js')
    await createTask(payload)
    window.location.reload()
  } catch (error) {
    console.error('Erro ao criar tarefa:', error)
  }
}

function handleCreateTeam() {
  isCreateTeamOpen.value = true
}

function handleInviteColleague(email) {
  // TODO: integrate with invite API
}

// Close dropdowns on outside click
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
.dropdown-enter-active { animation: slideDown 0.2s ease-out; }
.dropdown-leave-active { animation: slideDown 0.15s ease-in reverse; }
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
