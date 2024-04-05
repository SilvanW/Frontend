<script setup>
defineProps(["label", "placeholder"])

const inputValue = ref('')
</script>

<template>
    <div class="p-2">
        <label class="block pb-1 font-medium">{{ label }}</label>
        <input v-model="inputValue" :placeholder="placeholder"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg p-2 w-full" />
    </div>
</template>