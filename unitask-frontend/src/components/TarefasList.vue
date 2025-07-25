<template>
  <div>
    <h1>UniTask - Lista de Tarefas</h1>

    <ul>
      <li class="min-h-screen flex items-center justify-center bg-red-100" v-for="tarefa in tarefas" :key="tarefa.id">
        {{ tarefa.titulo }} —
        <span :style="{ color: tarefa.concluida ? 'green' : 'red' }">
          {{ tarefa.concluida ? 'Concluída' : 'Pendente' }}
        </span>
      </li>
    </ul>

    <div class="" v-if="tarefas.length === 0">
      Nenhuma tarefa encontrada.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tarefas: []
    };
  },
  async mounted() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/tarefas');
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas');
      }
      this.tarefas = await response.json();
    } catch (error) {
      console.error(error);
      this.tarefas = [];
    }
  }
};
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
</style>
