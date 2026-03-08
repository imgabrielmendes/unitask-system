<template>
  <section id="como-funciona" class="py-24 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/10 to-transparent pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-5">
          <i class="fa-solid fa-circle-info text-xs"></i>
          Como funciona
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Simples assim — em
          <span class="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">3 passos</span>
        </h2>
        <p class="text-gray-400 max-w-xl mx-auto">
          Você não precisa de horas de configuração. Em minutos, seu time já está colaborando.
        </p>
      </div>

      <!-- Steps -->
      <div class="relative">
        <!-- Connecting Line (desktop) -->
        <div class="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent mx-48"></div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
          <div
            v-for="(step, i) in steps"
            :key="i"
            :ref="el => stepRefs[i] = el"
            :class="[
              'relative flex flex-col items-center text-center transition-all duration-700',
              visibleSteps[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            ]"
            :style="{ transitionDelay: `${i * 150}ms` }"
          >
            <!-- Step Number -->
            <div class="relative mb-6">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center shadow-2xl shadow-teal-500/30 mb-0 z-10 relative">
                <i :class="[step.icon, 'text-white text-2xl']"></i>
              </div>
              <!-- <div class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0a0a0a] border-2 border-teal-500 flex items-center justify-center">
                <span class="text-teal-400 text-xs font-bold">{{ i + 1 }}</span>
              </div> -->
            </div>

            <!-- Content -->
            <h3 class="text-white font-semibold text-xl mb-3">{{ step.title }}</h3>
            <p class="text-gray-400 leading-relaxed max-w-xs">{{ step.description }}</p>

            <!-- Mini visual -->
            <div class="mt-6 w-full max-w-xs bg-[#141414] border border-white/8 rounded-2xl p-4">
              <component :is="step.visual" />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <router-link
          to="/register"
          class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold rounded-2xl hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-2xl shadow-teal-500/25"
        >
          <i class="fa-solid fa-rocket"></i>
          Quero começar agora
        </router-link>
        <!-- <p class="mt-3 text-gray-500 text-sm">Sem cartão de crédito. 100% gratuito para começar.</p> -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, defineComponent, h } from 'vue'

// Mini visuals as render functions
const VisualStep1 = defineComponent({
  render() {
    return h('div', { class: 'space-y-2' }, [
      h('div', { class: 'flex items-center gap-2 p-2 rounded-lg bg-teal-500/10 border border-teal-500/20' }, [
        h('div', { class: 'w-6 h-6 rounded bg-teal-500 flex items-center justify-center' }, [
          h('i', { class: 'fa-solid fa-user text-white text-xs' })
        ]),
        h('div', { class: 'flex-1' }, [
          h('div', { class: 'h-2 bg-teal-400/40 rounded w-24 mb-1' }),
          h('div', { class: 'h-1.5 bg-gray-600 rounded w-16' })
        ])
      ]),
      h('div', { class: 'h-px bg-white/5' }),
      h('p', { class: 'text-xs text-gray-500 text-left' }, 'Crie sua conta em menos de 1 minuto')
    ])
  }
})

const VisualStep2 = defineComponent({
  render() {
    return h('div', { class: 'space-y-2' }, [
      h('div', { class: 'flex gap-1.5' }, [
        h('div', { class: 'flex-1 h-6 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center px-2' }, [
          h('span', { class: 'text-xs text-teal-400' }, 'Design')
        ]),
        h('div', { class: 'flex-1 h-6 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center px-2' }, [
          h('span', { class: 'text-xs text-green-400' }, 'Dev')
        ]),
        h('div', { class: 'flex-1 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center px-2' }, [
          h('i', { class: 'fa-solid fa-plus text-gray-500 text-xs mx-auto' })
        ]),
      ]),
      h('div', { class: 'h-px bg-white/5' }),
      h('p', { class: 'text-xs text-gray-500 text-left' }, 'Convide seus colegas por e-mail')
    ])
  }
})

const VisualStep3 = defineComponent({
  render() {
    const tasks = ['Reunião semanal', 'Revisar PR', 'Publicar post']
    return h('div', { class: 'space-y-1.5' }, [
      ...tasks.map((t, i) =>
        h('div', { class: 'flex items-center gap-2 p-1.5 rounded-lg bg-white/3' }, [
          h('div', { class: `w-4 h-4 rounded-full border ${i < 2 ? 'border-teal-400 bg-teal-400' : 'border-gray-600'} flex items-center justify-center` }, [
            i < 2 ? h('i', { class: 'fa-solid fa-check text-white text-[8px]' }) : null
          ]),
          h('span', { class: `text-xs ${i < 2 ? 'text-gray-500 line-through' : 'text-gray-300'}` }, t)
        ])
      ),
      h('div', { class: 'h-px bg-white/5' }),
      h('p', { class: 'text-xs text-gray-500 text-left' }, 'Acompanhe tudo em um só lugar')
    ])
  }
})

const steps = [
  {
    icon: 'fa-solid fa-user-plus',
    title: 'Crie sua conta',
    description: 'Cadastro rápido e gratuito. Sem burocracia, sem cartão de crédito.',
    visual: VisualStep1
  },
  {
    icon: 'fa-solid fa-users-gear',
    title: 'Monte seu time',
    description: 'Convide colegas, crie projetos e organize seus times por área ou projeto.',
    visual: VisualStep2
  },
  {
    icon: 'fa-solid fa-rocket',
    title: 'Comece a produzir',
    description: 'Crie tarefas, defina responsáveis e acompanhe o progresso em tempo real.',
    visual: VisualStep3
  }
]

const stepRefs = reactive({})
const visibleSteps = reactive({})
let observers = []

onMounted(() => {
  steps.forEach((_, i) => {
    const el = stepRefs[i]
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { visibleSteps[i] = true; obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    observers.push(obs)
  })
})

onUnmounted(() => observers.forEach(o => o.disconnect()))
</script>
