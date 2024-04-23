<script setup>
defineProps(["title", "subtitle"])
</script>

<template>
    <div class="list p-2 my-2 rounded-lg text-left cursor-pointer">
        <h5 class="font-bold">
            {{ title }}
        </h5>
        <h6>
            {{ subtitle }}
        </h6>
    </div>
</template>

<style scoped>
.list {
    background-color: var(--main_background)
}
</style>