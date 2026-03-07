<template>
  <Dialog :open="open" @close="handleClose" class="relative z-50">
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel
        class="w-full shadow-2xl border border-white/10 rounded-2xl bg-[var(--gray-900)] transition-all duration-300"
        :class="step === 'choose' ? 'max-w-md' : 'max-w-2xl'"
      >

        <!-- ─── STEP 1: choose what to create ──────────────────────────── -->
        <template v-if="step === 'choose'">
          <div class="p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-white">O que deseja criar?</h2>
              <button @click="handleClose" class="text-gray-400 hover:text-white transition-colors">
                <i class="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div class="space-y-4">
              <!-- Criar Tarefa -->
              <button
                @click="step = 'task'"
                class="w-full flex items-center gap-4 p-6 bg-gradient-to-r from-teal-900/30 to-green-900/30 border border-teal-500/30 rounded-xl hover:border-teal-400/50 hover:from-teal-900/50 hover:to-green-900/50 transition-all duration-200 group"
              >
                <div class="w-12 h-12 bg-teal-600/20 rounded-full flex items-center justify-center group-hover:bg-teal-600/30 transition">
                  <i class="fa-solid fa-circle-check text-2xl text-teal-400"></i>
                </div>
                <div class="text-left flex-1">
                  <h3 class="text-lg font-bold text-white mb-1">Nova Tarefa</h3>
                  <p class="text-sm text-gray-400">Crie uma nova tarefa para seu projeto</p>
                </div>
                <i class="fa-solid fa-chevron-right text-gray-400 group-hover:text-teal-400 transition"></i>
              </button>

              <!-- Criar Time -->
              <button
                @click="handleCreateTeam"
                class="w-full flex items-center gap-4 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl hover:border-purple-400/50 hover:from-purple-900/50 hover:to-pink-900/50 transition-all duration-200 group"
              >
                <div class="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center group-hover:bg-purple-600/30 transition">
                  <i class="fa-solid fa-users text-2xl text-purple-400"></i>
                </div>
                <div class="text-left flex-1">
                  <h3 class="text-lg font-bold text-white mb-1">Novo Time</h3>
                  <p class="text-sm text-gray-400">Organize uma equipe para colaborar</p>
                </div>
                <i class="fa-solid fa-chevron-right text-gray-400 group-hover:text-purple-400 transition"></i>
              </button>
            </div>
          </div>
        </template>

        <!-- ─── STEP 2: task form ───────────────────────────────────────── -->
        <template v-else-if="step === 'task'">

          <!-- Top bar -->
          <div class="flex items-center justify-between px-6 pt-5 pb-3">
            <button
              @click="step = 'choose'"
              class="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <i class="fa-solid fa-arrow-left text-xs"></i>
              Voltar
            </button>

            <div class="flex items-center gap-3">
              <!-- Priority badge selector -->
              <div class="relative" ref="priorityRef">
                <button
                  @click="showPriorityMenu = !showPriorityMenu"
                  :class="priorityConfig[form.priority].badge"
                  class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-80"
                >
                  <i :class="priorityConfig[form.priority].icon" class="text-[10px]"></i>
                  {{ priorityConfig[form.priority].label }}
                  <i class="fa-solid fa-chevron-down text-[9px] ml-0.5 opacity-70"></i>
                </button>

                <!-- Priority dropdown -->
                <div
                  v-if="showPriorityMenu"
                  class="absolute right-0 top-8 w-36 bg-[var(--gray-900)] rounded-xl shadow-2xl overflow-hidden z-10"
                >
                  <button
                    v-for="(cfg, key) in priorityConfig"
                    :key="key"
                    @click="form.priority = key; showPriorityMenu = false"
                    class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                    :class="form.priority === key ? 'bg-white/5' : ''"
                  >
                    <span :class="[cfg.dot, 'w-2 h-2 rounded-full flex-shrink-0']"></span>
                    <span class="text-gray-200">{{ cfg.label }}</span>
                    <i v-if="form.priority === key" class="fa-solid fa-check text-teal-400 ml-auto text-xs"></i>
                  </button>
                </div>
              </div>

              <button @click="handleClose" class="text-gray-500 hover:text-white transition-colors">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
          </div>

          <div class="px-6 py-5 space-y-1">
            <!-- Title -->
            <input
              v-model="form.title"
              placeholder="Nome da tarefa..."
              class="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-600 outline-none border-none resize-none leading-tight"
            />

            <!-- Description -->
            <textarea
              v-model="form.description"
              placeholder="Adicione uma descrição..."
              rows="3"
              class="w-full bg-transparent text-sm text-gray-400 placeholder-gray-600 outline-none border-none resize-none leading-relaxed mt-1"
            ></textarea>
          </div>

          <!-- Properties row -->
          <div class="flex flex-wrap items-center gap-2 px-6 pb-4 border-b border-white/5">

            <!-- Assign -->
            <div class="relative" ref="assignRef">
              <button
                @click="showAssignMenu = !showAssignMenu"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white border border-white/[0.08] transition-all duration-200"
              >
                <i class="fa-solid fa-user-plus text-xs text-teal-400"></i>
                <span v-if="form.assignee" class="text-gray-200">{{ form.assignee.name }}</span>
                <span v-else class="text-gray-500">Atribuir</span>
              </button>

              <div
                v-if="showAssignMenu"
                class="absolute left-0 top-9 w-48 bg-[var(--gray-900)] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10"
              >
                <div class="px-3 py-2 border-b border-white/5">
                  <input
                    v-model="assignSearch"
                    placeholder="Buscar membro..."
                    class="w-full bg-transparent text-xs text-gray-300 placeholder-gray-600 outline-none"
                  />
                </div>
                <div class="max-h-40 overflow-y-auto">
                  <button
                    v-for="member in filteredMembers"
                    :key="member.id"
                    @click="form.assignee = member; showAssignMenu = false; assignSearch = ''"
                    class="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/5 transition-colors text-left"
                  >
                    <div class="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {{ member.name[0].toUpperCase() }}
                    </div>
                    <span class="text-sm text-gray-200 truncate">{{ member.name }}</span>
                    <i v-if="form.assignee?.id === member.id" class="fa-solid fa-check text-teal-400 ml-auto text-xs"></i>
                  </button>
                  <div v-if="filteredMembers.length === 0" class="px-3 py-3 text-xs text-gray-500 text-center">
                    Nenhum membro encontrado
                  </div>
                </div>
              </div>
            </div>

            <!-- Due date -->
            <label class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white border border-white/[0.08] transition-all duration-200 cursor-pointer">
              <i class="fa-regular fa-calendar text-xs text-teal-400"></i>
              <span v-if="form.due_date" class="text-gray-200">{{ formatDate(form.due_date) }}</span>
              <span v-else class="text-gray-500">Data limite</span>
              <input v-model="form.due_date" type="date" class="sr-only" />
            </label>

            <!-- Clear assignee -->
            <button
              v-if="form.assignee"
              @click="form.assignee = null"
              class="text-gray-600 hover:text-red-400 transition-colors text-xs"
              title="Remover atribuição"
            >
              <i class="fa-solid fa-user-minus"></i>
            </button>
          </div>

          <!-- Subtasks -->
          <div class="px-6 py-4 border-b border-white/5">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-semibold uppercase tracking-wider text-gray-500">Subtarefas</span>
              <span v-if="form.subtasks.length" class="text-xs text-teal-400 font-medium">
                {{ completedSubtasks }}/{{ form.subtasks.length }}
              </span>
            </div>

            <!-- Progress bar -->
            <div v-if="form.subtasks.length" class="mb-3 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded-full transition-all duration-500"
                :style="{ width: subtaskProgress + '%' }"
              ></div>
            </div>

            <!-- Subtask list -->
            <div class="space-y-1 mb-2">
              <div
                v-for="(sub, index) in form.subtasks"
                :key="index"
                class="flex items-center gap-2.5 group py-1"
              >
                <button
                  @click="sub.done = !sub.done"
                  class="w-4 h-4 rounded flex-shrink-0 border transition-all duration-200 flex items-center justify-center"
                  :class="sub.done
                    ? 'bg-gradient-to-br from-teal-500 to-green-500 border-transparent'
                    : 'border-white/20 hover:border-teal-500/60 bg-transparent'"
                >
                  <i v-if="sub.done" class="fa-solid fa-check text-white" style="font-size: 9px"></i>
                </button>
                <input
                  v-model="sub.title"
                  placeholder="Subtarefa..."
                  class="flex-1 bg-transparent text-sm outline-none"
                  :class="sub.done ? 'line-through text-gray-600' : 'text-gray-300'"
                  @keydown.enter.prevent="addSubtask"
                />
                <button
                  @click="removeSubtask(index)"
                  class="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all text-xs"
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            <button
              @click="addSubtask"
              class="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-400 transition-colors"
            >
              <i class="fa-solid fa-plus text-xs"></i>
              Adicionar subtarefa
            </button>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-3 px-6 py-4">
            <button
              @click="handleClose"
              class="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              @click="handleSubmit"
              :disabled="!form.title.trim()"
              class="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-teal-500 to-green-500 text-white hover:from-teal-400 hover:to-green-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-teal-900/30"
            >
              <i class="fa-solid fa-circle-check mr-1.5"></i>
              Criar Tarefa
            </button>
          </div>

        </template>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'

const props = defineProps({
  open: Boolean,
  members: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:open', 'create-task', 'create-team'])

// ─── Step control ─────────────────────────────────────────────────────────────
const step = ref('choose')

// ─── Form state ───────────────────────────────────────────────────────────────
const defaultForm = () => ({
  title: '',
  description: '',
  priority: 'medium',
  assignee: null,
  due_date: '',
  subtasks: []
})

const form = reactive(defaultForm())

// ─── Priority config ──────────────────────────────────────────────────────────
const priorityConfig = {
  high:   { label: 'Alta',  icon: 'fa-solid fa-arrow-up',   badge: 'bg-red-500/20 text-red-300 border border-red-500/30',         dot: 'bg-red-400' },
  medium: { label: 'Média', icon: 'fa-solid fa-minus',       badge: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30', dot: 'bg-yellow-400' },
  low:    { label: 'Baixa', icon: 'fa-solid fa-arrow-down',  badge: 'bg-green-500/20 text-green-300 border border-green-500/30',   dot: 'bg-green-400' },
}

// ─── Dropdowns ────────────────────────────────────────────────────────────────
const showPriorityMenu = ref(false)
const priorityRef = ref(null)

const showAssignMenu = ref(false)
const assignSearch = ref('')
const assignRef = ref(null)

const filteredMembers = computed(() => {
  const q = assignSearch.value.toLowerCase()
  return props.members.filter(m => m.name.toLowerCase().includes(q))
})

// ─── Subtasks ─────────────────────────────────────────────────────────────────
const completedSubtasks = computed(() => form.subtasks.filter(s => s.done).length)
const subtaskProgress = computed(() =>
  form.subtasks.length ? Math.round((completedSubtasks.value / form.subtasks.length) * 100) : 0
)

function addSubtask() {
  form.subtasks.push({ title: '', done: false })
}

function removeSubtask(index) {
  form.subtasks.splice(index, 1)
}

// ─── Date formatter ───────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

// ─── Actions ──────────────────────────────────────────────────────────────────
function handleClose() {
  emit('update:open', false)
}

function handleCreateTeam() {
  emit('update:open', false)
  emit('create-team')
}

function handleSubmit() {
  if (!form.title.trim()) return
  emit('create-task', {
    title: form.title.trim(),
    description: form.description.trim() || null,
    priority: form.priority,
    assigned_user_id: form.assignee?.id ?? null,
    due_date: form.due_date || null,
    subtasks: form.subtasks.filter(s => s.title.trim()).map(s => ({ title: s.title.trim(), done: s.done }))
  })
  emit('update:open', false)
}

// ─── Reset on open ────────────────────────────────────────────────────────────
watch(() => props.open, (val) => {
  if (val) {
    step.value = 'choose'
    Object.assign(form, defaultForm())
    showPriorityMenu.value = false
    showAssignMenu.value = false
    assignSearch.value = ''
  }
})

// ─── Close dropdowns on outside click ────────────────────────────────────────
function onClickOutside(e) {
  if (priorityRef.value && !priorityRef.value.contains(e.target)) showPriorityMenu.value = false
  if (assignRef.value && !assignRef.value.contains(e.target)) showAssignMenu.value = false
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', onClickOutside))
</script>
