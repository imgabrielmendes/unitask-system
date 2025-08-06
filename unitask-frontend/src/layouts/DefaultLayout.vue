<!-- src/layouts/DefaultLayout.vue -->
<template class="@container">
  <div class="bg-gray-950/10">
    <headerUser></headerUser>

    <main class="bg-red-950/10">
      <router-view/>
    </main>

    <footerUser></footerUser>
  </div>
</template>

<script>
import headerUser from '@/components/tasks/headerLadingPage.vue'
import footerUser from '@/components/tasks/footer.vue'

export default {
  components: {
    headerUser,
    footerUser
  }
}

</script>

<style scoped>

</style>
