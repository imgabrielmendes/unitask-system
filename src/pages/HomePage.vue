<template>
  <div>
    <h1 class="text-xl font-semibold text-gray-900">Bem-vindo à Home Page!</h1>
    <p class="text-sm text-gray-600 mb-4">Este é o conteúdo da página inicial.</p>

    <TaskList :tasks="tarefas" />

    <div class="mt-4 flex gap-2">
    <buttonteste @click="isCreateOpen = true" variant="secondary" size="md">
      Nova tarefa
    </buttonteste>

    <buttonteste @click="handleClick" variant="primary" size="md">
      Clique Aqui
    </buttonteste>

    <buttonteste variant="danger" size="sm" disabled>
      Deletar
    </buttonteste>
    </div>

    <CreateTaskModal
      v-model:open="isCreateOpen"
      :projects="projectOptions"
      :loading="isCreating"
      :error="createError"
      @submit="handleCreateSubmit"
    />
  </div>
</template>

<script>
import {createTask, gettarefas } from '@/services/taskService.js'
import { getAllProjects } from '@/services/homeService.js'
import TaskList from '@/components/tasks/TaskList.vue'
import CreateTaskModal from '@/components/tasks/forms/CreateTaskModal.vue'

import buttonteste from '@/components/ui/button.vue'

export default {
  name: 'HomePage',
  components: {
    TaskList,
    CreateTaskModal,
    buttonteste
  },
  data() {
    return {
      tarefas: [],
      projectOptions: [],
      isCreateOpen: false,
      isCreating: false,
      createError: '',
    }
  },
  async mounted() {
    await Promise.all([this.fetchTasks(), this.fetchProjects()])
  },
  methods: {
    
    async fetchTasks() {
      try {
        const responseTask = await gettarefas()
        this.tarefas = responseTask.data
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error)
        this.tarefas = []
      }
    },

    handleClick() {
      alert('Botão clicado!')
    },

    async fetchProjects() {
      try {
        const response = await getAllProjects()
        const projects = response?.data ?? []
        this.projectOptions = Array.isArray(projects)
          ? projects.map((p) => ({
              value: p.id,
              label: p.name ?? p.title ?? `Projeto #${p.id}`,
            }))
          : []
      } catch (error) {
        this.projectOptions = []
      }
    },
    async handleCreateSubmit(payload) {
      this.createError = ''
      if (!payload?.title) {
        this.createError = 'Informe um título para a tarefa.'
        return
      }

      this.isCreating = true

      try {
        const response = await createTask(payload)
        const created = response?.data?.task ?? response?.data

        if (created) {
          this.tarefas = [created, ...this.tarefas]
        } 
        
        else {
          await this.fetchTasks()
        }

        this.isCreateOpen = false
      } 

      catch (error) {
        this.createError = error?.response?.data?.message || error?.message || 'Erro ao criar tarefa.'
      } 
      finally {
        this.isCreating = false
      }

    }
  }
}
</script>
