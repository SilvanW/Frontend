<script setup>
defineProps(["label"])
</script>

<template>
    <button class="button-add py-2 px-4 rounded-lg w-full ">
        <div class="flex flex-row justify-center items-center">
            <Icon name="fa6-solid:plus" color="white" size="1em"></Icon>
            <h3 class="px-1">{{ label }}</h3>
        </div>
    </button>
</template>

<style scoped>
.button-add {
    background-color: var(--orange);
    color: var(--main_background)
}
</style>