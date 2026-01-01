<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">Lista de Tarefas</h2>

    <ul v-if="tasks.length" class="space-y-2">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2"
      >
        <div class="min-w-0">
          <p class="font-medium text-gray-900 truncate">{{ task.title }}</p>
        </div>

        <span
          class="text-sm font-medium"
          :class="task.status ? 'text-green-600' : 'text-red-600'"
        >
          {{ task.status ? 'Concluída' : 'Pendente' }}
        </span>
      </li>
    </ul>

    <p v-else class="text-sm text-gray-600">Nenhuma tarefa encontrada.</p>
  </div>
</template>

<script setup>
defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
})
</script>
