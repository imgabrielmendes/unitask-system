<template>
  <transition name="fade">
    <div v-if="task" class="fixed inset-0 z-50 flex">
      <!-- Overlay escuro -->
      <div 
        class="fixed inset-0 bg-black/40 transition-opacity duration-300" 
        @click="!pinned && $emit('close')"
      />
      <!-- Drawer -->
      <div :class=" [
        'relative bg-[#1a1a1a] shadow-2xl border-l border-teal-900/40 flex flex-col',
        pinned ? 'mx-auto my-auto rounded-2xl w-full max-w-2xl h-auto min-h-[400px]' : 'ml-auto h-full w-full max-w-md',
        'transition-all duration-300',
        'backdrop-blur-xl'
      ]">
        <!-- Header do drawer -->
        <div class="flex items-center justify-between p-4 border-b border-teal-900/30">
          <h2 class="text-lg font-bold text-gray-100">Detalhes da Tarefa</h2>
          <div class="flex items-center gap-2">
            <button @click="$emit('toggle-pin')" class="p-2 rounded-full hover:bg-teal-900/30 transition" :title="pinned ? 'Desafixar' : 'Fixar no centro'">
              <svg v-if="!pinned" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6" /></svg>
            </button>
            <button @click="$emit('close')" class="p-2 rounded-full hover:bg-teal-900/30 transition" title="Fechar">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <!-- Conteúdo do drawer -->
        <div class="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
          <div v-if="task.image" class="mb-4">
            <img :src="task.image" alt="Imagem da tarefa" class="rounded-xl w-full object-cover h-40 mb-2 shadow" />
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">{{ task.title }}</h3>
          <p v-if="task.description" class="text-gray-200/80 mb-4">{{ task.description }}</p>
          <div class="flex flex-wrap gap-2 mb-2">
            <span v-for="tag in task.tags" :key="tag" class="px-2 py-0.5 rounded-lg text-xs font-medium bg-teal-900/40 text-teal-300 border border-teal-500/20">{{ tag }}</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-sm text-gray-200/80">
            <div><span class="font-bold">Status:</span> {{ getStatusLabel(task.status) }}</div>
            <div><span class="font-bold">Prioridade:</span> {{ getPriorityLabel(task.priority) }}</div>
            <div v-if="task.dueDate"><span class="font-bold">Entrega:</span> {{ task.dueDate }}</div>
            <div v-if="task.value"><span class="font-bold">Valor:</span> {{ task.value }}</div>
            <div v-if="task.tool"><span class="font-bold">Ferramenta:</span> {{ task.tool }}</div>
            <div v-if="task.messages"><span class="font-bold">Mensagens:</span> {{ task.messages }}</div>
            <div v-if="task.author"><span class="font-bold">Autor:</span> {{ task.author }}</div>
            <div v-if="task.data_criacao"><span class="font-bold">Criada em:</span> {{ task.data_criacao }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  task: Object,
  pinned: Boolean
})
function getStatusLabel(status) {
  const labels = {
    'done': 'Concluída',
    'completed': 'Concluída',
    'in_progress': 'Em Progresso',
    'pending': 'Pendente',
    'active': 'Ativa',
  }
  return labels[status] || 'Pendente'
}
function getPriorityLabel(priority) {
  const labels = {
    'high': 'Alta',
    'medium': 'Média',
    'low': 'Baixa',
  }
  return labels[priority] || 'Normal'
}
</script>
