<script setup>
const showPopup = ref(false)
</script>

<template>
    <Main>
        <Card title="Willkommen">
            <div class="p-2">
                <TextOutput label="Benutzer" value="Silvan Wiedmer" />
                <TextOutput label="Funktion" value="Developer" />
                <TextOutput label="Berechtigung" value="Administrator" />
                <TextOutput label="IP-Addresse" value="10.242.2.2" />
                <br>
                <TextOutput label="Bei Problemen bitte ein Foto des Fehlers machen und an Yunus Ruff melden!"
                    value="" />
            </div>
        </Card>
    </Main>
    <Popup v-model="showPopup" v-if="showPopup" title="Popup">
        <h1>Very important Popup message</h1>
    </Popup>
</template>