---
title: Redis com Vue - Guia Completo
tags: [redis, vue, cache, frontend, backend, performance]
created: 2026-04-21
---

# Redis com Vue: guia completo (com exemplos)

## 1. Conceito principal

Se você usa Vue no frontend e Redis no backend, a regra mais importante é:

- O frontend Vue nao acessa Redis diretamente.
- O Vue consome API HTTP (ou WebSocket).
- A API le/escreve no Redis.

Em outras palavras:

1. Vue chama endpoint.
2. Backend tenta responder via Redis (cache hit).
3. Se nao existir no Redis (cache miss), backend busca no banco, grava no Redis e responde.
4. Vue renderiza os dados.

---

## 2. Quando Redis ajuda de verdade

Use Redis para:

- reduzir latencia de endpoints muito acessados;
- aliviar carga do banco relacional;
- guardar sessoes e tokens;
- armazenar snapshots de tela (ex.: home do usuario);
- ranking, contadores, rate limiting;
- pub/sub para eventos em tempo real.

Nao use Redis como unica fonte de verdade para dados criticos de negocio sem persistencia adequada.

---

## 3. Arquitetura recomendada (Vue + API + Redis)

```text
[Vue App] -> [API Backend] -> [Redis]
                       \-> [Banco de dados]
```

Padrao recomendado para telas:

- login retorna token + snapshot inicial (user, teams, tasks, etc.);
- Vue salva snapshot em cache local (sessionStorage/pinia);
- telas leem primeiro do cache local;
- backend segue mantendo Redis atualizado;
- quando necessario, fazer refresh controlado.

---

## 4. Fluxo completo de login com snapshot

Payload recomendado no login:

```json
{
  "token": "...",
  "user": { "id": 1, "name": "Gabriel" },
  "teams": [ ... ],
  "tasks": [ ... ]
}
```

### 4.1 Exemplo no service de autenticacao (Vue)

```js
// src/services/authService.js
import api from '@/axios'

export async function login(email, password) {
  const response = await api.post('/login', { email, password })
  const payload = response.data

  localStorage.setItem('token', payload.token)
  sessionStorage.setItem(
    'home_data',
    JSON.stringify({
      user: payload.user || null,
      teams: Array.isArray(payload.teams) ? payload.teams : [],
      tasks: Array.isArray(payload.tasks) ? payload.tasks : []
    })
  )

  if (payload.user) {
    sessionStorage.setItem('home_user', JSON.stringify(payload.user))
  }

  return payload
}
```

### 4.2 Exemplo de hidratar tela sem novo request

```js
// exemplo simplificado de pagina Vue
export default {
  data() {
    return {
      user: null,
      teams: [],
      tasks: []
    }
  },
  mounted() {
    try {
      const cached = sessionStorage.getItem('home_data')
      if (!cached) return

      const data = JSON.parse(cached)
      this.user = data.user || null
      this.teams = Array.isArray(data.teams) ? data.teams : []
      this.tasks = Array.isArray(data.tasks) ? data.tasks : []
    } catch (e) {
      this.user = null
      this.teams = []
      this.tasks = []
    }
  }
}
```

---

## 5. Estrategias de cache com Redis

## 5.1 Cache-aside (mais comum)

Leitura:

1. tentar Redis;
2. se miss, buscar banco;
3. gravar Redis com TTL;
4. retornar.

Escrita:

1. atualizar banco;
2. invalidar chave(s) Redis relacionadas;
3. opcionalmente repopular.

Exemplo pseudo-codigo backend:

```js
async function getHomeData(userId) {
  const key = `home:${userId}`

  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)

  const data = await db.fetchHomeData(userId)
  await redis.set(key, JSON.stringify(data), { EX: 300 }) // 5 min
  return data
}
```

## 5.2 Write-through

- escreve no banco e no Redis no mesmo fluxo.
- reduz chance de miss logo apos update.
- aumenta acoplamento da escrita.

## 5.3 Write-behind

- escreve primeiro no Redis e persiste depois.
- maior performance de escrita, porem maior complexidade e risco de perda se mal implementado.

---

## 6. Modelagem de chaves Redis

Padrao util:

- `home:{userId}`
- `teams:{userId}`
- `tasks:{userId}`
- `team:{slug}`
- `task:{taskId}`

Boas praticas:

- prefixos consistentes;
- chaves por escopo de usuario para isolamento;
- TTL definido (evita cache eterno sem controle);
- evitar payload gigante em uma unica chave quando nao necessario.

---

## 7. Invalidaçao e consistencia

Sempre que editar dados:

- criar tarefa: invalidar `home:{userId}` e `tasks:{userId}`;
- editar time: invalidar `home:{userId}`, `teams:{userId}`, `team:{slug}`;
- remover tarefa: invalidar listas e detalhes relacionados.

Opcional (otimizacao):

- em vez de apenas invalidar, atualizar incrementalmente no cache.

---

## 8. TTL: como escolher

Sugestao inicial:

- home/snapshot: 60-300s
- listas que mudam pouco: 300-900s
- dados muito dinamicos: 15-60s

Nao existe numero universal. Ajuste por:

- tolerancia a dados levemente defasados;
- volume de acesso;
- custo da consulta original no banco.

---

## 9. Exemplo com Pinia (opcional, recomendado)

```js
// src/stores/homeStore.js
import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', {
  state: () => ({
    user: null,
    teams: [],
    tasks: []
  }),
  actions: {
    hydrateFromSession() {
      try {
        const raw = sessionStorage.getItem('home_data')
        if (!raw) return

        const data = JSON.parse(raw)
        this.user = data.user || null
        this.teams = Array.isArray(data.teams) ? data.teams : []
        this.tasks = Array.isArray(data.tasks) ? data.tasks : []
      } catch {
        this.user = null
        this.teams = []
        this.tasks = []
      }
    },
    persistToSession() {
      sessionStorage.setItem(
        'home_data',
        JSON.stringify({ user: this.user, teams: this.teams, tasks: this.tasks })
      )
    },
    clear() {
      this.user = null
      this.teams = []
      this.tasks = []
      sessionStorage.removeItem('home_data')
      sessionStorage.removeItem('home_user')
    }
  }
})
```

---

## 10. Seguranca

- Nunca exponha Redis para internet publica sem protecao.
- Redis deve ficar em rede privada/infra interna.
- Use autenticacao, ACL e TLS quando aplicavel.
- Nao salve dados sensiveis em texto puro sem criptografia quando necessario.

No frontend:

- token em localStorage e pratico, mas possui risco em cenarios de XSS.
- para maior seguranca, avaliar cookies HttpOnly + CSRF.

---

## 11. Observabilidade e diagnostico

Metricas importantes:

- cache hit rate (%);
- latencia de endpoint com e sem cache;
- memoria usada no Redis;
- quantidade de evictions;
- volume de comandos por segundo.

Logs uteis:

- hit/miss por endpoint chave;
- tempo de consulta ao banco em caso de miss;
- eventos de invalidacao.

---

## 12. Problemas comuns e como evitar

1. Dados desatualizados por tempo demais
- reduzir TTL e invalidar corretamente em mutacoes.

2. Chave errada (usuario A lendo dado de usuario B)
- incluir userId no namespace da chave.

3. Frontend vazio apos refresh direto
- fallback para endpoint de bootstrap (ex.: GET /home).

4. Cache stampede (muitos misses simultaneos)
- lock por chave, jitter de TTL, ou stale-while-revalidate.

5. Payload muito grande no login
- enviar snapshot resumido e carregar detalhes sob demanda.

---

## 13. Padrao recomendado para seu contexto

Para seu caso (Vue com telas Home/Teams/Tasks):

- no login:
  - backend retorna `token`, `user`, `teams`, `tasks` (vindos do Redis quando possivel);
  - frontend salva em sessionStorage.

- nas telas:
  - ler de `home_data` primeiro;
  - evitar novos requests quando o cache for suficiente.

- nas mutacoes (criar tarefa, editar time, etc.):
  - atualizar UI local;
  - sincronizar `home_data` local;
  - backend invalida chaves Redis relacionadas.

- no logout:
  - limpar localStorage token;
  - limpar `home_data` e `home_user`.

---

## 14. Checklist rapido de implementacao

- [ ] Login devolve snapshot completo
- [ ] Token persistido
- [ ] Home/Tasks/Teams/Team leem cache local
- [ ] Invalidaçao Redis nas mutacoes
- [ ] TTL definido por tipo de dado
- [ ] Fallback de bootstrap para refresh profundo
- [ ] Limpeza de cache no logout
- [ ] Metricas de hit/miss ativas

---

## 15. Exemplo de logout consistente

```js
export function logout() {
  localStorage.removeItem('token')
  sessionStorage.removeItem('home_data')
  sessionStorage.removeItem('home_user')
}
```

---

## 16. Resumo final

- Redis fica no backend, nao no Vue.
- Vue recebe snapshot pronto da API e renderiza rapido.
- Cache local no frontend evita requests desnecessarios.
- Invalidaçao + TTL sao essenciais para consistencia.
- Sem observabilidade, cache vira caixa preta: meca hit/miss e latencia.
