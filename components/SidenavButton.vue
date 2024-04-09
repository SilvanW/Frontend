<script setup>
defineProps(["icon", "label", "targetPage"])

const model = defineModel()

function navigatePage(target) {
    model.value = !model.value
    navigateTo(target)
}

</script>

<template>
    <div v-on:click="navigatePage(targetPage)"
        class="flex flex-row justify-left items-center p-2 hover:bg-blue-500 rounded-lg cursor-pointer">
        <Icon :name="icon" color="white" />
        <h3 class="sidenav-text font-bold text-2xl mx-2">{{ label }}</h3>
    </div>
</template>

<style scoped>
.sidenav-text {
    color: var(--header_background)
}
</style>