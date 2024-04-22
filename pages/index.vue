<script setup>
definePageMeta({
    middleware: ["auth"]
})
</script>

<template>
    <Main>
        <Card title="Willkommen">
            <div class="p-2">
                <TextOutput label="Benutzer" value="Silvan Wiedmer" />
                <TextOutput label="Funktion" value="Developer" />
            </div>
        </Card>
    </Main>
</template>