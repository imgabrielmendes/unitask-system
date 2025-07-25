<!-- src\components\auth\LoginForm.vue -->
<script setup>
import { ref } from 'vue'
import InputText from '@/components/ui/InputText.vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <form class="space-y-4 ">
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
