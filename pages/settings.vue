<script setup>

definePageMeta({
    middleware: ["auth"]
})

const { setLocale } = useI18n()

// Load currentUser Store
const currentUserStore = useCurrentUser()

const selectedLanguage = ref('de')

async function changeSettings() {
    setLocale(selectedLanguage.value)
    currentUserStore.updateDefaultLanguage(selectedLanguage.value)
}

const availableLanguages = [{ 'name': 'Deutsch', 'id': 'de' }, { 'name': 'Englisch', 'id': 'en' }]

onMounted(async () => {
    currentUserStore.fetchCurrentUser()
    selectedLanguage.value = currentUserStore.user.defaultLanguage
})

</script>

<template>
    <Main>
        <Card :title="$t('settings')" :skeleton="true">
            <Dropdown v-model="selectedLanguage" :label="$t('language')" :options="availableLanguages" />
            <ButtonChange @click="changeSettings()" :label="$t('changeSettings')" />
        </Card>
    </Main>
</template>