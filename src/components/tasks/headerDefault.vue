<template>
  <header class="bg-white shadow">
    <nav class="mx-auto max-w-7xl flex items-center justify-between p-4 lg:px-8">

      <div class="flex items-center gap-2">
        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" class="h-8 w-auto" alt="Logo" />
        <span class="font-bold text-xl text-gray-800">Unitask</span>
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
            <router-link
              :to="item.to"
              class="block text-gray-700 font-medium hover:text-indigo-600"
              @click="mobileOpen = false"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>

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
  { name: 'Home', to: '/home' },
  { name: 'Perfil', to: '/home/user' },
]

</script>
