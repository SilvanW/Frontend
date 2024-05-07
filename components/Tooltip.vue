<script setup>
defineProps(["tooltip"])
</script>

<template>
    <div class="tooltip tooltip-bottom w-full" :data-tip="tooltip">
        <slot />
    </div>
</template>