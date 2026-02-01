<template>
  <Dialog :open="open" @close="$emit('update:open', false)" class="relative z-50">
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-md rounded-2xl bg-[var(--gray-900)] p-8 shadow-2xl border border-teal-500/20">
        
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-white">O que deseja criar?</h2>
          <button
            @click="$emit('update:open', false)"
            class="text-gray-400 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <!-- Opções -->
        <div class="space-y-4">
          <!-- Criar Tarefa -->
          <button
            @click="handleCreateTask"
            class="w-full flex items-center gap-4 p-6 bg-gradient-to-r from-teal-900/30 to-green-900/30 border border-teal-500/30 rounded-xl hover:border-teal-400/50 hover:from-teal-900/50 hover:to-green-900/50 transition-all duration-200 group"
          >
            <div class="w-12 h-12 bg-teal-600/20 rounded-full flex items-center justify-center group-hover:bg-teal-600/30 transition">
              <i class="fa-solid fa-tasks text-2xl text-teal-400"></i>
            </div>
            <div class="text-left flex-1">
              <h3 class="text-lg font-bold text-white mb-1">Nova Tarefa</h3>
              <p class="text-sm text-gray-400">Crie uma nova tarefa para seu projeto</p>
            </div>
            <i class="fa-solid fa-chevron-right text-gray-400 group-hover:text-teal-400 transition"></i>
          </button>

          <!-- Criar Time -->
          <button
            @click="handleCreateTeam"
            class="w-full flex items-center gap-4 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl hover:border-purple-400/50 hover:from-purple-900/50 hover:to-pink-900/50 transition-all duration-200 group"
          >
            <div class="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center group-hover:bg-purple-600/30 transition">
              <i class="fa-solid fa-users text-2xl text-purple-400"></i>
            </div>
            <div class="text-left flex-1">
              <h3 class="text-lg font-bold text-white mb-1">Novo Time</h3>
              <p class="text-sm text-gray-400">Organize uma equipe para colaborar</p>
            </div>
            <i class="fa-solid fa-chevron-right text-gray-400 group-hover:text-purple-400 transition"></i>
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup>
import { Dialog, DialogPanel } from '@headlessui/vue'

const props = defineProps({
  open: Boolean
})

const emit = defineEmits(['update:open', 'create-task', 'create-team'])

function handleCreateTask() {
  emit('update:open', false)
  emit('create-task')
}

function handleCreateTeam() {
  emit('update:open', false)
  emit('create-team')
}
</script>
