<template>
  <Dialog :open="open" @close="$emit('update:open', false)" class="relative z-50">
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl shadow-2xl w-full max-w-md p-6 backdrop-blur-xl">
        <h2 class="text-2xl font-bold text-white mb-6">Criar Nova Equipe</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-6">
            <label class="block text-gray-300 mb-2 font-medium">Nome da Equipe</label>
            <input 
              v-model="teamName" 
              type="text" 
              class="w-full bg-[var(--gray-800)] border border-[var(--gray-700)] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors" 
              placeholder="Digite o nome da equipe..."
              required 
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-300 mb-2 font-medium">Descrição (opcional)</label>
            <textarea 
              v-model="teamDescription" 
              class="w-full bg-[var(--gray-800)] border border-[var(--gray-700)] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors resize-none" 
              placeholder="Digite uma descrição..."
              rows="3"
            ></textarea>
          </div>
          <div class="flex justify-end gap-3">
            <button 
              type="button" 
              @click="$emit('update:open', false)" 
              class="px-5 py-2.5 bg-[var(--gray-800)] text-gray-300 rounded-lg hover:bg-[var(--gray-700)] transition-all duration-200 font-medium"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:from-teal-500 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              Criar Equipe
            </button>
          </div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { createTeam } from '@/services/teamService.js'

const props = defineProps({
  open: Boolean
})

const emit = defineEmits(['update:open', 'created'])

const teamName = ref('')
const teamDescription = ref('')

async function handleSubmit() {
  try {
    const response = await createTeam({
      name: teamName.value,
      description: teamDescription.value
    })
    
    teamName.value = ''
    teamDescription.value = ''
    emit('created', response.data)
    emit('update:open', false)
    
    // Recarregar página para atualizar a sidebar
    window.location.reload()
  } catch (error) {
    console.error('Erro ao criar time:', error)
  }
}
</script>
