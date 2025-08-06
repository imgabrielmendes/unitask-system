<!-- src/components/TaskCard.vue -->
<template>
  <div class="bg-richBlackTwo rounded-2xl shadow p-6 w-full max-w-md">
    <h2 class="text-xl font-semibold mb-4 text-white-800">Tarefas</h2>

    <ul class="space-y-3">
      <li
        v-for="(task, index) in tasks"
        :key="index"
        class="flex items-center gap-3"
      >
        <input
          type="checkbox"
          v-model="task.done"
          :id="'task-' + index"
          class="accent-blue-500 w-5 h-5"
        />

        <label
          :for="'task-' + index"
          class="cursor-pointer"
          :class="[
            'transition',
            task.done ? 'line-through text-white-400' : 'text-white-800'
          ]"
        >
          {{ task.label }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const tasks = reactive([
  { label: 'Revisar código', done: false },
  { label: 'Enviar e-mail para equipe', done: true },
  { label: 'Criar novo componente', done: false }
])
</script>
