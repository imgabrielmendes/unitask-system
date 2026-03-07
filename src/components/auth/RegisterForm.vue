<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-950">
    <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl border border-gray-800">
      <!-- Painel Esquerdo -->
      <section class="p-8 md:p-10 bg-gradient-to-br from-teal-600 to-green-500">
        <h2 class="text-4xl font-bold text-white leading-tight">
          Comece agora
          <br />
          com a Unitask
        </h2>

        <p class="mt-4 text-white/80 max-w-sm">
          Leva menos de um minuto para criar sua conta e começar a organizar seu trabalho.
        </p>

        <div class="mt-10 grid gap-3">
          <div class="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-4 border border-white/15">
            <div class="w-9 h-9 rounded-full bg-black/20 text-white flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div class="text-white">
              <p class="font-semibold">Crie sua conta</p>
              <p class="text-sm text-white/70">Preencha seus dados básicos</p>
            </div>
          </div>

          <div class="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-4 border border-white/10">
            <div class="w-9 h-9 rounded-full bg-black/15 text-white/90 flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div class="text-white/90">
              <p class="font-semibold">Entre no seu workspace</p>
              <p class="text-sm text-white/60">Visualize times e tarefas</p>
            </div>
          </div>

          <div class="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-4 border border-white/10">
            <div class="w-9 h-9 rounded-full bg-black/15 text-white/90 flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <div class="text-white/90">
              <p class="font-semibold">Organize e colabore</p>
              <p class="text-sm text-white/60">Crie tarefas e participe de times</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Painel Direito (Form) -->
      <section class="p-8 md:p-10 bg-gray-950">
        <div class="max-w-md">
          <h1 class="text-2xl font-semibold text-white">Criar conta</h1>
          <p class="mt-1 text-sm text-gray-400">Informe seus dados para continuar.</p>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              class="flex items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900/30 px-4 py-3 text-sm text-white hover:bg-gray-900/50 transition"
            >
              <i class="fa-brands fa-google"></i>
              Google
            </button>

            <button
              type="button"
              class="flex items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900/30 px-4 py-3 text-sm text-white hover:bg-gray-900/50 transition"
            >
              <i class="fa-brands fa-github"></i>
              GitHub
            </button>
          </div>

          <div class="my-6 flex items-center gap-3">
            <div class="h-px flex-1 bg-gray-800"></div>
            <span class="text-xs text-gray-500">Ou</span>
            <div class="h-px flex-1 bg-gray-800"></div>
          </div>

          <form @submit="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-300 mb-2">Nome completo</label>
              <input
                v-model="name"
                type="text"
                class="w-full rounded-xl border border-gray-800 bg-gray-900/30 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-teal-500"
                placeholder="Ex.: João da Silva"
                required
              />
            </div>

            <div>
              <label class="block text-sm text-gray-300 mb-2">Email</label>
              <input
                v-model="email"
                type="email"
                class="w-full rounded-xl border border-gray-800 bg-gray-900/30 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-teal-500"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label class="block text-sm text-gray-300 mb-2">Senha</label>
              <input
                v-model="password"
                type="password"
                class="w-full rounded-xl border border-gray-800 bg-gray-900/30 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-teal-500"
                placeholder="Digite sua senha"
                required
              />
            </div>

            <div>
              <label class="block text-sm text-gray-300 mb-2">Confirmar senha</label>
              <input
                v-model="passwordConfirmation"
                type="password"
                class="w-full rounded-xl border border-gray-800 bg-gray-900/30 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-teal-500"
                placeholder="Repita sua senha"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full rounded-xl bg-gradient-to-r from-teal-500 to-green-500 py-3 font-semibold text-white hover:opacity-95 transition disabled:opacity-70 disabled:cursor-not-allowed"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Criar conta</span>
              <span v-else class="flex items-center justify-center gap-2">
                <i class="fa-solid fa-spinner fa-spin"></i>
                Criando...
              </span>
            </button>

            <p class="text-center text-sm text-gray-400">
              Já tem uma conta?
              <router-link to="/login" class="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                Fazer login
              </router-link>
            </p>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const isLoading = ref(false)
const router = useRouter()

async function handleSubmit(event) {
  event.preventDefault()
  
  if (password.value !== passwordConfirmation.value) {
    alert('As senhas não coincidem!')
    return
  }
  
  isLoading.value = true
  
  try {
    await api.post('register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    })
    
    alert('Conta criada com sucesso! Faça login para continuar.')
    router.push('/login')
  } catch (error) {
    alert('Erro ao criar conta: ' + (error.response?.data?.message || error.message))
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>

</style>
