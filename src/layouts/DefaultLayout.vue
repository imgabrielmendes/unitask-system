<!-- src/layouts/DefaultLayout.vue -->

<template>
  <div class="flex min-h-screen bg-[var(--gray-950)]">
    <SidebarNav :teams="teamOptions" />
    <div 
      :class="['content-wrapper flex-1 transition-all duration-300 ease-in-out']"
      :style="{ 
        marginLeft: sidebarExpanded ? '256px' : '80px',
      }"
    >
      <HeaderDynamic />
      <main class="bg-[var(--gray-950)] main-content">
        <transition name="page" mode="out-in">
          <router-view/>
        </transition>
      </main>
      <footerUser></footerUser>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import SidebarNav from '@/components/tasks/SidebarNav.vue'
import HeaderDynamic from '@/components/tasks/HeaderDynamic.vue'
import footerUser from '@/components/tasks/footer.vue'
import { getTeams } from '@/services/teamService.js'

export default {
  components: {
    HeaderDynamic,
    footerUser,
    SidebarNav
  },
  setup() {
    const sidebarExpanded = ref(true)
    const teamOptions = ref([])

    const handleSidebarToggle = (event) => {
      sidebarExpanded.value = event.detail.expanded
    }

    const fetchTeams = async () => {
      try {
        const response = await getTeams()
        teamOptions.value = response?.data || []
      } catch (error) {
        console.error('Erro ao buscar times:', error)
        teamOptions.value = []
      }
    }

    onMounted(() => {
      window.addEventListener('sidebar-toggle', handleSidebarToggle)
      fetchTeams()
    })

    onUnmounted(() => {
      window.removeEventListener('sidebar-toggle', handleSidebarToggle)
    })

    return {
      sidebarExpanded,
      teamOptions
    }
  }
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Mobile: remove margem lateral e adiciona margem inferior para o bottom nav */
@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0 !important;
    margin-bottom: 0;
  }
  
  .main-content {
    padding-bottom: 5rem; /* Espaço para o bottom nav */
  }
}

/* Desktop: mantém margens laterais normais */
@media (min-width: 769px) {
  .main-content {
    padding-bottom: 0;
  }
}
</style>
