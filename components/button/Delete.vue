<script setup>
defineProps(["label", "tooltip"])
</script>

<template>
    <Tooltip :tooltip="tooltip">
        <button class="btn btn-error my-2 py-2 px-4 w-full">
            <div class="flex flex-row justify-center items-center">
                <Icon name="fa6-solid:trash" color="white" size="1em"></Icon>
                <h5 class="px-1 m-1 text-white">{{ label }}</h5>
            </div>
        </button>
    </Tooltip>
</template>