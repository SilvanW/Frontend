<script setup>
defineProps(["title"])
</script>

<template>
    <div class="rounded-lg p-2.5 shadow-md card ml-2.5 mt-2.5">
        <h2 class="title p-2 font-medium text-2xl">{{ title }}</h2>
        <slot />
    </div>
</template>

<style scoped>
.card {
    background-color: rgb(225, 225, 225);
    min-width: 300px;
}

.title {
    color: var(--logo_text_color)
}
</style>