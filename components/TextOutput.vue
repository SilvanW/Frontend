<script setup>
defineProps(["label", "value"])
</script>

<template>
    <div class="flex flex-row justify-between items-center flex-nowrap gap-2.5">
        <h5 class="font-bold">{{ label }}</h5>
        <h5>{{ value }}</h5>
    </div>
</template>
