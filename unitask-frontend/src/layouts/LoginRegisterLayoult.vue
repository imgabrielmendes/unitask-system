<template>
  <headerDefault></headerDefault>

    <main>
      <router-view/>
    </main>

    <footerUser></footerUser>
</template>

<script>
import headerDefault from '@/components/tasks/headerDefault.vue';
import footerUser from '@/components/tasks/footer.vue';

export default {
    components: {
        headerDefault,
        footerUser
    }
}
</script>

<style>

</style>