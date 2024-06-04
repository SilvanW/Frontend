<script setup>

definePageMeta({
    middleware: ["auth"]
})

// Initialize Stores
const currentUserStore = useCurrentUser()

await callOnce(currentUserStore.fetchCurrentUser)

</script>

<template>
    <Main>
        <Card title="Willkommen" :skeleton="currentUserStore.user">
            <div class="p-2">
                <TextOutput label="Benutzer" :value="currentUserStore.user.name" />
                <TextOutput label="Funktion" :value="currentUserStore.user.permission" />
            </div>
        </Card>
    </Main>
</template>