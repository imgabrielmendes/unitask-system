<template>
  <div class="min-h-screen bg-[var(--gray-950)]">
    <div class="p-8 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Documentação da API</h1>
        <p class="text-gray-400">Referência completa dos endpoints disponíveis</p>
      </div>

      <!-- Índice de Navegação -->
      <div class="mb-8 bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6">
        <h2 class="text-xl font-bold text-white mb-4">Índice</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="#auth" class="text-teal-400 hover:text-teal-300 transition">Autenticação</a>
          <a href="#tasks" class="text-teal-400 hover:text-teal-300 transition">Tarefas</a>
          <a href="#teams" class="text-teal-400 hover:text-teal-300 transition">Times</a>
          <a href="#projects" class="text-teal-400 hover:text-teal-300 transition">Projetos</a>
          <a href="#home" class="text-teal-400 hover:text-teal-300 transition">Home</a>
        </div>
      </div>

      <!-- Autenticação -->
      <section id="auth" class="mb-8">
        <h2 class="text-2xl font-bold text-white mb-4">
          <i class="fa-solid fa-lock mr-2 text-teal-400"></i>
          Autenticação
        </h2>

        <!-- Login -->
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-green-900/60 text-green-300 rounded-lg font-mono text-sm font-bold">POST</span>
            <code class="text-teal-400 font-mono">/api/login</code>
          </div>
          <p class="text-gray-300 mb-4">Realiza o login do usuário e retorna um token de autenticação.</p>
          
          <h4 class="text-white font-semibold mb-2">Body:</h4>
          <pre class="bg-black/50 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm text-gray-300">{
  "email": "usuario@email.com",
  "password": "senha123"
}</code></pre>

          <h4 class="text-white font-semibold mb-2">Response:</h4>
          <pre class="bg-black/50 p-4 rounded-lg overflow-x-auto"><code class="text-sm text-gray-300">{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "name": "Gabriel",
    "email": "usuario@email.com"
  }
}</code></pre>
        </div>

        <!-- Register -->
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-green-900/60 text-green-300 rounded-lg font-mono text-sm font-bold">POST</span>
            <code class="text-teal-400 font-mono">/api/register</code>
          </div>
          <p class="text-gray-300 mb-4">Registra um novo usuário.</p>
          
          <h4 class="text-white font-semibold mb-2">Body:</h4>
          <pre class="bg-black/50 p-4 rounded-lg overflow-x-auto"><code class="text-sm text-gray-300">{
  "name": "Gabriel",
  "email": "usuario@email.com",
  "password": "senha123",
  "password_confirmation": "senha123"
}</code></pre>
        </div>
      </section>

      <!-- Home -->
      <section id="home" class="mb-8">
        <h2 class="text-2xl font-bold text-white mb-4">
          <i class="fa-solid fa-home mr-2 text-teal-400"></i>
          Home
        </h2>

        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-blue-900/60 text-blue-300 rounded-lg font-mono text-sm font-bold">GET</span>
            <code class="text-teal-400 font-mono">/api/home</code>
          </div>
          <p class="text-gray-300 mb-4">Retorna todos os dados da página inicial (usuário, times e tarefas).</p>
          
          <h4 class="text-white font-semibold mb-2">Headers:</h4>
          <pre class="bg-black/50 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm text-gray-300">Authorization: Bearer {token}</code></pre>

          <h4 class="text-white font-semibold mb-2">Response:</h4>
          <pre class="bg-black/50 p-4 rounded-lg overflow-x-auto"><code class="text-sm text-gray-300">{
  "user": {
    "id": 1,
    "name": "Gabriel",
    "email": "gabriel@email.com"
  },
  "teams": [
    {
      "id": 1,
      "name": "Meu Time",
      "description": null
    }
  ],
  "tasks": [
    {
      "title": "Título da tarefa",
      "description": "Descrição detalhada",
      "status": "pending"
    }
  ]
}</code></pre>
        </div>
      </section>

      <!-- Tasks -->
      <section id="tasks" class="mb-8">
        <h2 class="text-2xl font-bold text-white mb-4">
          <i class="fa-solid fa-tasks mr-2 text-teal-400"></i>
          Tarefas
        </h2>

        <!-- GET Tasks -->
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-blue-900/60 text-blue-300 rounded-lg font-mono text-sm font-bold">GET</span>
            <code class="text-teal-400 font-mono">/api/tasks</code>
          </div>
          <p class="text-gray-300 mb-4">Lista todas as tarefas do usuário.</p>
          
          <h4 class="text-white font-semibold mb-2">Headers:</h4>
          <pre class="bg-black/50 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm text-gray-300">Authorization: Bearer {token}</code></pre>

          <h4 class="text-white font-semibold mb-2">Response:</h4>
          <pre class="bg-black/50 p-4 rounded-lg overflow-x-auto"><code class="text-sm text-gray-300">[
  {
    "id": 1,
    "title": "Implementar feature",
    "description": "Descrição da tarefa",
    "status": "pending",
    "priority": "high",
    "created_at": "2026-01-01T00:00:00.000Z"
  }
]</code></pre>
        </div>

        <!-- POST Task -->
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-green-900/60 text-green-300 rounded-lg font-mono text-sm font-bold">POST</span>
            <code class="text-teal-400 font-mono">/api/tasks</code>
          </div>
          <p class="text-gray-300 mb-4">Cria uma nova tarefa.</p>
          
          <h4 class="text-white font-semibold mb-2">Body:</h4>
          <pre class="bg-black/50 p-4 rounded-lg overflow-x-auto"><code class="text-sm text-gray-300">{
  "title": "Nome da tarefa",
  "description": "Descrição opcional",
  "status": "pending",
  "priority": "medium",
  "project_id": 1,
  "team_id": 1
}</code></pre>
        </div>

        <!-- PUT Task -->
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-yellow-900/60 text-yellow-300 rounded-lg font-mono text-sm font-bold">PUT</span>
            <code class="text-teal-400 font-mono">/api/task/{id}</code>
          </div>
          <p class="text-gray-300 mb-4">Atualiza uma tarefa existente.</p>
        </div>

        <!-- DELETE Task -->
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-red-900/60 text-red-300 rounded-lg font-mono text-sm font-bold">DELETE</span>
            <code class="text-teal-400 font-mono">/api/task/{id}</code>
          </div>
          <p class="text-gray-300 mb-4">Remove uma tarefa.</p>
        </div>
      </section>

      <!-- Teams -->
      <section id="teams" class="mb-8">
        <h2 class="text-2xl font-bold text-white mb-4">
          <i class="fa-solid fa-users mr-2 text-teal-400"></i>
          Times
        </h2>

        <!-- GET Teams -->
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-blue-900/60 text-blue-300 rounded-lg font-mono text-sm font-bold">GET</span>
            <code class="text-teal-400 font-mono">/api/teams</code>
          </div>
          <p class="text-gray-300 mb-4">Lista todos os times do usuário.</p>
          
          <h4 class="text-white font-semibold mb-2">Response:</h4>
          <pre class="bg-black/50 p-4 rounded-lg overflow-x-auto"><code class="text-sm text-gray-300">[
  {
    "id": 1,
    "name": "Meu Time",
    "description": "Descrição do time",
    "color": "#14b8a6"
  }
]</code></pre>
        </div>

        <!-- POST Team -->
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-green-900/60 text-green-300 rounded-lg font-mono text-sm font-bold">POST</span>
            <code class="text-teal-400 font-mono">/api/teams</code>
          </div>
          <p class="text-gray-300 mb-4">Cria um novo time.</p>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="mb-8">
        <h2 class="text-2xl font-bold text-white mb-4">
          <i class="fa-solid fa-folder mr-2 text-teal-400"></i>
          Projetos
        </h2>

        <!-- GET Projects -->
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-blue-900/60 text-blue-300 rounded-lg font-mono text-sm font-bold">GET</span>
            <code class="text-teal-400 font-mono">/api/projects</code>
          </div>
          <p class="text-gray-300 mb-4">Lista todos os projetos.</p>
        </div>

        <!-- POST Project -->
        <div class="bg-[var(--gray-900)] border border-[var(--gray-700)] rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-green-900/60 text-green-300 rounded-lg font-mono text-sm font-bold">POST</span>
            <code class="text-teal-400 font-mono">/api/projects</code>
          </div>
          <p class="text-gray-300 mb-4">Cria um novo projeto.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiDocsPage'
}
</script>

<style scoped>
/* Scroll suave para âncoras */
html {
  scroll-behavior: smooth;
}

/* Melhora a legibilidade do código */
pre {
  font-family: 'Courier New', Courier, monospace;
}

code {
  font-size: 0.9em;
}

/* Hover nos links de navegação */
a {
  transition: all 0.2s ease;
}
</style>
