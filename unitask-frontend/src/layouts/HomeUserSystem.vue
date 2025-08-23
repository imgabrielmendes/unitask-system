<template class="@container">
  <div>
    <headerUser></headerUser>

    <main>
      <router-view/>
    </main>

  </div>
</template>

<script>
import headerUser from '@/components/tasks/headerHomeUserPage.vue'

export default {
    components:{
         headerUser
    }
}
</script>

<style>

body{
background: linear-gradient(347deg, rgba(51, 51, 51, 1) 0%, rgba(33, 33, 33, 1) 100%);
}

</style>