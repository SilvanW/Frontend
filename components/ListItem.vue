<script setup>
defineProps(["title", "subtitle", "image"])
</script>

<template>
    <div class="list p-2 my-2 rounded-lg text-left cursor-pointer flex flex-row gap-2">
        <img v-if="image" :src="image" class="aspect-square object-cover rounded-md" height="50px" width="50px" />
        <div>
            <h5 class="font-bold">
                {{ title }}
            </h5>
            <h6>
                {{ subtitle }}
            </h6>
        </div>
    </div>
</template>

<style scoped>
.list {
    background-color: var(--main_background)
}
</style>