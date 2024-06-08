<template>
    <main class="flex-1 flex flex-row justify-begin items-start flex-wrap overflow-auto">
        <slot />
    </main>
</template>

<style scoped>
main {
    background-color: var(--main_background);
}
</style>