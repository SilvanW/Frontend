<script setup>
defineProps(["condition", "text"])
</script>

<template>
    <div v-if="condition" class="input-error p-2 text-center rounded-lg bg-red-100 my-2">
        {{ text }}
    </div>
</template>

<style scoped>
.input-error {
    color: var(--red)
}
</style>