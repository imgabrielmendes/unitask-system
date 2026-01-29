<template>
  <div class="min-h-screen bg-[var(--gray-950)]">
    <div class="max-w-6xl mx-auto py-8 px-4">
        <!-- Header -->
        <div class="mb-12">
          <h1 class="text-4xl font-bold text-white mb-3">Design System</h1>
          <p class="text-gray-400 text-lg">Componentes, cores e padrões visuais do Unitask</p>
        </div>

        <!-- Color Palette -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i class="fa-solid fa-palette text-teal-400"></i>
            Paleta de Cores
          </h2>
          
          <div class="space-y-8">
            <!-- Primary Colors -->
            <div>
              <h3 class="text-lg font-semibold text-white mb-4">Cores Primárias</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="space-y-2">
                  <div class="h-24 rounded-xl bg-gradient-to-br from-teal-400 to-green-500 shadow-lg"></div>
                  <p class="text-sm text-white font-medium">Primary Gradient</p>
                  <p class="text-xs text-gray-400">teal-400 → green-500</p>
                </div>
                <div class="space-y-2">
                  <div class="h-24 rounded-xl bg-teal-500 shadow-lg"></div>
                  <p class="text-sm text-white font-medium">Teal 500</p>
                  <p class="text-xs text-gray-400">#14b8a6</p>
                </div>
                <div class="space-y-2">
                  <div class="h-24 rounded-xl bg-green-500 shadow-lg"></div>
                  <p class="text-sm text-white font-medium">Green 500</p>
                  <p class="text-xs text-gray-400">#22c55e</p>
                </div>
                <div class="space-y-2">
                  <div class="h-24 rounded-xl bg-teal-600 shadow-lg"></div>
                  <p class="text-sm text-white font-medium">Teal 600</p>
                  <p class="text-xs text-gray-400">#0d9488</p>
                </div>
              </div>
            </div>

            <!-- Gray Scale -->
            <div>
              <h3 class="text-lg font-semibold text-white mb-4">Escala de Cinza</h3>
              <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div class="space-y-2">
                  <div class="h-20 rounded-xl bg-[var(--gray-950)] border border-gray-800 shadow-lg"></div>
                  <p class="text-xs text-white font-medium">Gray 950</p>
                  <p class="text-xs text-gray-400">#0f0f0f</p>
                </div>
                <div class="space-y-2">
                  <div class="h-20 rounded-xl bg-[var(--gray-900)] shadow-lg"></div>
                  <p class="text-xs text-white font-medium">Gray 900</p>
                  <p class="text-xs text-gray-400">#1a1a1a</p>
                </div>
                <div class="space-y-2">
                  <div class="h-20 rounded-xl bg-[var(--gray-850)] shadow-lg"></div>
                  <p class="text-xs text-white font-medium">Gray 850</p>
                  <p class="text-xs text-gray-400">#1f1f1f</p>
                </div>
                <div class="space-y-2">
                  <div class="h-20 rounded-xl bg-[var(--gray-800)] shadow-lg"></div>
                  <p class="text-xs text-white font-medium">Gray 800</p>
                  <p class="text-xs text-gray-400">#2a2a2a</p>
                </div>
                <div class="space-y-2">
                  <div class="h-20 rounded-xl bg-[var(--gray-700)] shadow-lg"></div>
                  <p class="text-xs text-white font-medium">Gray 700</p>
                  <p class="text-xs text-gray-400">#374151</p>
                </div>
                <div class="space-y-2">
                  <div class="h-20 rounded-xl bg-[var(--gray-400)] shadow-lg"></div>
                  <p class="text-xs text-white font-medium">Gray 400</p>
                  <p class="text-xs text-gray-400">#9ca3af</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Typography -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i class="fa-solid fa-font text-teal-400"></i>
            Tipografia
          </h2>
          
          <div class="space-y-4 bg-[var(--gray-900)] p-6 rounded-xl border border-[var(--gray-800)]">
            <div>
              <h1 class="text-4xl font-bold text-white mb-2">Heading 1</h1>
              <p class="text-sm text-gray-400">4xl / Bold / 2.25rem</p>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-white mb-2">Heading 2</h2>
              <p class="text-sm text-gray-400">3xl / Bold / 1.875rem</p>
            </div>
            <div>
              <h3 class="text-2xl font-semibold text-white mb-2">Heading 3</h3>
              <p class="text-sm text-gray-400">2xl / Semibold / 1.5rem</p>
            </div>
            <div>
              <p class="text-base text-white mb-2">Body Text - Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p class="text-sm text-gray-400">Base / Regular / 1rem</p>
            </div>
            <div>
              <p class="text-sm text-gray-300 mb-2">Small Text - Lorem ipsum dolor sit amet</p>
              <p class="text-sm text-gray-400">Small / Regular / 0.875rem</p>
            </div>
          </div>
        </section>

        <!-- Buttons -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i class="fa-solid fa-hand-pointer text-teal-400"></i>
            Botões
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Primary -->
            <div class="space-y-3 bg-[var(--gray-900)] p-6 rounded-xl border border-[var(--gray-800)]">
              <h3 class="text-sm font-semibold text-white mb-3">Primary</h3>
              <BaseButton variant="primary" size="lg">Large Button</BaseButton>
              <BaseButton variant="primary" size="md">Medium Button</BaseButton>
              <BaseButton variant="primary" size="sm">Small Button</BaseButton>
              <BaseButton variant="primary" size="md" disabled>Disabled</BaseButton>
            </div>

            <!-- Secondary -->
            <div class="space-y-3 bg-[var(--gray-900)] p-6 rounded-xl border border-[var(--gray-800)]">
              <h3 class="text-sm font-semibold text-white mb-3">Secondary</h3>
              <BaseButton variant="secondary" size="lg">Large Button</BaseButton>
              <BaseButton variant="secondary" size="md">Medium Button</BaseButton>
              <BaseButton variant="secondary" size="sm">Small Button</BaseButton>
              <BaseButton variant="secondary" size="md" disabled>Disabled</BaseButton>
            </div>

            <!-- Danger -->
            <div class="space-y-3 bg-[var(--gray-900)] p-6 rounded-xl border border-[var(--gray-800)]">
              <h3 class="text-sm font-semibold text-white mb-3">Danger</h3>
              <BaseButton variant="danger" size="lg">Large Button</BaseButton>
              <BaseButton variant="danger" size="md">Medium Button</BaseButton>
              <BaseButton variant="danger" size="sm">Small Button</BaseButton>
              <BaseButton variant="danger" size="md" disabled>Disabled</BaseButton>
            </div>
          </div>
        </section>

        <!-- Input Fields -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i class="fa-solid fa-keyboard text-teal-400"></i>
            Campos de Input
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4 bg-[var(--gray-900)] p-6 rounded-xl border border-[var(--gray-800)]">
              <h3 class="text-sm font-semibold text-white mb-3">Input Text</h3>
              <InputText 
                id="example1"
                v-model="sampleText"
                label="Nome do Projeto"
                placeholder="Digite o nome..."
              />
              <InputText 
                id="example2"
                v-model="sampleText"
                label="Descrição"
                placeholder="Digite a descrição..."
              />
            </div>

            <div class="space-y-4 bg-[var(--gray-900)] p-6 rounded-xl border border-[var(--gray-800)]">
              <h3 class="text-sm font-semibold text-white mb-3">Select Input</h3>
              <SelectInput
                v-model="selectedValue"
                :options="selectOptions"
                placeholder="Selecione uma opção"
              />
            </div>
          </div>
        </section>

        <!-- Cards -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i class="fa-solid fa-square text-teal-400"></i>
            Cards e Containers
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Glass Card -->
            <div class="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg">
              <h3 class="text-lg font-bold text-white mb-2">Glass Card</h3>
              <p class="text-sm text-gray-300 mb-4">Efeito de vidro com blur</p>
              <div class="flex gap-2">
                <span class="px-3 py-1 bg-teal-900/40 text-teal-300 rounded-lg text-xs border border-teal-500/20">Tag 1</span>
                <span class="px-3 py-1 bg-teal-900/40 text-teal-300 rounded-lg text-xs border border-teal-500/20">Tag 2</span>
              </div>
            </div>

            <!-- Gradient Card -->
            <div class="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 shadow-lg">
              <h3 class="text-lg font-bold text-white mb-2">Gradient Card</h3>
              <p class="text-sm text-white/80 mb-4">Card com gradiente</p>
              <BaseButton variant="secondary" size="sm">Action</BaseButton>
            </div>

            <!-- Solid Card -->
            <div class="bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-xl p-6 shadow-lg">
              <h3 class="text-lg font-bold text-white mb-2">Solid Card</h3>
              <p class="text-sm text-gray-300 mb-4">Card sólido padrão</p>
              <BaseButton variant="primary" size="sm">Action</BaseButton>
            </div>

            <!-- Elevated Card -->
            <div class="bg-[var(--gray-850)] border border-[var(--gray-700)] rounded-xl p-6 shadow-2xl hover:shadow-teal-500/10 transition">
              <h3 class="text-lg font-bold text-white mb-2">Elevated Card</h3>
              <p class="text-sm text-gray-300 mb-4">Card com sombra elevada</p>
              <BaseButton variant="secondary" size="sm">Action</BaseButton>
            </div>
          </div>
        </section>

        <!-- Component Cards -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i class="fa-solid fa-puzzle-piece text-teal-400"></i>
            Componentes de Card
          </h2>
          
          <div class="space-y-8">
            <!-- TeamCard -->
            <div>
              <h3 class="text-lg font-semibold text-white mb-4">Team Card</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TeamCard 
                  name="Equipe de Desenvolvimento"
                  color="#14b8a6"
                  :member-count="8"
                />
                <TeamCard 
                  name="Design Team"
                  color="#f59e0b"
                  icon="fa-solid fa-palette"
                  :member-count="5"
                />
              </div>
              <div class="bg-[var(--gray-900)] p-4 rounded-lg border border-[var(--gray-800)]">
                <p class="text-xs text-gray-400 mb-2">Props:</p>
                <ul class="text-xs text-gray-300 space-y-1">
                  <li><code class="text-teal-400">name</code>: String (required) - Nome do time</li>
                  <li><code class="text-teal-400">color</code>: String - Cor customizada (hex ou gradiente)</li>
                  <li><code class="text-teal-400">icon</code>: String - Ícone FontAwesome</li>
                  <li><code class="text-teal-400">memberCount</code>: Number - Quantidade de membros</li>
                </ul>
                <p class="text-xs text-gray-400 mt-3 mb-2">Features:</p>
                <ul class="text-xs text-gray-300 space-y-1">
                  <li>• Ícone de seta que fica mais visível no hover</li>
                  <li>• Animação de escala no ícone do time</li>
                  <li>• Transição suave da borda para teal</li>
                </ul>
              </div>
            </div>

            <!-- EmptyState -->
            <div>
              <h3 class="text-lg font-semibold text-white mb-4">Empty State</h3>
              <div class="bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-xl mb-4">
                <EmptyState 
                  icon="fa-solid fa-inbox"
                  title="Nenhum item encontrado"
                  description="Esta é uma mensagem de estado vazio. Use este componente quando não houver dados para exibir."
                >
                  <template #action>
                    <BaseButton variant="primary" size="sm">
                      <i class="fa-solid fa-plus mr-2"></i>
                      Adicionar Item
                    </BaseButton>
                  </template>
                </EmptyState>
              </div>
              <div class="bg-[var(--gray-900)] p-4 rounded-lg border border-[var(--gray-800)]">
                <p class="text-xs text-gray-400 mb-2">Props:</p>
                <ul class="text-xs text-gray-300 space-y-1">
                  <li><code class="text-teal-400">icon</code>: String - Ícone FontAwesome (default: fa-inbox)</li>
                  <li><code class="text-teal-400">title</code>: String - Título do estado vazio</li>
                  <li><code class="text-teal-400">description</code>: String - Descrição detalhada</li>
                  <li><code class="text-teal-400">pulseAnimation</code>: Boolean - Ativa animação de pulso</li>
                </ul>
                <p class="text-xs text-gray-400 mt-3 mb-2">Slots:</p>
                <ul class="text-xs text-gray-300 space-y-1">
                  <li><code class="text-teal-400">#action</code>: Slot para botões de ação</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Icons -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i class="fa-solid fa-icons text-teal-400"></i>
            Ícones
          </h2>
          
          <div class="bg-[var(--gray-900)] p-6 rounded-xl border border-[var(--gray-800)]">
            <div class="grid grid-cols-4 md:grid-cols-8 gap-6 text-center">
              <div class="flex flex-col items-center gap-2">
                <i class="fa-solid fa-house text-2xl text-teal-400"></i>
                <p class="text-xs text-gray-400">Home</p>
              </div>
              <div class="flex flex-col items-center gap-2">
                <i class="fa-solid fa-list-check text-2xl text-teal-400"></i>
                <p class="text-xs text-gray-400">Tasks</p>
              </div>
              <div class="flex flex-col items-center gap-2">
                <i class="fa-solid fa-users text-2xl text-teal-400"></i>
                <p class="text-xs text-gray-400">Teams</p>
              </div>
              <div class="flex flex-col items-center gap-2">
                <i class="fa-solid fa-bell text-2xl text-teal-400"></i>
                <p class="text-xs text-gray-400">Notifications</p>
              </div>
              <div class="flex flex-col items-center gap-2">
                <i class="fa-solid fa-user text-2xl text-teal-400"></i>
                <p class="text-xs text-gray-400">User</p>
              </div>
              <div class="flex flex-col items-center gap-2">
                <i class="fa-solid fa-gear text-2xl text-teal-400"></i>
                <p class="text-xs text-gray-400">Settings</p>
              </div>
              <div class="flex flex-col items-center gap-2">
                <i class="fa-solid fa-star text-2xl text-teal-400"></i>
                <p class="text-xs text-gray-400">Favorite</p>
              </div>
              <div class="flex flex-col items-center gap-2">
                <i class="fa-solid fa-check text-2xl text-teal-400"></i>
                <p class="text-xs text-gray-400">Check</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Spacing -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i class="fa-solid fa-ruler text-teal-400"></i>
            Espaçamento
          </h2>
          
          <div class="bg-[var(--gray-900)] p-6 rounded-xl border border-[var(--gray-800)] space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-24 h-4 bg-teal-500 rounded"></div>
              <span class="text-sm text-gray-400">4px / 0.25rem</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-24 h-8 bg-teal-500 rounded"></div>
              <span class="text-sm text-gray-400">8px / 0.5rem</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-24 h-12 bg-teal-500 rounded"></div>
              <span class="text-sm text-gray-400">12px / 0.75rem</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-24 h-16 bg-teal-500 rounded"></div>
              <span class="text-sm text-gray-400">16px / 1rem</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-24 h-24 bg-teal-500 rounded"></div>
              <span class="text-sm text-gray-400">24px / 1.5rem</span>
            </div>
          </div>
        </section>

        <!-- Border Radius -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i class="fa-solid fa-circle text-teal-400"></i>
            Border Radius
          </h2>
          
          <div class="bg-[var(--gray-900)] p-6 rounded-xl border border-[var(--gray-800)]">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded mx-auto mb-2"></div>
                <p class="text-sm text-gray-400">rounded (0.25rem)</p>
              </div>
              <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded-lg mx-auto mb-2"></div>
                <p class="text-sm text-gray-400">rounded-lg (0.5rem)</p>
              </div>
              <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded-xl mx-auto mb-2"></div>
                <p class="text-sm text-gray-400">rounded-xl (0.75rem)</p>
              </div>
              <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded-3xl mx-auto mb-2"></div>
                <p class="text-sm text-gray-400">rounded-3xl (1.5rem)</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Sidebar & Navigation -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i class="fa-solid fa-bars text-teal-400"></i>
            Sidebar & Navegação
          </h2>
          
          <div class="bg-[var(--gray-900)] p-6 rounded-xl border border-[var(--gray-800)] space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-white mb-3">Estrutura da Sidebar</h3>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start gap-2">
                  <i class="fa-solid fa-check text-teal-400 mt-1"></i>
                  <span><strong>Logo + Marca:</strong> Ícone verde com gradiente e nome "Unitask"</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fa-solid fa-check text-teal-400 mt-1"></i>
                  <span><strong>Pesquisa:</strong> Campo de busca integrado no topo</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fa-solid fa-check text-teal-400 mt-1"></i>
                  <span><strong>Navegação Principal:</strong> Home, Tarefas, Projetos</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fa-solid fa-check text-teal-400 mt-1"></i>
                  <span><strong>Seção de Times:</strong> Accordion com lista de times</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fa-solid fa-check text-teal-400 mt-1"></i>
                  <span><strong>Links Secundários:</strong> Design System, Notificações</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fa-solid fa-check text-teal-400 mt-1"></i>
                  <span><strong>Perfil do Usuário:</strong> Avatar e informações no rodapé</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-white mb-3">Estados da Navegação</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-[var(--gray-800)] p-4 rounded-lg">
                  <div class="flex items-center gap-3 mb-2">
                    <i class="fa-solid fa-house text-gray-300"></i>
                    <span class="text-gray-300 text-sm">Estado Normal</span>
                  </div>
                  <p class="text-xs text-gray-400">Hover: bg-gray-800</p>
                </div>
                <div class="bg-teal-900/30 p-4 rounded-lg border border-teal-500/20">
                  <div class="flex items-center gap-3 mb-2">
                    <i class="fa-solid fa-house text-teal-400"></i>
                    <span class="text-teal-400 text-sm">Estado Ativo</span>
                  </div>
                  <p class="text-xs text-gray-400">Active: bg-teal-900/30 + border</p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-white mb-3">Funcionalidades</h3>
              <div class="space-y-2 text-sm text-gray-300">
                <p><i class="fa-solid fa-arrows-alt-h text-teal-400 mr-2"></i> Expansível/Retrátil (clique no logo)</p>
                <p><i class="fa-solid fa-search text-teal-400 mr-2"></i> Busca integrada (visível apenas quando expandida)</p>
                <p><i class="fa-solid fa-bell text-teal-400 mr-2"></i> Badge de notificações com contagem</p>
                <p><i class="fa-solid fa-layer-group text-teal-400 mr-2"></i> Accordion para organização de times</p>
              </div>
            </div>
          </div>
        </section>

      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import InputText from '@/components/ui/InputText.vue'
import SelectInput from '@/components/ui/SelectInput.vue'
import TeamCard from '@/components/teams/TeamCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'

const sampleText = ref('')
const selectedValue = ref('')

const selectOptions = [
  { value: '1', label: 'Opção 1', description: 'Primeira opção' },
  { value: '2', label: 'Opção 2', description: 'Segunda opção' },
  { value: '3', label: 'Opção 3', description: 'Terceira opção' },
]
</script>

<style scoped>
/* Animações suaves */
section {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
