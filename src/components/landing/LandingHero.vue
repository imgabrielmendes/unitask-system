<template>
  <section id="inicio" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    <!-- Background Gradient Blobs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute top-1/3 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/2 w-72 h-72 bg-teal-400/8 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      <!-- Grid overlay -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
      <!-- Left Column - Text -->
      <div class="flex-1 text-center lg:text-left">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-8 animate-fade-in-up"
        >
          <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          Gestão de tarefas simplificada
        </div>

        <!-- Headline -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up animation-delay-200">
          Organize seu trabalho,
          <span class="block bg-gradient-to-r from-teal-400 via-green-400 to-teal-300 bg-clip-text text-transparent">
            conquiste mais resultados.
          </span>
        </h1>

        <!-- Subheadline -->
        <p class="text-lg text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-400">
          UniTask é a plataforma completa para gerenciar tarefas, projetos e times em um só lugar.
          Simples, rápido e colaborativo — do jeito que você precisa.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up animation-delay-600">
          <router-link
            to="/register"
            class="group px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold rounded-2xl hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-2xl shadow-teal-500/30 flex items-center gap-2"
          >
            <span>Começar gratuitamente</span>
            <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform duration-200"></i>
          </router-link>
          <!-- <a
            href="#como-funciona"
            @click.prevent="scrollTo('como-funciona')"
            class="px-8 py-4 text-gray-300 font-medium border border-white/10 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all duration-200 flex items-center gap-2"
          >
            <i class="fa-solid fa-play text-teal-400 text-xs"></i>
            <span>Ver como funciona</span>
          </a> -->
        </div>

        <!-- Social Proof -->
        <!-- <div class="mt-12 flex items-center justify-center lg:justify-start gap-6 animate-fade-in-up animation-delay-800">
          <div class="flex -space-x-3">
            <div v-for="i in 4" :key="i" :class="`w-9 h-9 rounded-full border-2 border-[#0a0a0a] bg-gradient-to-br`" :style="avatarStyle(i)"></div>
          </div>
          <div>
            <div class="flex items-center gap-1 mb-0.5">
              <i v-for="s in 5" :key="s" class="fa-solid fa-star text-yellow-400 text-xs"></i>
            </div>
            <p class="text-sm text-gray-400"><span class="text-white font-medium">+2.000 times</span> já usam o UniTask</p>
          </div>
        </div> -->
      </div>

      <!-- Right Column - App Mockup -->
      <div class="flex-1 w-full max-w-lg animate-fade-in-right animation-delay-400">
        <div class="relative">
          <!-- Main Card -->
          <div class="bg-[#141414] border border-white/8 rounded-3xl p-6 shadow-2xl">
            <!-- Header bar -->
            <div class="flex items-center justify-between mb-5">
              <div>
                <p class="text-xs text-gray-500 mb-0.5">Hoje, {{ currentDate }}</p>
                <h3 class="text-white font-semibold">Meu Painel</h3>
              </div>
              <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
                <i class="fa-solid fa-check-double text-white text-sm"></i>
              </div>
            </div>

            <!-- Progress Ring -->
            <div class="flex items-center gap-4 mb-5 p-4 rounded-2xl bg-gradient-to-r from-teal-500/15 to-green-500/10 border border-teal-500/20">
              <div class="relative w-14 h-14 flex-shrink-0">
                <svg class="w-14 h-14 -rotate-90">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="#1f2937" stroke-width="4" />
                  <circle cx="28" cy="28" r="22" fill="none" stroke="url(#gr)" stroke-width="4"
                    stroke-linecap="round" stroke-dasharray="138" stroke-dashoffset="42"
                    class="transition-all duration-1000" />
                  <defs>
                    <linearGradient id="gr" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#14b8a6" />
                      <stop offset="100%" stop-color="#22c55e" />
                    </linearGradient>
                  </defs>
                </svg>
                <span class="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">70%</span>
              </div>
              <div>
                <p class="text-white font-medium">Progresso semanal</p>
                <p class="text-gray-400 text-xs">7 de 10 tarefas concluídas</p>
              </div>
            </div>

            <!-- Task List Preview -->
            <div class="space-y-2">
              <div
                v-for="(task, i) in previewTasks"
                :key="i"
                :class="[
                  'flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:scale-[1.01]',
                  task.done
                    ? 'bg-teal-500/8 border-teal-500/20'
                    : 'bg-white/3 border-white/5'
                ]"
              >
                <div :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0', task.done ? 'border-teal-400 bg-teal-400' : 'border-gray-600']">
                  <i v-if="task.done" class="fa-solid fa-check text-white text-[9px]"></i>
                </div>
                <span :class="['text-sm flex-1', task.done ? 'text-gray-500 line-through' : 'text-gray-200']">{{ task.title }}</span>
                <span :class="['text-xs px-2 py-0.5 rounded-full', task.tagClass]">{{ task.tag }}</span>
              </div>
            </div>
          </div>

          <!-- Floating Cards -->
          <div class="absolute -top-4 -right-4 bg-[#1a1a1a] border border-white/8 rounded-2xl p-3 shadow-xl animate-float">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
                <i class="fa-solid fa-users text-white text-xs"></i>
              </div>
              <div>
                <p class="text-white text-xs font-medium">Time Design</p>
                <p class="text-gray-500 text-[10px]">3 membros ativos</p>
              </div>
            </div>
          </div>

          <div class="absolute -bottom-4 -left-4 bg-[#1a1a1a] border border-white/8 rounded-2xl p-3 shadow-xl animate-float animation-delay-1000">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-bell text-teal-400 text-lg"></i>
              <div>
                <p class="text-white text-xs font-medium">Nova tarefa atribuída</p>
                <p class="text-gray-500 text-[10px]">há 2 minutos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <!-- <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
      <p class="text-xs text-gray-500 uppercase tracking-widest">Rolar</p>
      <i class="fa-solid fa-chevron-down text-gray-500"></i>
    </div> -->
  </section>
</template>

<script setup>
const currentDate = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })

const previewTasks = [
  { title: 'Revisar proposta do cliente', done: true, tag: 'Urgente', tagClass: 'bg-red-500/15 text-red-400' },
  { title: 'Atualizar documentação da API', done: true, tag: 'Dev', tagClass: 'bg-teal-500/15 text-teal-400' },
  { title: 'Reunião com time de design', done: false, tag: 'Hoje', tagClass: 'bg-yellow-500/15 text-yellow-400' },
  { title: 'Deploy versão 2.1', done: false, tag: 'Dev', tagClass: 'bg-teal-500/15 text-teal-400' },
]

const avatarColors = [
  'from-teal-400 to-teal-600',
  'from-green-400 to-green-600',
  'from-blue-400 to-blue-600',
  'from-purple-400 to-purple-600',
]

function avatarStyle(i) {
  const colors = ['#14b8a6,#0d9488', '#22c55e,#16a34a', '#60a5fa,#3b82f6', '#a78bfa,#7c3aed']
  const [from, to] = colors[(i - 1) % colors.length].split(',')
  return `background: linear-gradient(135deg, ${from}, ${to})`
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -20px) scale(1.05); }
  66% { transform: translate(-10px, 15px) scale(0.97); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-blob { animation: blob 8s ease-in-out infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-fade-in-up { animation: fadeInUp 0.7s ease-out both; }
.animate-fade-in-right { animation: fadeInRight 0.8s ease-out both; }

.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }
.animation-delay-1000 { animation-delay: 1s; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
</style>
