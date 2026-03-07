<template>
  <div>
    <main>
      <router-view/>
    </main>

    <footerUser></footerUser>
  </div>
</template>

<script>
import footerUser from '@/components/tasks/footer.vue';

export default {
    components: {
        footerUser
    }
}
</script>

<style>

</style>