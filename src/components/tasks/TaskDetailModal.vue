<template>
  <Dialog :open="open" @close="$emit('update:open', false)" class="relative z-50">
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-2xl bg-[var(--gray-900)] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

        <!-- Top bar -->
        <div class="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/5">
          <div class="flex items-center gap-2">
            <span :class="statusConfig[task.status]?.badge ?? 'bg-gray-500/20 text-gray-300 border border-gray-500/30'"
              class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold">
              <i :class="statusConfig[task.status]?.icon ?? 'fa-solid fa-circle'" class="text-[10px]"></i>
              {{ statusConfig[task.status]?.label ?? task.status }}
            </span>
            <span :class="priorityConfig[task.priority]?.badge ?? 'bg-gray-500/20 text-gray-300 border border-gray-500/30'"
              class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold">
              <i :class="priorityConfig[task.priority]?.icon ?? 'fa-solid fa-minus'" class="text-[10px]"></i>
              {{ priorityConfig[task.priority]?.label ?? task.priority ?? 'Sem prioridade' }}
            </span>
          </div>
          <button @click="$emit('update:open', false)" class="text-gray-500 hover:text-white transition-colors">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <!-- Title & description -->
        <div class="px-6 py-5">
          <h2 class="text-2xl font-bold text-white mb-2">{{ task.title }}</h2>
          <p v-if="task.description" class="text-sm text-gray-400 leading-relaxed">{{ task.description }}</p>
          <p v-else class="text-sm text-gray-600 italic">Sem descrição</p>
        </div>

        <!-- Meta row -->
        <div class="flex flex-wrap gap-4 px-6 pb-4 border-b border-white/5">

          <!-- Assigned -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500 uppercase tracking-wider">Atribuído a</span>
            <span v-if="task.assigned_user_id" class="flex items-center gap-1.5 text-sm text-gray-200">
              <div class="w-5 h-5 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center text-white text-[10px] font-bold">
                {{ String(task.assigned_user_id)[0] }}
              </div>
              Usuário #{{ task.assigned_user_id }}
            </span>
            <span v-else class="text-sm text-gray-500">—</span>
          </div>

          <!-- Due date -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500 uppercase tracking-wider">Prazo</span>
            <span v-if="task.due_date" :class="isOverdue ? 'text-red-400' : 'text-gray-200'" class="text-sm flex items-center gap-1">
              <i class="fa-regular fa-calendar text-teal-400 text-xs"></i>
              {{ formatDate(task.due_date) }}
              <span v-if="isOverdue" class="text-red-400 text-xs ml-1">(atrasada)</span>
            </span>
            <span v-else class="text-sm text-gray-500">—</span>
          </div>

          <!-- Team -->
          <div v-if="task.team_id" class="flex items-center gap-2">
            <span class="text-xs text-gray-500 uppercase tracking-wider">Time</span>
            <span class="text-sm text-gray-200 flex items-center gap-1">
              <i class="fa-solid fa-users text-teal-400 text-xs"></i>
              Time #{{ task.team_id }}
            </span>
          </div>
        </div>

        <!-- Subtasks -->
        <div v-if="task.subtasks?.length" class="px-6 py-4 border-b border-white/5">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-500">Subtarefas</span>
            <span class="text-xs text-teal-400 font-medium">{{ completedCount }}/{{ task.subtasks.length }}</span>
          </div>
          <div class="h-1 rounded-full bg-white/10 overflow-hidden mb-3">
            <div class="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded-full transition-all duration-500"
              :style="{ width: subtaskProgress + '%' }"></div>
          </div>
          <div class="space-y-2">
            <div v-for="(sub, i) in task.subtasks" :key="i" class="flex items-center gap-2.5">
              <div class="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0"
                :class="sub.done ? 'bg-gradient-to-br from-teal-500 to-green-500 border-transparent' : 'border-white/20'">
                <i v-if="sub.done" class="fa-solid fa-check text-white" style="font-size:9px"></i>
              </div>
              <span class="text-sm" :class="sub.done ? 'line-through text-gray-600' : 'text-gray-300'">{{ sub.title }}</span>
            </div>
          </div>
        </div>

        <!-- Timestamps -->
        <div class="px-6 py-3 flex items-center justify-between text-xs text-gray-600">
          <span>Criada em {{ formatDateTime(task.created_at) }}</span>
          <span v-if="task.updated_at !== task.created_at">Atualizada em {{ formatDateTime(task.updated_at) }}</span>
        </div>

        <!-- Footer actions -->
        <div class="flex items-center justify-end gap-3 px-6 py-4 bg-white/[0.02] border-t border-white/5">
          <button
            @click="$emit('update:open', false)"
            class="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Fechar
          </button>
          <button
            @click="$emit('edit', task)"
            class="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-teal-500 to-green-500 text-white hover:from-teal-400 hover:to-green-400 transition-all duration-200 shadow-lg shadow-teal-900/30"
          >
            <i class="fa-solid fa-pen mr-1.5"></i>
            Editar
          </button>
        </div>

      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'

const props = defineProps({
  open: Boolean,
  task: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['update:open', 'edit'])

const statusConfig = {
  pending:     { label: 'Pendente',     icon: 'fa-solid fa-clock',        badge: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' },
  in_progress: { label: 'Em progresso', icon: 'fa-solid fa-spinner',      badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
  done:        { label: 'Concluída',    icon: 'fa-solid fa-circle-check', badge: 'bg-green-500/20 text-green-300 border border-green-500/30' },
}

const priorityConfig = {
  high:   { label: 'Alta',  icon: 'fa-solid fa-arrow-up',   badge: 'bg-red-500/20 text-red-300 border border-red-500/30' },
  medium: { label: 'Média', icon: 'fa-solid fa-minus',       badge: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' },
  low:    { label: 'Baixa', icon: 'fa-solid fa-arrow-down',  badge: 'bg-green-500/20 text-green-300 border border-green-500/30' },
}

const isOverdue = computed(() => {
  if (!props.task.due_date) return false
  return new Date(props.task.due_date) < new Date()
})

const completedCount = computed(() => props.task.subtasks?.filter(s => s.done).length ?? 0)
const subtaskProgress = computed(() => {
  const total = props.task.subtasks?.length ?? 0
  return total ? Math.round((completedCount.value / total) * 100) : 0
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

function formatDateTime(isoStr) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>
