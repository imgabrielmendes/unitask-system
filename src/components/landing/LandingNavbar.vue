<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a href="#inicio" @click.prevent="scrollTo('inicio')" class="flex items-center gap-2 group">
        <!-- <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-200">
          <i class="fa-solid fa-check-double text-white text-sm"></i>
        </div> -->
        <span class="text-xl font-bold bg-white bg-clip-text text-transparent">
          UniTask
        </span>
      </a>

      <!-- Nav Links - Desktop -->
      <nav class="hidden md:flex items-center gap-1">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          @click.prevent="scrollTo(link.id)"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            activeSection === link.id
              ? 'text-teal-400 bg-teal-400/10'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          ]"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- CTA Buttons -->
      <div class="hidden md:flex items-center gap-3">
        <router-link
          to="/login"
          class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
        >
          Entrar
        </router-link>
        <router-link
          to="/register"
          class="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-teal-500/20"
        >
          Começar grátis
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
      >
        <i :class="mobileOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" class="text-white"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden bg-[#0f0f0f]/98 border-t border-white/5 px-6 py-4 flex flex-col gap-2">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          @click.prevent="scrollTo(link.id); mobileOpen = false"
          class="px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
        >
          <i :class="link.icon" class="mr-2 text-teal-400"></i>
          {{ link.label }}
        </a>
        <div class="border-t border-white/5 mt-2 pt-4 flex flex-col gap-2">
          <router-link to="/login" class="px-4 py-3 text-sm font-medium text-center text-gray-300 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
            Entrar
          </router-link>
          <router-link to="/register" class="px-4 py-3 text-sm font-semibold text-center bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl hover:opacity-90 transition-all">
            Começar grátis
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const activeSection = ref('inicio')
const mobileOpen = ref(false)

const navLinks = [
  { id: 'inicio', label: 'Início', icon: 'fa-solid fa-home' },
  { id: 'funcionalidades', label: 'Funcionalidades', icon: 'fa-solid fa-star' },
  { id: 'como-funciona', label: 'Como funciona', icon: 'fa-solid fa-circle-info' },
  { id: 'times', label: 'Times', icon: 'fa-solid fa-users' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleScroll() {
  scrolled.value = window.scrollY > 30

  // Determine active section
  const sections = navLinks.map(l => l.id)
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i])
    if (el && window.scrollY >= el.offsetTop - 120) {
      activeSection.value = sections[i]
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
