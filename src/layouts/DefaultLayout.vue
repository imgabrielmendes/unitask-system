<!-- src/layouts/DefaultLayout.vue -->

<template>
  <div class="flex min-h-screen bg-[var(--gray-950)]">
    <SidebarNav :teams="teamOptions" />
    <div 
      :class="['flex-1 transition-all duration-300 ease-in-out', sidebarExpanded ? 'ml-64' : 'ml-20']"
      :style="{ marginLeft: sidebarExpanded ? '256px' : '80px' }"
    >
      <HeaderDynamic />
      <main class="bg-[var(--gray-950)]">
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

    onMounted(() => {
      window.addEventListener('sidebar-toggle', handleSidebarToggle)
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
</style>

<style scoped>

</style>
