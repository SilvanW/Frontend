<script setup>
defineProps(["text"])
</script>

<script>
</script>

<template>
    <div class="popup-container flex flex-col justify-top items-end fixed top-20 right-0 z-1">
        <div class="popup rounded-lg p-2 m-2 border-green-500 border-2">
            <h2 class="p-2 m-0 font-medium text-green-500">{{ text }}</h2>
        </div>
    </div>
</template>

<style scoped>
.popup {
    background-color: var(--header_background);
    min-width: 200px;
}
</style>