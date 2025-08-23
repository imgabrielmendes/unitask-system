<template>
  <div v-if="loading" class="text-center text-white-400">
    Carregando Membros...
  </div>

  <div v-else-if="error" class="text-center text-red-400">
    Oops! Não foi possível carregar os Membros. Tente novamente mais tarde.
  </div>

  <div v-else-if="tasks.length > 0" class="flex flex-row">
    <div v-for="task in tasks" :key="task.id" class="p-2 border rounded m-1">
      {{ task.nome }} - {{ task.user }} - {{ task.posicao }} - {{ task.time }}
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
