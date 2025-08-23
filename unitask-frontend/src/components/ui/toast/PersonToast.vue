<template>
  <div class="bg-richBlackTwo rounded-2xl shadow p-6 w-full max-w-md">

    <div v-if="loading" class="flex h-32 text-mint">
      Carregando membros...
    </div>

    <div v-else-if="error" class="flex justify-center items-center h-32 text-emerald font-semibold">
      Oops! Não foi possível carregar os membros.
    </div>

    <div v-else-if="tasks.length > 0" class="grid gap-4">
      <div 
        v-for="task in tasks" 
        :key="task.id" 
        class="bg-richBlackOne rounded-2xl shadow-md w-full p-5 border border-richBlackTwo flex flex-col gap-3 hover:shadow-lg transition"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-richBlack font-bold">
            {{ task.nome.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h3 class="font-heading text-white text-lg">{{ task.nome }}</h3>
            <p class="text-hookersGreen text-sm">{{ task.posicao }}</p>
          </div>
        </div>

        <p class="text-antiflashWhite text-sm leading-snug">
          Usuário: <span class="text-mint">{{ task.user }}</span>
        </p>
        <p class="text-antiflashWhite text-sm leading-snug">
          Time: <span class="text-mint">{{ task.time }}</span>
        </p>
      </div>
    </div>

    <div v-else class="text-center text-antiflashWhite mt-8">
      Nenhum membro encontrado.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllMembers } from '@/services/taskService'

const tasks = ref([])
const loading = ref(true)
const error = ref(null)

const fetchTasks = async () => {
  try {
    const response = await getAllMembers()
    tasks.value = response.data
  } catch(err) {
    console.error('Falha ao buscar membros:', err)
    error.value = 'Falha ao buscar dados.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTasks()
})
</script>
