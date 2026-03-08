<template>
  <section id="funcionalidades" class="py-24 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-5">
          <i class="fa-solid fa-sparkles text-xs"></i>
          Funcionalidades
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Tudo que você precisa para
          <span class="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent"> produzir mais</span>
        </h2>
        <p class="text-gray-400 max-w-xl mx-auto">
          Ferramentas poderosas e intuitivas para manter você e seu time no caminho certo, sempre.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(feature, i) in features"
          :key="i"
          :ref="el => featureRefs[i] = el"
          :class="[
            'group relative p-6 rounded-2xl border transition-all duration-500 cursor-default',
            visible[i]
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8',
            feature.highlight
              ? 'bg-gradient-to-br from-teal-500/15 to-green-500/10 border-teal-500/30 hover:border-teal-400/50'
              : 'bg-white/3 border-white/8 hover:bg-white/5 hover:border-white/15'
          ]"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <!-- Glow effect for highlighted card -->
          <div v-if="feature.highlight" class="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <!-- Icon -->
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg', feature.iconBg]">
            <i :class="[feature.icon, 'text-white text-xl']"></i>
          </div>

          <!-- Content -->
          <h3 class="text-white font-semibold text-lg mb-2 group-hover:text-teal-300 transition-colors duration-200">
            {{ feature.title }}
          </h3>
          <p class="text-gray-400 text-sm leading-relaxed">{{ feature.description }}</p>

          <!-- Tag -->
          <div v-if="feature.tag" class="mt-4">
            <span class="text-xs px-3 py-1 rounded-full bg-teal-500/15 text-teal-400 font-medium">{{ feature.tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'

const features = [
  {
    icon: 'fa-solid fa-list-check',
    iconBg: 'bg-gradient-to-br from-teal-500 to-teal-700',
    title: 'Gestão de Tarefas',
    description: 'Crie, organize e priorize tarefas com facilidade. Defina prazos, prioridades e acompanhe o progresso em tempo real.',
    highlight: true,
    tag: 'Core'
  },
  {
    icon: 'fa-solid fa-users',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-700',
    title: 'Times & Colaboração',
    description: 'Trabalhe em equipe de forma eficiente. Atribua tarefas, compartilhe projetos e mantenha todos sincronizados.',
    highlight: true,
    tag: 'Colaboração'
  },
  {
    icon: 'fa-solid fa-diagram-project',
    iconBg: 'bg-gradient-to-br from-teal-400 to-green-600',
    title: 'Projetos Organizados',
    description: 'Agrupe tarefas em projetos, visualize o andamento geral e entregue resultados com consistência.',
    highlight: false
  },
  {
    icon: 'fa-solid fa-bell',
    iconBg: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    title: 'Notificações Inteligentes',
    description: 'Fique sempre atualizado com alertas contextuais sobre prazos, menções e atualizações do time.',
    highlight: false
  },
  {
    icon: 'fa-solid fa-chart-line',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
    title: 'Relatórios & Progresso',
    description: 'Visualize métricas de produtividade, acompanhe o desempenho individual e tome decisões baseadas em dados.',
    highlight: false
  },
  {
    icon: 'fa-solid fa-shield-halved',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-700',
    title: 'Segurança & Controle',
    description: 'Controle de acesso por time, dados protegidos e conformidade com as melhores práticas de privacidade.',
    highlight: false
  }
]

const featureRefs = reactive({})
const visible = reactive({})

let observers = []

onMounted(() => {
  features.forEach((_, i) => {
    const el = featureRefs[i]
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { visible[i] = true; obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    observers.push(obs)
  })
})

onUnmounted(() => observers.forEach(o => o.disconnect()))
</script>
