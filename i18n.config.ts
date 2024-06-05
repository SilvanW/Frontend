export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'de',
    messages: {
        de: {
            user: 'Benutzer',
            language: 'Sprache',
            changeSettings: 'Änderungen übernehmen'
        },
        en: {
            user: 'User',
            language: 'Language',
            changeSettings: 'Apply changes'
        }
    }
}))
