<template>
  <div>
    <h1>Bem-vindo à Home Page!</h1>
    <p>Este é o conteúdo da página inicial.</p>

    <h2>Lista de Tarefas (taskService)</h2>
    <ul v-if="tarefas.length">
      <li v-for="tarefa in tarefas" :key="tarefa.id">
        <strong>{{ tarefa.titulo }}</strong> —
        <span :class="tarefa.concluida ? 'concluida' : 'pendente'">
          {{ tarefa.concluida ? 'Concluída' : 'Pendente' }}
        </span>
      </li>
    </ul>
    <p v-else>Nenhuma tarefa encontrada.</p>

    <h2>Tarefas do Home Service</h2>
    <ul v-if="tarefasHome.length">
      <li v-for="tarefa in tarefasHome" :key="tarefa.id">
        <strong>{{ tarefa.title }}</strong> — 
        <span :class="tarefa.status === 'completed' ? 'concluida' : 'pendente'">
          {{ tarefa.status === 'completed' ? 'Concluída' : 'Pendente' }}
        </span>
        <br />
        <small>Descrição: {{ tarefa.description }}</small><br />
        <small>Prazo: {{ tarefa.due_date }}</small>
      </li>
    </ul>
    <p v-else>Nenhuma tarefa do Home Service encontrada.</p>

    <buttonteste @click="handleClick" variant="primary" size="md">
      Clique Aqui
    </buttonteste>

    <buttonteste variant="danger" size="sm" disabled>
      Deletar
    </buttonteste>
  </div>
</template>

<script>
import { gettarefas } from '@/services/taskService.js'
import { getAllTask } from '@/services/homeService.js'

import buttonteste from '@/components/ui/button.vue'

export default {
  name: 'HomePage',
  components: {
    buttonteste
  },
  data() {
    return {
      tarefas: [],
      tarefasHome: []
    }
  },
  async mounted() {
    try {
      const responseTask = await gettarefas()
      this.tarefas = responseTask.data

      const responseHome = await getAllTask()
      this.tarefasHome = responseHome.data
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error)
      this.tarefas = []
      this.tarefasHome = []
    }
  },
  methods: {
    handleClick() {
      alert('Botão clicado!')
    }
  }
}
</script>

<style scoped>
h1 {
  color: #2c3e50;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 8px 0;
}
.concluida {
  color: green;
}
.pendente {
  color: red;
}
</style>
