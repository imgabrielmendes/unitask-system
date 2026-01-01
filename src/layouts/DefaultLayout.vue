<!-- src/layouts/DefaultLayout.vue -->
<template class="@container">
  <div class="bg-gray-950/10">
    <HeaderDynamic />

    <main class="bg-red-950/10">
      <router-view/>
    </main>

    <footerUser></footerUser>
  </div>
</template>

<script>
import HeaderDynamic from '@/components/tasks/HeaderDynamic.vue'
import footerUser from '@/components/tasks/footer.vue'
export default {
  components: {
    HeaderDynamic,
    footerUser
  }
}

</script>

<style scoped>

</style>
