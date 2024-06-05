<script setup>

definePageMeta({
    middleware: ["auth"]
})

const { locale, setLocale } = useI18n()

const selectedLanguage = ref('de')

async function changeSettings() {
    setLocale(selectedLanguage.value)
}

</script>

<template>
    <Main>
        <Card title="Einstellungen" :skeleton="true">
            <Dropdown v-model="selectedLanguage" :label="$t('language')"
                :options="[{ 'name': 'Deutsch', 'id': 'de' }, { 'name': 'Englisch', 'id': 'en' }]" />
            <ButtonChange @click="changeSettings()" :label="$t('changeSettings')" />
        </Card>
    </Main>
</template>