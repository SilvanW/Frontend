<script setup>
defineProps(["title", "skeleton", "closable"])

const model = defineModel()
</script>

<template>
    <div class="rounded-lg p-2 shadow-md card ml-2.5 mt-2.5 border-0">
        <div class="flex flex-row justify-between items-center">
            <h2 class="title px-2 font-medium text-2xl">{{ title }}</h2>
            <Icon v-show="closable" v-on:click="model = false" class="card-icon cursor-pointer pr-2"
                name="fa6-solid:xmark" size="1.5em" />
        </div>
        <slot v-if="skeleton" />
        <div v-else class="skeleton h-16 w-full"></div>
    </div>
</template>

<style scoped>
.card {
    background-color: rgb(225, 225, 225);
    min-width: 300px;
    max-width: 400px;
}

.title {
    color: var(--logo_text_color)
}

.card-icon {
    color: var(--red)
}
</style>