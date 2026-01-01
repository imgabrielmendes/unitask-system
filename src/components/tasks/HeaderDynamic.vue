<template>
  <component :is="headerComponent" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderDefault from './headerDefault.vue'
import HeaderLandingPage from './headerLadingPage.vue'

const route = useRoute()

const headerComponent = computed(() => {
  const path = route.path?.toLowerCase?.() ?? ''
  const isAuthPage = path.startsWith('/login') || path.startsWith('/register')
  return isAuthPage ? HeaderLandingPage : HeaderDefault
})
</script>
