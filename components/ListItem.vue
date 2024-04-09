<script setup>
defineProps(["title", "subtitle"])
</script>

<template>
    <div class="list p-2 my-2 rounded-lg text-left cursor-pointer">
        <h2 class="font-bold text-lg">
            {{ title }}
        </h2>
        <h3>
            {{ subtitle }}
        </h3>
    </div>
</template>

<style scoped>
.list {
    background-color: var(--main_background)
}
</style>