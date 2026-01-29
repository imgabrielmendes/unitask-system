<template>
  <footer class="bg-[var(--gray-900)] text-white mt-12 border-t border-[var(--gray-800)]">

    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Logo e Descrição -->

        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="p-2 bg-[var(--gray-700)] rounded-xl">
              <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <span class="text-lg font-bold">Unitask</span>
          </div>

        </div>

        <!-- Links úteis -->
        <div>
          <h3 class="text-sm font-semibold text-[var(--gray-200)] uppercase mb-4">Links</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-[var(--gray-400)] hover:text-white transition-colors">Início</a></li>
            <li><a href="#" class="text-[var(--gray-400)] hover:text-white transition-colors">Funcionalidades</a></li>
            <li><a href="#" class="text-[var(--gray-400)] hover:text-white transition-colors">Sobre</a></li>
            <li><a href="#" class="text-[var(--gray-400)] hover:text-white transition-colors">Contato</a></li>
          </ul>
        </div>

        <!-- Redes sociais -->
        <div>

          <div class="flex space-x-4">
            <a href="#" class="text-[var(--gray-400)] hover:text-white transition-colors" aria-label="Instagram">
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" class="text-[var(--gray-400)] hover:text-white transition-colors" aria-label="Facebook">
              <i class="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" class="text-[var(--gray-400)] hover:text-white transition-colors" aria-label="Twitter">
              <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" class="text-[var(--gray-400)] hover:text-white transition-colors" aria-label="LinkedIn">
              <i class="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>

      </div>

      <div class="mt-10 border-t border-[var(--gray-800)] pt-6 text-sm text-[var(--gray-400)] text-center">
        &copy; {{ new Date().getFullYear() }} Unitask. Todos os direitos reservados.
      </div>
    </div>

  </footer>
</template>
