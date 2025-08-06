<template>
  <header class="bg-richBlackOne shadow">
    <nav class="mx-auto max-w-7xl flex items-center justify-between p-4 lg:px-8">

    <div class="flex items-center justify-center px-4">
        <button @click="showModal = true" class="px-4 py-2 bg-darkSlateGray text-white rounded-xl hover:bg-emerald"> + </button>
    </div>

    </nav>
    
    <CreateTaskModalVue :isOpen="showModal" @close="showModal = false" />
  </header>


</template>


<script>
import { ref } from "vue";


import buttonUi from '@/components/ui/button.vue'
import CreateTaskModalVue from '@/components/tasks/forms/CreateTaskModal.vue'


export default {
  components: {
    buttonUi, CreateTaskModalVue
  },
  setup() {
    const showModal = ref(false);
    return { showModal };
  }
}
</script>

