<template>
  <HeaderDynamic />

    <main>
      <router-view/>
    </main>

    <footerUser></footerUser>
</template>

<script>
import HeaderDynamic from '@/components/tasks/HeaderDynamic.vue';
import footerUser from '@/components/tasks/footer.vue';

export default {
    components: {
    HeaderDynamic,
        footerUser
    }
}
</script>

<style>

</style>