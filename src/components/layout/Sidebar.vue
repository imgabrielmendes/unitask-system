<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <img src="@/assets/logo.svg" alt="Logo" class="h-10 mx-auto" />
    </div>
    <!-- Navegação principal -->
    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="sidebar-link"
        active-class="sidebar-link-active"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
    <!-- Seção de times/projetos -->
    <div class="sidebar-section">
      <h3 class="sidebar-section-title">Times</h3>
      <ul>
        <li v-for="team in teams" :key="team.id">
          <router-link :to="`/team/${team.id}`" class="sidebar-team-link">
            <i class="fa-solid fa-circle text-xs mr-2" :style="{ color: team.color || 'var(--gray-400)' }"></i>
            {{ team.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <!-- Rodapé -->
    <div class="sidebar-footer">
      <router-link to="/profile" class="sidebar-link">
        <i class="fa-solid fa-user"></i>
        <span>Perfil</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
const navItems = [
  { to: '/', label: 'Dashboard', icon: 'fa-solid fa-house' },
  { to: '/tasks', label: 'Tarefas', icon: 'fa-solid fa-list-check' },
  // ...adicione mais itens
]
const teams = [
  { id: 1, name: 'Frontend', color: '#a855f7' },
  { id: 2, name: 'Backend', color: '#6366f1' },
  // ...adicione mais times
]
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: var(--gray-900);
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0; top: 0;
  border-right: 1px solid var(--gray-800);
  z-index: 30;
}
.sidebar-logo {
  padding: 2rem 0 1rem 0;
  text-align: center;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1.5rem;
}
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #fff;
  text-decoration: none;
  transition: background 0.2s;
}
.sidebar-link:hover,
.sidebar-link-active {
  background: var(--gray-800);
  color: #fff;
}
.sidebar-section {
  margin: 2rem 0 0 0;
  padding: 0 1.5rem;
}
.sidebar-section-title {
  font-size: 0.9rem;
  color: var(--gray-400);
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.sidebar-team-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--gray-300);
  padding: 0.5rem 0;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s;
}
.sidebar-team-link:hover {
  background: var(--gray-800);
  color: #fff;
}
.sidebar-footer {
  margin-top: auto;
  padding: 1.5rem;
  border-top: 1px solid var(--gray-800);
}
@media (max-width: 900px) {
  .sidebar {
    width: 64px;
    min-width: 64px;
  }
  .sidebar-logo img { height: 2rem; }
  .sidebar-link span,
  .sidebar-section-title,
  .sidebar-team-link {
    display: none;
  }
}
</style>
