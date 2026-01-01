<template>
  <header class="bg-white shadow">
    <nav class="mx-auto max-w-7xl flex items-center justify-between p-4 lg:px-8">

      <div class="flex items-center gap-2">
        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" class="h-8 w-auto" alt="Logo" />
        <span class="font-bold text-xl text-gray-800">Unitask</span>
      </div>

      <ul class="hidden lg:flex items-center gap-6">
        <li v-for="item in links" :key="item.name">
          <a :href="item.href" class="text-gray-700 hover:text-indigo-600 font-medium">
            {{ item.name }}
          </a>
        </li>
      </ul>

      <div class="hidden lg:flex items-center gap-4">
        <router-link to="/login" class="text-sm font-medium text-gray-700 hover:text-indigo-600">Entrar</router-link>
        <router-link to="/register" class="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">Cadastrar</router-link>
      </div>

      <button class="lg:hidden text-gray-700" @click="mobileOpen = true">
        <Bars3Icon class="h-6 w-6" />
      </button>
    </nav>

    <Dialog as="div" class="lg:hidden" :open="mobileOpen" @close="mobileOpen = false">
      <DialogPanel class="fixed inset-0 z-50 bg-white p-6 sm:max-w-sm sm:mx-auto sm:mt-8 shadow-xl rounded-xl">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" class="h-8 w-auto" alt="Logo" />
            <span class="font-bold text-xl text-gray-800">Unitask</span>
          </div>
          <button @click="mobileOpen = false">
            <XMarkIcon class="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <ul class="space-y-4">
          <li v-for="item in links" :key="item.name">
            <a :href="item.href" class="block text-gray-700 font-medium hover:text-indigo-600">
              {{ item.name }}
            </a>
          </li>
        </ul>

        <div class="mt-6 border-t pt-4">
          <router-link to="/login" class="block mb-2 text-gray-700 hover:text-indigo-600" @click="mobileOpen = false">Entrar</router-link>
          <router-link
            to="/register"
            class="block text-center bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
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
