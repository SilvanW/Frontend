<script setup>
defineProps(["label", "placeholder", "type", "required", "hasError"])

const model = defineModel()

</script>

<template>
    <div class="py-2">
        <label class="block pb-1 font-medium">{{ label }}</label>
        <input v-bind:class="{ error: hasError }" v-model="model" :placeholder="placeholder" :type="type"
            :required="required" class="border border-gray-300 text-gray-900 text-sm rounded-lg p-2 w-full" />
    </div>
</template>

<style scoped>
.error {
    border-color: rgb(220 38 38);
    border-width: 2px;
}
</style>