<template>
  <section id="times" class="py-24 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1f1e]/40 to-transparent pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-5">
          <i class="fa-solid fa-chart-bar text-xs"></i>
          Números que falam por si
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          A plataforma que times
          <span class="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">confiam</span>
        </h2>
        <p class="text-gray-400 max-w-xl mx-auto">
          Juntos, já organizamos milhares de projetos e aumentamos a produtividade de equipes de todos os tamanhos.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div
          v-for="(stat, i) in stats"
          :key="i"
          :ref="el => statRefs[i] = el"
          :class="[
            'text-center p-6 rounded-2xl border transition-all duration-700',
            visibleStats[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            'bg-white/3 border-white/8 hover:bg-white/5 hover:border-teal-500/20'
          ]"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <div class="text-4xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent mb-2">
            {{ stat.value }}
          </div>
          <div class="text-gray-400 text-sm">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <!-- Left - Text -->
        <div>
          <h3 class="text-2xl sm:text-3xl font-bold text-white mb-5">
            Colaboração que
            <span class="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent"> faz sentido</span>
          </h3>
          <p class="text-gray-400 leading-relaxed mb-6">
            Com o UniTask, seu time trabalha de forma integrada. Cada membro sabe o que precisa fazer, 
            quando entregar e como está o progresso do projeto — sem ruídos na comunicação.
          </p>
          <ul class="space-y-3">
            <li v-for="item in teamBenefits" :key="item" class="flex items-start gap-3 text-gray-300">
              <div class="w-5 h-5 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="fa-solid fa-check text-teal-400 text-[10px]"></i>
              </div>
              <span class="text-sm">{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Right - Team Card Visual -->
        <div class="bg-[#141414] border border-white/8 rounded-3xl p-6 space-y-4">
          <!-- Team Header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
                <i class="fa-solid fa-users text-white text-sm"></i>
              </div>
              <div>
                <p class="text-white font-semibold">Time de Produto</p>
                <p class="text-gray-500 text-xs">6 membros · 3 projetos ativos</p>
              </div>
            </div>
            <span class="text-xs px-3 py-1 rounded-full bg-green-500/15 text-green-400">Ativo</span>
          </div>

          <div class="h-px bg-white/5"></div>

          <!-- Member List -->
          <div class="space-y-3">
            <div v-for="member in teamMembers" :key="member.name" class="flex items-center gap-3">
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0', member.bg]">
                {{ member.initials }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-white font-medium">{{ member.name }}</p>
                <p class="text-xs text-gray-500 truncate">{{ member.task }}</p>
              </div>
              <span :class="['text-xs px-2 py-0.5 rounded-full flex-shrink-0', member.statusClass]">{{ member.status }}</span>
            </div>
          </div>

          <div class="h-px bg-white/5"></div>

          <!-- Progress Bar -->
          <div>
            <div class="flex justify-between text-xs text-gray-400 mb-2">
              <span>Progresso geral do sprint</span>
              <span class="text-teal-400">68%</span>
            </div>
            <div class="h-2 bg-white/5 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded-full" style="width: 68%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'

const stats = [
  { value: '+2k', label: 'Times cadastrados' },
  { value: '+50k', label: 'Tarefas criadas' },
  { value: '98%', label: 'Satisfação dos usuários' },
  { value: '4.8★', label: 'Avaliação média' },
]

const teamBenefits = [
  'Atribua tarefas para membros específicos do time',
  'Veja o progresso de cada projeto em tempo real',
  'Receba notificações sobre atualizações importantes',
  'Convide colegas por e-mail com um clique',
  'Gerencie permissões e acesso por time',
]

const teamMembers = [
  { initials: 'AM', name: 'Ana Melo', task: 'Redesign do dashboard', status: 'Em andamento', statusClass: 'bg-yellow-500/15 text-yellow-400', bg: 'bg-gradient-to-br from-teal-500 to-teal-700' },
  { initials: 'RC', name: 'Rafael Costa', task: 'API de autenticação', status: 'Revisão', statusClass: 'bg-blue-500/15 text-blue-400', bg: 'bg-gradient-to-br from-green-500 to-green-700' },
  { initials: 'JP', name: 'Julia Pires', task: 'Testes de usabilidade', status: 'Concluído', statusClass: 'bg-teal-500/15 text-teal-400', bg: 'bg-gradient-to-br from-purple-500 to-purple-700' },
]

const statRefs = reactive({})
const visibleStats = reactive({})
let observers = []

onMounted(() => {
  stats.forEach((_, i) => {
    const el = statRefs[i]
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { visibleStats[i] = true; obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    observers.push(obs)
  })
})

onUnmounted(() => observers.forEach(o => o.disconnect()))
</script>
