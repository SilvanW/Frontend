<script setup>

definePageMeta({
    middleware: ["auth"]
})

const { setLocale } = useI18n()

// Load currentUser Store
const currentUserStore = useCurrentUser()

const selectedLanguage = ref('de')

// Popup state
const showChangeSettingsPopup = ref(false)

async function changeSettings() {
    showChangeSettingsPopup.value = false
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
            <div class="p-2">
                <Dropdown v-model="selectedLanguage" :label="$t('language')" :options="availableLanguages" />
                <ButtonChange @click="showChangeSettingsPopup = true" :label="$t('changeSettings')" />
            </div>
        </Card>
    </Main>
    <Popup v-if="showChangeSettingsPopup" title="Änderungen übernehmen" v-model="showChangeSettingsPopup">
        <h1>Sollen die Änderungen wirklich übernommen werden?</h1>
        <div class="flex gap-2">
            <ButtonDecline @click="showChangeSettingsPopup = false" label="Nein" />
            <ButtonAccept @click="changeSettings" label="Ja" />
        </div>
    </Popup>
</template>