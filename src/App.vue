<template>
  <div id="app" class="min-h-screen bg-[var(--gray-950)]">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    // Verifique se o window.echo está definido para evitar erros no console
    if (window.Echo) {
              console.log('Echo iniciado, ouvindo canal demo...');
        window.Echo.channel('demo')
            .listen('TestEvent', (e) => {
                console.log('Chegou algo do servidor!', e);
                alert('Mensagem recebida: ' + JSON.stringify(e));
            });
    } else {
        console.error('Laravel Echo não foi encontrado no window.');
    }
});
</script>

<style scoped>
#app {
  background-color: var(--gray-950);
}
</style>