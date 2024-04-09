<script setup>
defineProps(["title"])

const model = defineModel()
</script>

<template>
    <div class="popup-container flex flex-col justify-center items-center fixed top-20 left-0 right-0 bottom-0 z-1">
        <div class="popup rounded-lg m-2">
            <div class="flex flex-row justify-between items-center p-2">
                <h2 class="title p-2 font-medium text-2xl">{{ title }}</h2>
                <Icon v-on:click="model = false" class="popup-icon cursor-pointer" name="fa6-solid:xmark"
                    size="1.5em" />
            </div>

            <div class="p-4">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
.popup-container {
    background-color: rgba(0, 0, 0, 0.4)
}

.popup {
    background-color: var(--header_background);
    min-width: 200px;
}

.title {
    color: var(--logo_text_color)
}

.popup-icon {
    color: var(--red)
}
</style>