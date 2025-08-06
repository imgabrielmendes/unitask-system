<template>
  
  <div class="min-h-40 flex items-center justify-center px-4">
      <Search />
  </div>

  <div class="flex items-center justify-center px-4 gap-2">
      <taskCard></taskCard>
      <PersonCard></PersonCard>
  </div>
  
      <CreateTaskModalVue :isOpen="showModal" @close="showModal = false" />

</template>

<script>
import { ref } from "vue";

//Criar a task
import ButtonAdd from '@/components/ui/button.vue'
import CreateTaskModalVue from '../components/tasks/forms/CreateTaskModal.vue'

//Search de tarefas
import Search from '@/components/ui/Search.vue'


import taskCard from '@/components/ui/cards/TaskCard.vue'
import PersonCard from '@/components/ui/cards/PersonCard.vue';

export default {
  components: {
    ButtonAdd, CreateTaskModalVue ,Search, taskCard, PersonCard
  },
  setup() {
    const showModal = ref(false);
    return { showModal };
  }
};
</script>

<style scoped>

</style>
