<template>
  <div class="group relative backdrop-blur-xl bg-white/5 border border-white/10 p-0 transition-all duration-300 shadow-lg 
    hover:bg-white/10 hover:border-purple-400/30 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 hover:scale-[1.02] 
    flex flex-col overflow-hidden cursor-pointer min-h-[90px]">
    <div class="flex items-center justify-between px-5 pt-5">
      <div class="flex items-center gap-2">
        <span class="text-xs text-purple-400/70">{{ date }}</span>
        <span class="text-xs text-purple-200 font-semibold">{{ author }}</span>
      </div>
      <span
        class="px-2 py-0.5 rounded-full text-xs font-bold"
        :class="statusClass"
      >
        {{ statusLabel }}
      </span>
    </div>
    <div class="px-5 pt-2">
      <h3 class="font-bold text-white text-lg leading-tight mb-1 truncate">{{ title }}</h3>
      <p v-if="description" class="text-sm text-purple-200/60 line-clamp-2 mb-2">{{ description }}</p>
    </div>
    <div v-if="tags && tags.length" class="px-5 pb-2 flex flex-wrap gap-2">
      <span v-for="tag in tags" :key="tag" class="px-2 py-0.5 rounded-lg text-xs font-medium bg-purple-900/40 text-purple-300 border border-purple-500/20">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  status: String,
  date: String,
  author: String,
  tags: Array
})

const statusLabel = computed(() => {
  if (props.status === 'done' || props.status === 'completed') return 'Concluída'
  if (props.status === 'in_progress') return 'Em Progresso'
  if (props.status === 'pending') return 'Pendente'
  if (props.status === 'active') return 'Ativa'
  return props.status
})

const statusClass = computed(() => {
  if (props.status === 'done' || props.status === 'completed')
    return 'bg-green-700/80 text-green-300'
  if (props.status === 'in_progress')
    return 'bg-blue-700/80 text-blue-200'
  if (props.status === 'pending')
    return 'bg-yellow-700/80 text-yellow-200'
  if (props.status === 'active')
    return 'bg-green-700/80 text-green-300'
  return 'bg-purple-700/80 text-purple-200'
})
</script>
