<script setup>
defineProps(["label"])
</script>

<template>
    <b-button button="danger" class="my-1 w-full ">
        <div class="flex flex-row justify-center items-center">
            <Icon name="fa6-solid:trash" color="white" size="1em"></Icon>
            <h4 class="px-1 m-1">{{ label }}</h4>
        </div>
    </b-button>
</template>