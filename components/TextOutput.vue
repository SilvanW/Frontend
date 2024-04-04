<script setup>
defineProps(["label", "value"])
</script>

<template>
    <div class="flex flex-row justify-between items-center flex-nowrap">
        <h2 class="font-bold">{{ label }}</h2>
        <h2>{{ value }}</h2>
    </div>
</template>
