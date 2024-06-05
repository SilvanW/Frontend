export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'de',
    messages: {
        de: {
            user: 'Benutzer',
            language: 'Sprache',
            changeSettings: 'Änderungen übernehmen',
            myPage: 'Meine Seite',
            batteryTypes: 'Batterietypen',
            settings: 'Einstellungen'
        },
        en: {
            user: 'User',
            language: 'Language',
            changeSettings: 'Apply changes',
            myPage: 'My page',
            batteryTypes: 'Battery types',
            settings: 'Settings'
        }
    }
}))