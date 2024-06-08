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
    width: calc(100% - 2 * 0.625rem);
    /*subtract 2 times ml-2.5*/
}

@media (min-width: 600px) {
    .card {
        width: calc(calc(100% - 3 * 0.625rem) / 2);
        /*subtract 3 times ml-2.5*/
    }
}

@media (min-width: 1000px) {
    .card {
        width: calc(calc(100% - 4 * 0.625rem) / 3);
        /*subtract 4 times ml-2.5*/
    }
}

@media (min-width: 1500px) {
    .card {
        width: calc(calc(100% - 6 * 0.625rem) / 5);
        /*subtract 6 times ml-2.5*/
    }
}

.title {
    color: var(--logo_text_color)
}

.card-icon {
    color: var(--red)
}
</style>