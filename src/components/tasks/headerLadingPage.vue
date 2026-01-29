<template>
  <header class="bg-[#1a1a1a] border-b border-teal-500/20 shadow-lg shadow-teal-900/10">
    <nav class="mx-auto max-w-7xl flex items-center justify-between p-4 lg:px-8">

      <div class="flex items-center gap-2">
        <div class="p-2 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
          </svg>
        </div>
        <span class="font-bold text-xl bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">Unitask</span>
      </div>

      <ul class="hidden lg:flex items-center gap-6">
        <li v-for="item in links" :key="item.name">
          <a :href="item.href" class="text-gray-200 hover:text-teal-400 font-medium transition-colors">
            {{ item.name }}
          </a>
        </li>
      </ul>

      <div class="hidden lg:flex items-center gap-4">
        <router-link to="/login" class="text-sm font-medium text-gray-200 hover:text-teal-400 transition-colors">Entrar</router-link>
        <router-link to="/register" class="bg-gradient-to-r from-teal-600 to-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-teal-500 hover:to-green-500 transition-all shadow-lg shadow-teal-500/25">Cadastrar</router-link>
      </div>

      <button class="lg:hidden text-teal-300 hover:text-teal-400" @click="mobileOpen = true">
        <Bars3Icon class="h-6 w-6" />
      </button>
    </nav>

    <Dialog as="div" class="lg:hidden" :open="mobileOpen" @close="mobileOpen = false">
      <DialogPanel class="fixed inset-0 z-50 bg-[#1a1a1a] p-6 sm:max-w-sm sm:mx-auto sm:mt-8 shadow-xl rounded-xl border border-teal-500/20">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <div class="p-2 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl">
              <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <span class="font-bold text-xl bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">Unitask</span>
          </div>
          <button @click="mobileOpen = false">
            <XMarkIcon class="h-6 w-6 text-teal-300 hover:text-teal-400" />
          </button>
        </div>

        <ul class="space-y-4">
          <li v-for="item in links" :key="item.name">
            <a :href="item.href" class="block text-gray-200 font-medium hover:text-teal-400 transition-colors">
              {{ item.name }}
            </a>
          </li>
        </ul>

        <div class="mt-6 border-t border-teal-500/20 pt-4">
          <router-link to="/login" class="block mb-3 text-gray-200 hover:text-teal-400 transition-colors" @click="mobileOpen = false">Entrar</router-link>
          <router-link
            to="/register"
            class="block text-center bg-gradient-to-r from-teal-600 to-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-teal-500 hover:to-green-500 transition-all shadow-lg shadow-teal-500/25"
            @click="mobileOpen = false"
          >
            Cadastrar
          </router-link>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileOpen = ref(false)

const links = [
  { name: 'Início', href: '#' },
  { name: 'Funcionalidades', href: '#' },
  { name: 'Preços', href: '#' },
  { name: 'Contato', href: '#' }
]
</script>
