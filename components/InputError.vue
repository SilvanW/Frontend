<script setup>
defineProps(["condition", "text"])
</script>

<template>
    <div v-if="condition" class="input-error m-2 p-2 text-center rounded-lg bg-red-100">
        {{ text }}
    </div>
</template>

<style scoped>
.input-error {
    color: var(--red)
}
</style>