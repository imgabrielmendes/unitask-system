<template>
  <section class="py-24 relative overflow-hidden">
    <!-- Background Blob -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/8 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-4xl mx-auto px-6 text-center relative">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-8">
        <i class="fa-solid fa-rocket text-xs"></i>
        Comece hoje mesmo
      </div>

      <h2 class="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
        Pronto para organizar
        <span class="block bg-gradient-to-r from-teal-400 via-green-400 to-teal-300 bg-clip-text text-transparent">
          seu trabalho de verdade?
        </span>
      </h2>

      <p class="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        Junte-se a milhares de times que já usam o UniTask para entregar mais,
        comunicar melhor e crescer juntos.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <router-link
          to="/register"
          class="group px-10 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold text-lg rounded-2xl hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-2xl shadow-teal-500/30 flex items-center gap-3"
        >
          <i class="fa-solid fa-user-plus"></i>
          <span>Criar conta grátis</span>
          <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform duration-200"></i>
        </router-link>
        <router-link
          to="/login"
          class="px-10 py-4 text-gray-300 font-medium text-lg border border-white/10 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all duration-200"
        >
          Já tenho conta
        </router-link>
      </div>

      <!-- Trust Signals -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500 text-sm">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-lock text-teal-500"></i>
          <span>100% seguro e privado</span>
        </div>
        <div class="w-1 h-1 rounded-full bg-gray-700 hidden sm:block"></div>
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-credit-card text-teal-500"></i>
          <span>Sem cartão de crédito</span>
        </div>
        <div class="w-1 h-1 rounded-full bg-gray-700 hidden sm:block"></div>
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-circle-check text-teal-500"></i>
          <span>Gratuito para começar</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
