<template>
  <div class="bg-richBlackTwo rounded-2xl shadow p-6 w-full max-w-md">
    <h2 class="text-xl font-semibold mb-4 text-white-800">Tarefas</h2>

    <div v-if="loading" class="text-center text-white-400">
      Carregando tarefas...
    </div>

    <div v-else-if="error" class="text-center text-red-400">
      Oops! Não foi possível carregar as tarefas. Tente novamente mais tarde.
    </div>

    <ul v-else-if="tasks.length > 0" class="space-y-3">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center gap-3"
      >
        <input
          type="checkbox"
          v-model="task.done"
          :id="'task-' + task.id"
          class="accent-blue-500 w-5 h-5"
        />
        <label
          :for="'task-' + task.id"
          class="cursor-pointer"
          :class="[
            'transition',
            task.done ? 'line-through text-white-400' : 'text-white-800',
          ]"
        >
          {{ task.label }}
        </label>
      </li>
    </ul>

    <div v-else class="text-center text-white-400">
      Nenhuma tarefa encontrada.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gettarefas } from '@/services/taskService'

const tasks = ref([])
const loading = ref(true)
const error = ref(null)

const fetchTasks = async () => {
  try {
    const response = await gettarefas()
    tasks.value = response.data
  } catch (err) {
    console.error('Falha ao buscar tarefas:', err)
    error.value = 'Falha ao buscar dados.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTasks()
})
</script>