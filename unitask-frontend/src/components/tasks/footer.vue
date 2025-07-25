<template>
  <footer class="bg-gray-100 text-gray-700 mt-12">
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Logo e Descrição -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" class="h-8 w-auto" />
            <span class="text-lg font-bold">Unitask</span>
          </div>
          <p class="text-sm text-gray-600">
            Organize suas tarefas, otimize sua rotina e aumente sua produtividade com o Unitask.
          </p>
        </div>

        <!-- Links úteis -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase mb-4">Links</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-indigo-600">Início</a></li>
            <li><a href="#" class="hover:text-indigo-600">Funcionalidades</a></li>
            <li><a href="#" class="hover:text-indigo-600">Sobre</a></li>
            <li><a href="#" class="hover:text-indigo-600">Contato</a></li>
          </ul>
        </div>

        <!-- Redes sociais -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 uppercase mb-4">Siga-nos</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-600 hover:text-indigo-600" aria-label="Instagram">
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" class="text-gray-600 hover:text-indigo-600" aria-label="Facebook">
              <i class="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" class="text-gray-600 hover:text-indigo-600" aria-label="Twitter">
              <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" class="text-gray-600 hover:text-indigo-600" aria-label="LinkedIn">
              <i class="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Rodapé inferior -->
      <div class="mt-10 border-t border-gray-300 pt-6 text-sm text-gray-500 text-center">
        &copy; {{ new Date().getFullYear() }} Unitask. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>

<script setup>
// Nenhum script necessário, mas se quiser tornar dinâmico futuramente, pode adicionar aqui.
</script>
