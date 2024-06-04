<script setup>
defineProps(["label", "options", "required"])

const model = defineModel()
</script>

<template>
    <div class="py-2">
        <label class="block pb-1 font-medium">{{ label }}</label>
        <select class="bg-white p-2 w-full rounded-lg" v-model="model" :required="required">
            <option v-for="option in options" :value="option.id" :key="option.id">
                {{ option.name }}</option>
        </select>
    </div>
</template>