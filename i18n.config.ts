export default defineI18nConfig(() => ({
    legacy: false,
    messages: {
        de: {
            user: 'Benutzer',
            language: 'Sprache',
            changeSettings: 'Änderungen übernehmen',
            myPage: 'Meine Seite',
            batteryTypes: 'Batterietypen',
            settings: 'Einstellungen',
            welcome: 'Willkommen',
            function: 'Funktion',
            batteryList: 'Batterieliste',
            properties: 'Eigenschaften',
            manufacturer: 'Hersteller',
            cellChemistry: 'Zellchemie',
            type: 'Typ',
            nominalCapacity: 'Nominalkapazität [Ah]',
            nominalWeight: 'Nominalgewicht [g]',
            length: 'Länge [mm]',
            width: 'Breite [mm]',
            height: 'Höhe [mm]',
            changeBattery: 'Batterie ändern',
            deleteBattery: 'Batterie löschen',
            newBattery: 'Batterie hinzufügen',
            createBattery: 'Batterie erstellen',
            placeholders: {
                enterEmail: 'Email eingeben',
                enterPassword: 'Passwort eingeben',
            },
            tooltips: {
                newBattery: 'Neuer Batterietyp erstellen',
                changeBattery: 'Batterietyp ändern',
                deleteBattery: 'Batterietyp löschen',
                changeSettings: 'Änderungen übernehmen'
            },
            popups: {
                changeSettings: {
                    title: 'Änderungen übernehmen',
                    message: 'Sollen die Änderungen wirklich übernommen werden?',
                    decline: 'Nein',
                    accept: 'Ja'
                },
                changeBattery: {
                    title: 'Änderungen übernehmen',
                    message: 'Sollen die Änderungen wirklick übernommen werden?',
                    decline: 'Nein',
                    accept: 'Ja',
                },
                deleteBattery: {
                    title: 'Batterie löschen',
                    message: 'Soll die Batterie wirklich gelöscht werden?',
                    decline: 'Nein',
                    accept: 'Ja'
                },
                createBattery: {
                    title: 'Batterie hinzufügen',
                    message: 'Soll die Batterie wirklich erstellt werden?',
                    decline: 'Nein',
                    accept: 'Ja'
                }
            }
        },
        en: {
            user: 'User',
            language: 'Language',
            changeSettings: 'Apply changes',
            myPage: 'My page',
            batteryTypes: 'Battery types',
            settings: 'Settings',
            welcome: 'Welcome',
            function: 'Function',
            batteryList: 'List of batteries',
            properties: 'Properties',
            manufacturer: 'Manufacturer',
            cellChemistry: 'Cell Chemistry',
            type: 'Type',
            nominalCapacity: 'Nominal capacity [Ah]',
            nominalWeight: 'Nominal weight [g]',
            length: 'Length [mm]',
            width: 'Width [mm]',
            height: 'Height [mm]',
            changeBattery: 'Change Battery',
            deleteBattery: 'Delete Battery',
            newBattery: 'Add Battery',
            createBattery: 'Create Battery',
            placeholders: {
                enterEmail: 'Enter email',
                enterPassword: 'Enter password',
            },
            tooltips: {
                newBattery: 'Create new battery type',
                changeBattery: 'Change battery type',
                deleteBattery: 'Delete battery type',
                changeSettings: 'Apply changes'
            },
            popups: {
                changeSettings: {
                    title: 'Apply changes',
                    message: 'Should the changes really be accepted?',
                    decline: 'No',
                    accept: 'Yes'
                },
                changeBattery: {
                    title: 'Apply changes',
                    message: 'Should the changes really be accepted?',
                    decline: 'No',
                    accept: 'Yes',
                },
                deleteBattery: {
                    title: 'Delete battery',
                    message: 'Should the battery really be deleted?',
                    decline: 'No',
                    accept: 'Yes'
                },
                createBattery: {
                    title: 'Add battery',
                    message: 'Should the battery really be created?',
                    decline: 'No',
                    accept: 'Yes'
                }
            }
        }
    }
}))
