<template>
  <Dialog :open="open" @close="handleClose" class="relative z-50">
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-md bg-[var(--gray-900)] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

        <!-- Top bar -->
        <div class="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/5">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <i class="fa-solid fa-users text-purple-400 text-xs"></i>
            </div>
            <h2 class="text-base font-semibold text-white">Novo Time</h2>
          </div>
          <button @click="handleClose" class="text-gray-500 hover:text-white transition-colors">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="px-6 py-5 space-y-4">

          <!-- Name -->
          <div>
            <input
              v-model="teamName"
              type="text"
              placeholder="Nome do time..."
              class="w-full bg-transparent text-xl font-bold text-white placeholder-gray-600 outline-none border-none"
              required
              autofocus
            />
          </div>

          <!-- Description -->
          <div>
            <textarea
              v-model="teamDescription"
              placeholder="Descrição (opcional)..."
              rows="3"
              class="w-full bg-transparent text-sm text-gray-400 placeholder-gray-600 outline-none border-none resize-none leading-relaxed"
            ></textarea>
          </div>

          <!-- Divider -->
          <div class="border-t border-white/5 pt-4 space-y-3">

            <!-- Visibility toggle -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <i class="fa-solid fa-lock text-xs text-teal-400"></i>
                <span>Privado</span>
              </div>
              <button
                type="button"
                @click="isPrivate = !isPrivate"
                class="relative w-10 h-5 rounded-full transition-colors duration-200"
                :class="isPrivate ? 'bg-teal-500' : 'bg-white/10'"
              >
                <span class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                  :class="isPrivate ? 'translate-x-5' : 'translate-x-0'"></span>
              </button>
            </div>

          </div>

          <!-- Error -->
          <p v-if="error" class="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20 flex items-center gap-2">
            <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              @click="handleClose"
              class="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="!teamName.trim() || loading"
              class="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-teal-500 to-green-500 text-white hover:from-teal-400 hover:to-green-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-teal-900/30"
            >
              <i v-if="loading" class="fa-solid fa-spinner fa-spin mr-1.5"></i>
              <i v-else class="fa-solid fa-users mr-1.5"></i>
              {{ loading ? 'Criando...' : 'Criar Time' }}
            </button>
          </div>

        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { createTeam } from '@/services/teamService.js'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['update:open', 'created'])

const teamName = ref('')
const teamDescription = ref('')
const isPrivate = ref(false)
const loading = ref(false)
const error = ref('')

watch(() => props.open, (val) => {
  if (val) {
    teamName.value = ''
    teamDescription.value = ''
    isPrivate.value = false
    loading.value = false
    error.value = ''
  }
})

function handleClose() {
  emit('update:open', false)
}

async function handleSubmit() {
  if (!teamName.value.trim()) return
  loading.value = true
  error.value = ''
  try {
    const response = await createTeam({
      name: teamName.value.trim(),
      description: teamDescription.value.trim() || null,
      is_private: isPrivate.value,
    })
    emit('created', response.data)
    emit('update:open', false)
    window.location.reload()
  } catch (err) {
    error.value = err?.response?.data?.message || 'Erro ao criar time.'
  } finally {
    loading.value = false
  }
}
</script>
