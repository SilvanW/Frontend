<script setup>
defineProps(["label", "tooltip"])
</script>

<template>
    <b-button button="primary" class="my-2 py-2 px-4 w-full" toggle="tooltip" placement="bottom" :title="tooltip">
        <div class="flex flex-row justify-center items-center">
            <Icon name="fa6-solid:pencil" color="white" size="1em"></Icon>
            <h5 class="px-1 m-1">{{ label }}</h5>
        </div>
    </b-button>
</template>
