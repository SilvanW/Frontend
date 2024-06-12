<script setup>

definePageMeta({
    middleware: ["auth"]
})

useI18n()

// Load currentUser Store
const currentUserStore = useCurrentUser()

const selectedLanguage = ref(false)

// Popup state
const showChangeSettingsPopup = ref(false)

async function changeSettings() {
    showChangeSettingsPopup.value = false
    await currentUserStore.updateDefaultLanguage(selectedLanguage.value)
}

const availableLanguages = [{ 'name': 'Deutsch', 'id': 'de' }, { 'name': 'Englisch', 'id': 'en' }]

onMounted(async () => {
    await currentUserStore.fetchCurrentUser()
    selectedLanguage.value = currentUserStore.user.defaultLanguage
})

</script>

<template>
    <Main>
        <Card :title="$t('settings')" :skeleton="selectedLanguage">
            <div class="p-2">
                <Dropdown v-model="selectedLanguage" :label="$t('language')" :options="availableLanguages" />
                <ButtonChange @click="showChangeSettingsPopup = true" :label="$t('changeSettings')"
                    :tooltip="$t('tooltips.changeSettings')" />
            </div>
        </Card>
    </Main>
    <Popup v-if="showChangeSettingsPopup" :title="$t('popups.changeSettings.title')" v-model="showChangeSettingsPopup">
        <h1>{{ $t('popups.changeSettings.message') }}</h1>
        <div class="flex gap-2">
            <ButtonDecline @click="showChangeSettingsPopup = false" :label="$t('popups.changeSettings.decline')" />
            <ButtonAccept @click="changeSettings" :label="$t('popups.changeSettings.accept')" />
        </div>
    </Popup>
</template>