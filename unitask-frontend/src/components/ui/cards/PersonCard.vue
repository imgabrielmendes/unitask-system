<template>
    <div class="bg-richBlackTwo rounded-2xl shadow p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4 text-white-800">Membros</h2>
            <ul class="space-y-2">

        <div class="grid grid-cols-2 gap-4">

            <PersonToast></PersonToast>
            <PersonToast></PersonToast>
            <PersonToast></PersonToast>
            <PersonToast></PersonToast>

        </div>
            </ul>
    </div>    
        
</template>

<style scoped>

</style>
<script>
    import PersonToast from '@/components/ui/toast/PersonToast.vue'
    
export default {
    components: {
        PersonToast
    }
}
</script>