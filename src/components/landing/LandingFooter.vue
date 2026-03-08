<template>
  <footer class="border-t border-white/5 bg-[#080808]">
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Brand Column -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <!-- <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
              <i class="fa-solid fa-check-double text-white text-sm"></i>
            </div> -->
            <span class="text-xl font-bold bg-white bg-clip-text text-transparent">
              UniTask
            </span>
          </div>
          <p class="text-gray-500 text-sm leading-relaxed mb-5">
            Gerencie tarefas, organize times e entregue projetos com muito mais eficiência.
          </p>
          <div class="flex items-center gap-3">
            <a v-for="social in socials" :key="social.icon" href="#"
              class="w-9 h-9 rounded-lg bg-white/5 hover:bg-teal-500/20 hover:text-teal-400 flex items-center justify-center text-gray-400 transition-all duration-200"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Links Columns -->
        <div v-for="col in footerLinks" :key="col.title">
          <h4 class="text-white font-semibold text-sm mb-4">{{ col.title }}</h4>
          <ul class="space-y-3">
            <li v-for="link in col.links" :key="link.label">
              <a :href="link.href" class="text-gray-500 text-sm hover:text-teal-400 transition-colors duration-200">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-gray-600 text-sm">
          © {{ year }} UniTask. Todos os direitos reservados.
        </p>
        <div class="flex items-center gap-5">
          <a href="#" class="text-gray-600 text-sm hover:text-gray-400 transition-colors">Termos de Uso</a>
          <a href="#" class="text-gray-600 text-sm hover:text-gray-400 transition-colors">Privacidade</a>
          <a href="#" class="text-gray-600 text-sm hover:text-gray-400 transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()

const socials = [
  { icon: 'fa-brands fa-github' },
  { icon: 'fa-brands fa-linkedin' },
  { icon: 'fa-brands fa-instagram' },
]

const footerLinks = [
//   {
//     title: 'Produto',
//     links: [
//       { label: 'Funcionalidades', href: '#funcionalidades' },
//       { label: 'Como funciona', href: '#como-funciona' },
//       { label: 'Times', href: '#times' },
//       { label: 'Preços', href: '#' },
//     ]
//   },
//   {
//     title: 'Empresa',
//     links: [
//       { label: 'Sobre nós', href: '#' },
//       { label: 'Blog', href: '#' },
//       { label: 'Carreiras', href: '#' },
//       { label: 'Contato', href: '#' },
//     ]
//   },
//   {
//     title: 'Suporte',
//     links: [
//       { label: 'Central de ajuda', href: '#' },
//       { label: 'Documentação', href: '#' },
//       { label: 'Status do sistema', href: '#' },
//       { label: 'Comunidade', href: '#' },
//     ]
//   }
]
</script>
