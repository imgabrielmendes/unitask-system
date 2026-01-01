<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'  // importe o useRouter
import InputText from '@/components/ui/InputText.vue'
import { login } from '@/services/authService'

const email = ref('')
const password = ref('')
const router = useRouter()

async function handleSubmit(event) {
  event.preventDefault()
  try {

    await login(email, password)

      // alert('Login realizado com sucesso!')
      router.push('/home')

  } catch (error) {
      alert('Erro ao fazer login: ' + (error.response?.data?.message || error.message))
  }
}
</script>


<template>
  <form @submit="handleSubmit" class="space-y-4">
    <InputText
      id="email"
      label="Email"
      type="email"
      placeholder="Digite seu email"
      v-model="email"
    />

    <InputText
      id="password"
      label="Senha"
      type="password"
      placeholder="Digite sua senha"
      v-model="password"
    />

    <button type="submit" class="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition">
      Entrar
    </button>
  </form>
</template>
