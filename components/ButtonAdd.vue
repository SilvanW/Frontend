<script setup>
defineProps(["label"])
</script>

<template>
    <b-button button="primary" class="button-add py-2 px-4 rounded-lg w-full ">
        <div class="flex flex-row justify-center items-center">
            <Icon name="fa6-solid:plus" color="white" size="1em"></Icon>
            <h3 class="px-1">{{ label }}</h3>
        </div>
    </b-button>
</template>