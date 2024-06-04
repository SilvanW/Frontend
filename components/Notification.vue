<script setup>
defineProps(["text"])
</script>

<script>
</script>

<template>
    <div class="toast">
        <div class="alert alert-success">
            <h5>{{ text }}</h5>
        </div>
    </div>
</template>
