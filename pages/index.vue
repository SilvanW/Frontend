<script setup>

definePageMeta({
    middleware: ["auth"]
})

const { setLocale } = useI18n()

// Initialize Stores
const currentUserStore = useCurrentUser()

onMounted(async () => {
    await currentUserStore.fetchCurrentUser()
    setLocale(currentUserStore.user.defaultLanguage)
});
</script>

<template>
    <Main>
        <Card :title="$t('welcome')" :skeleton="currentUserStore.user">
            <div class="p-2">
                <TextOutput :label="$t('user')" :value="currentUserStore.user.name" />
                <TextOutput :label="$t('function')" :value="currentUserStore.user.permission" />
            </div>
        </Card>
    </Main>
</template>