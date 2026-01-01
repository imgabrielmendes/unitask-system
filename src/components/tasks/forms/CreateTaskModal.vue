<template>
  <Dialog :open="open" @close="onClose" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <DialogTitle class="text-lg font-semibold text-gray-900">
          Nova tarefa
        </DialogTitle>

        <div class="mt-4">
          <InputText
            id="task-title"
            label="Título"
            placeholder="Ex: Estudar Vue"
            v-model="title"
          />

          <SelectInput
            v-if="projects?.length"
            id="task-project"
            label="Projeto"
            :options="projects"
            v-model="projectId"
          />

          <SelectInput
            id="task-status"
            label="Status"
            :options="statusOptions"
            v-model="status"
          />

          <SelectInput
            id="task-priority"
            label="Prioridade"
            :options="priorityOptions"
            v-model="priority"
          />

          <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <BaseButton variant="secondary" :disabled="loading" @click="onClose">
            Cancelar
          </BaseButton>
          <BaseButton variant="primary" :disabled="loading" @click="onSubmit">
            {{ loading ? 'Salvando...' : 'Salvar' }}
          </BaseButton>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

import InputText from '@/components/ui/InputText.vue'
import SelectInput from '@/components/ui/SelectInput.vue'

import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  open: { 
    type: Boolean, 
    default: false 
},

  loading: { 
    type: Boolean, 
    default: false 
},
  error: { 
    type: String, 
    default: '' 
},
  projects: {
    // Espera [{ value: <id>, label: <nome> }]
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:open', 'submit'])

const title = ref('')
const status = ref('pending')
const priority = ref('low')
const projectId = ref('')

const statusOptions = [
  { value: 'pending', label: 'Pendente' },
  { value: 'done', label: 'Concluída' },
]

const priorityOptions = [
  { value: 'low', label: 'Baixa' },
  { value: 'high', label: 'Alta' },
]

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      title.value = ''
      status.value = 'pending'
      priority.value = 'low'
      projectId.value = props.projects?.[0]?.value ?? ''
    }
  }
)

function onClose() {
  emit('update:open', false)
}

function onSubmit() {
  const trimmedTitle = title.value.trim()
  emit('submit', {
    title: trimmedTitle,
    status: status.value,
    priority: priority.value,
    project_id: projectId.value || null,
  })
}
</script>
