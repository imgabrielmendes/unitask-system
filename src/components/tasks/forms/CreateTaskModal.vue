<template>
  <Dialog :open="open" @close="onClose" class="relative z-50">

    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
    <div class="fixed inset-0 flex items-center justify-center p-4">

      <DialogPanel class="
      w-[120rem] max-w-[95vw] min-h-[40rem] max-h-[90vh]
      rounded-3xl 
      bg-[var(--gray-900)]
      p-14 px-28 shadow-2xl 
      border border-teal-500/20
      relative">

        <!-- Header: Esquerda e Direita -->
        <div class="flex items-center justify-between mb-6">
          <span class="text-white text-lg font-semibold flex items-center gap-2">
            <i class="fa-solid fa-chevron-right"></i>
            Nova Tarefa
          </span>
          <button
            @click="onClose"
            class="text-white text-2xl hover:text-teal-400 transition-colors"
            aria-label="Fechar"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Título grande -->
        <div class="col-span-1 md:col-span-2 mb-2">
          <TitleInput
            id="task-title"
            placeholder="Título da tarefa"
            v-model="title"
          />
        </div>

        <div class="flex flex-row gap-4">
          <SelectInput
            v-if="projects?.length"
            id="task-project"
            :options="projects"
            v-model="projectId"
          />
          <SelectInput
            id="task-team"
            :options="teamOptions"
            v-model="teamId"
          />
          <SelectInput
            id="task-priority"
            :options="priorityOptions"
            v-model="priority"
          />
        </div>

        <hr class="border-teal-700/40" />

        <!-- Inputs restantes -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="col-span-1 md:col-span-2">
            <InputText
              id="task-description"
              placeholder="Descrição"
              v-model="description"
            />
          </div>
        </div>

        <p v-if="error" class="mt-4 text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20 flex items-center gap-2">
          <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
        </p>

        <div class="mt-8 flex justify-end gap-3">

          <BaseButton variant="secondary" :disabled="loading" @click="onClose">
            <i class="fa-solid fa-xmark mr-2"></i> <span class="text-white">Cancelar</span>
          </BaseButton>

          <BaseButton variant="primary" :disabled="loading" @click="onSubmit">
            <i class="fa-solid fa-floppy-disk mr-2"></i> <span class="text-white">{{ loading ? 'Salvando...' : 'Salvar' }}</span>
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
import TitleInput from '@/components/ui/TitleInput.vue'

import { getTeams } from '@/services/teamService.js'

import '@fortawesome/fontawesome-free/css/all.min.css'

async function fetchTeams() {

  try {
    const response = await getTeams()
    const teams = response?.data?.data || response?.data || []
    teamOptions.value = Array.isArray(teams)
      ? teams.map(team => ({
          value: team.id,
          label: team.name ?? `Time #${team.id}`
        }))
      : []
  } catch (e) {
    teamOptions.value = []
  }

}

const priorityOptions = [
  { value: 'low', label: 'Baixa' },
  { value: 'high', label: 'Alta' },
]

const teamOptions = ref([])

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
    type: Array,
    default: () => [],
  },
  teams: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits([
  'update:open', 
  'submit'
])

const title = ref('')
const description = ref('')

const status = ref('')
const priority = ref('')

const projectId = ref('') 
const teamId = ref('')

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {

      await fetchTeams()

      title.value = ''
      description.value = ''
      status.value = 'pending'
      priority.value = 'low'
      projectId.value = props.projects?.[0]?.value ?? ''
      teamId.value = teamOptions.value?.[0]?.value ?? ''

    }
  }
)

function onClose() {
  emit('update:open', false)
}

function onSubmit() {
  
  const tittle = title.value.trim()
  const description = description.value.trim()

  emit('submit', {
    project_id: projectId.value,
    team_id: teamId.value,

    title: tittle,
    description: description,
    
    status: status.value,
    priority: priority.value,
  })

}
</script>
