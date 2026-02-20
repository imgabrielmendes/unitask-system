<template>
  <transition name="modal">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="$emit('close')">
      <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-2xl shadow-2xl w-full max-w-md mx-4 relative overflow-hidden">
        <!-- Header da modal -->
        <div class="flex items-center justify-between p-5 border-b border-[var(--gray-800)]">
          <div class="flex items-center gap-3">
            <div class="bg-teal-600/20 p-2 rounded-lg">
              <i class="fa-solid fa-user-plus text-teal-400 text-lg"></i>
              
            </div>
            <h2 class="text-lg font-semibold text-white">Convidar colega</h2>
          </div>
          <button
            class="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-[var(--gray-800)]"
            @click="$emit('close')"
          >
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <!-- Corpo da modal -->
        <div class="p-5">
          <p class="text-gray-400 text-sm mb-5">Envie um convite de acesso à plataforma para um colega pelo e-mail dele.</p>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1.5">E-mail do colega</label>
              <div class="relative">
                <i class="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
                <input
                  v-model="email"
                  type="email"
                  required
                  :disabled="loading"
                  class="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[var(--gray-800)] text-white border border-[var(--gray-700)] focus:border-teal-500 outline-none placeholder:text-gray-600 transition-all duration-200 disabled:opacity-50"
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>

            <!-- Feedback de erro -->
            <transition name="fade">
              <div v-if="error" class="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <i class="fa-solid fa-circle-exclamation"></i>
                <span>{{ error }}</span>
              </div>
            </transition>

            <!-- Feedback de sucesso -->
            <transition name="fade">
              <div v-if="success" class="flex items-center gap-2 text-teal-400 text-sm bg-teal-500/10 border border-teal-500/20 rounded-lg px-3 py-2">
                <i class="fa-solid fa-circle-check"></i>
                <span>Convite enviado com sucesso para <strong>{{ sentEmail }}</strong>!</span>
              </div>
            </transition>

            <!-- Botões -->
            <div class="flex gap-3 pt-1">
              <button
                type="button"
                class="flex-1 py-2.5 rounded-lg border border-[var(--gray-700)] text-gray-300 hover:bg-[var(--gray-800)] transition-colors text-sm font-medium"
                @click="$emit('close')"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-500 transition-colors text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <i v-if="loading" class="fa-solid fa-spinner animate-spin"></i>
                <i v-else class="fa-solid fa-paper-plane"></i>
                <span>{{ loading ? 'Enviando...' : 'Enviar convite' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { sendInvite } from '@/services/inviteService.js'

const props = defineProps({
  open: Boolean
})
const emit = defineEmits(['close', 'invite'])

const email = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)
const sentEmail = ref('')

async function handleSubmit() {
  error.value = ''
  success.value = false

  if (!email.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
    error.value = 'Digite um e-mail válido.'
    return
  }

  loading.value = true
  try {
    await sendInvite(email.value)
    sentEmail.value = email.value
    success.value = true
    emit('invite', email.value)
    email.value = ''
    setTimeout(() => {
      success.value = false
      emit('close')
    }, 2000)
  } catch (err) {
    error.value = err?.response?.data?.message || 'Erro ao enviar convite. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.modal-enter-active {
  animation: modalIn 0.25s ease-out;
}
.modal-leave-active {
  animation: modalIn 0.2s ease-in reverse;
}
@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
