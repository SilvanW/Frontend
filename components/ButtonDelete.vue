<script setup>
defineProps(["label"])
</script>

<template>
    <button class="button-add my-2 py-2 px-4 rounded-lg w-full ">
        <div class="flex flex-row justify-center items-center">
            <Icon name="fa6-solid:trash" color="white" size="1em"></Icon>
            <h3 class="px-1">{{ label }}</h3>
        </div>
    </button>
</template>

<style scoped>
.button-add {
    background-color: var(--red);
    color: var(--main_background)
}
</style>