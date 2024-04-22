<script lang="ts" setup></script>

<template>
    <NuxtLoadingIndicator />
    <div class="h-screen flex flex-col">
        <header>
            <h1 id="title" class="font-bold text-6xl">Octopus</h1>
            <img src="/Logo-Kyburz.svg" alt="Kyburz Logo" id="logo" />
        </header>
        <NuxtPage />
    </div>
</template>

<style scoped>
header {
    background: var(--header_background);
    padding: 0.1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}

#title {
    color: var(--logo_text_color);
}

#logo {
    height: 50%;
    max-width: 25%;
    min-width: 150px;
}
</style>