<script setup>
defineProps(["label", "tooltip"])
</script>

<template>
    <b-button button="danger" class="my-2 py-2 px-4 rounded-lg w-full" toggle="tooltip" placement="bottom"
        :title="tooltip">
        <div class="flex flex-row justify-center items-center">
            <Icon name="fa6-solid:trash" color="white" size="1em"></Icon>
            <h5 class="px-1 m-1">{{ label }}</h5>
        </div>
    </b-button>
</template>