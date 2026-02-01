<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- Logo e Título -->
      <div class="auth-header">
        <div class="logo-container">
          <i class="fa-solid fa-user-plus text-4xl text-teal-400"></i>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Crie sua conta</h1>
        <p class="text-gray-400">Comece a gerenciar suas tarefas agora</p>
      </div>

      <!-- Formulário -->
      <form @submit="handleSubmit" class="auth-form">
        <div class="input-group">
          <label class="input-label">Nome completo</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-user input-icon"></i>
            <input
              v-model="name"
              type="text"
              class="input-field"
              placeholder="Seu nome"
              required
            />
          </div>
        </div>

        <div class="input-group">
          <label class="input-label">Email</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-envelope input-icon"></i>
            <input
              v-model="email"
              type="email"
              class="input-field"
              placeholder="seu@email.com"
              required
            />
          </div>
        </div>

        <div class="input-group">
          <label class="input-label">Senha</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-lock input-icon"></i>
            <input
              v-model="password"
              type="password"
              class="input-field"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div class="input-group">
          <label class="input-label">Confirmar senha</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-lock input-icon"></i>
            <input
              v-model="passwordConfirmation"
              type="password"
              class="input-field"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button type="submit" class="btn-primary" :disabled="isLoading">
          <span v-if="!isLoading">Criar conta</span>
          <span v-else class="flex items-center justify-center gap-2">
            <i class="fa-solid fa-spinner fa-spin"></i>
            Criando...
          </span>
        </button>

        <div class="divider">
          <span>ou</span>
        </div>

        <p class="text-center text-gray-400 text-sm">
          Já tem uma conta?
          <router-link to="/login" class="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
            Faça login
          </router-link>
        </p>
      </form>
    </div>

    <!-- Elementos decorativos animados -->
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const isLoading = ref(false)
const router = useRouter()

async function handleSubmit(event) {
  event.preventDefault()
  
  if (password.value !== passwordConfirmation.value) {
    alert('As senhas não coincidem!')
    return
  }
  
  isLoading.value = true
  
  try {
    await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    })
    
    alert('Conta criada com sucesso! Faça login para continuar.')
    router.push('/login')
  } catch (error) {
    alert('Erro ao criar conta: ' + (error.response?.data?.message || error.message))
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0d0a14 0%, #1a1425 100%);
}

.auth-card {
  width: 100%;
  max-width: 450px;
  background: rgba(26, 20, 37, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.6s ease-out;
  position: relative;
  z-index: 1;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInDown 0.8s ease-out;
}

.logo-container {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #14b8a6, #10b981);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  animation: float 3s ease-in-out infinite;
  box-shadow: 0 10px 30px rgba(20, 184, 166, 0.3);
}

.auth-form {
  animation: fadeIn 1s ease-out 0.2s both;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  color: #e5e7eb;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 1rem;
}

.input-field {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  background: rgba(31, 41, 55, 0.5);
  border: 1px solid rgba(107, 114, 128, 0.3);
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s;
  outline: none;
}

.input-field::placeholder {
  color: #6b7280;
}

.input-field:focus {
  border-color: #14b8a6;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
  background: rgba(31, 41, 55, 0.8);
}

.btn-primary {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #14b8a6, #10b981);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(20, 184, 166, 0.4);
  margin-top: 0.5rem;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(20, 184, 166, 0.5);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid rgba(107, 114, 128, 0.3);
}

.divider span {
  padding: 0 1rem;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}

.shape {
  position: absolute;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(20, 184, 166, 0.1));
  border-radius: 50%;
  filter: blur(40px);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -10%;
  animation: float 8s ease-in-out infinite;
}

.shape-2 {
  width: 400px;
  height: 400px;
  bottom: -10%;
  right: -10%;
  animation: float 10s ease-in-out infinite reverse;
}

.shape-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: 10%;
  animation: float 6s ease-in-out infinite;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}
</style>
