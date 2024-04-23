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
        class="flex flex-row justify-left items-center p-2 hover:bg-blue-500 rounded-lg cursor-pointer mt-1">
        <Icon :name="icon" color="white" />
        <h4 class="sidenav-text font-medium text-xl mx-2 my-0">{{ label }}</h4>
    </div>
</template>

<style scoped>
.sidenav-text {
    color: var(--header_background)
}
</style>