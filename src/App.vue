<!-- src/App.vue -->
<template>
  <div id="app" class="min-h-screen bg-[var(--gray-950)]">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  background-color: var(--gray-950);
}
</style>
