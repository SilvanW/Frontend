<script setup>

import { encode, decode } from 'base64-arraybuffer'

definePageMeta({
    middleware: ["auth"]
})

function showNotification(condition, time = 3000) {
    function remove() {
        condition.value = false
    }
    condition.value = true
    setTimeout(remove, time)
}

const supabase = useSupabaseClient()

// Define initial Card State
const showNewBattery = ref(false)
const showBatteryProperties = ref(false)

// Notifications
const showBatteryAdded = ref(false)
const showBatteryDeleted = ref(false)
const showBatteryUpdated = ref(false)

const inputValid = ref(false)

const batteryDataStore = useBatteryTypes()

await callOnce(batteryDataStore.fetchBatteryData)

console.log(batteryDataStore.batteries)

const battery_image = defineModel()

const manufacturerOptions = []

// Read Battery Manufacturers
const { data: battery_manufacturer_data, error: battery_manufacturer_error } = await supabase.from("battery_manufacturers").select()

if (battery_manufacturer_error) {
    console.log(battery_manufacturer_error)
} else {
    for (let index in battery_manufacturer_data) {
        let battery_manufacturer = battery_manufacturer_data[index]
        manufacturerOptions.push({
            "value": battery_manufacturer.id,
            "text": battery_manufacturer.name
        })
    }
}

const chemistryOptions = []

// Read Battery Chemistires
const { data: battery_chemistries_data, error: battery_chemistries_error } = await supabase.from("battery_chemistries").select()

if (battery_chemistries_error) {
    console.log(battery_chemistries_error)
} else {
    for (let index in battery_chemistries_data) {
        let battery_chemistry = battery_chemistries_data[index]
        chemistryOptions.push({
            "value": battery_chemistry.id,
            "text": battery_chemistry.name
        })
    }
}

const batteryData = ref(
    {
        "id": 0,
        "type": "",
        "manufacturer": manufacturerOptions[0].value,
        "cellChemistry": chemistryOptions[0].value,
        "nominalCapacity": 0,
        "nominalWeight": 0,
        "length": 0,
        "width": 0,
        "height": 0
    }
)

async function addBattery() {
    const { error } = await supabase.from("batteries").insert(
        {
            "type": batteryData.value.type,
            "manufacturer": batteryData.value.manufacturer,
            "chemistry": batteryData.value.cellChemistry,
            "nominalCapacity": batteryData.value.nominalCapacity,
            "nominalWeight": batteryData.value.nominalWeight,
            "length": batteryData.value.length,
            "width": batteryData.value.width,
            "height": batteryData.value.height
        }
    )

    if (error) {
        console.log(error)
        inputValid.value = true
        return
    }

    storeImage()

    showNotification(showBatteryAdded)

    showNewBattery.value = false

    batteryDataStore.fetchBatteryData()
}

function showBatteryContent(item) {
    showBatteryProperties.value = true
    showNewBattery.value = false

    batteryData.value = {
        "id": item.id,
        "type": item.type,
        "manufacturer": item.battery_manufacturers.id,
        "cellChemistry": item.battery_chemistries.id,
        "nominalCapacity": item.nominalCapacity,
        "nominalWeight": item.nominalWeight,
        "length": item.length,
        "width": item.width,
        "height": item.height
    }

}

async function updateBattery() {
    batteryDataStore.updateBatteryData(batteryData.value)

    showNotification(showBatteryUpdated)

    showBatteryProperties.value = false
}

async function deleteBattery() {
    batteryDataStore.deleteBatteryData(batteryData.value.id)

    showNotification(showBatteryDeleted)

    showBatteryProperties.value = false
}

function showNewBatteryCard() {
    showNewBattery.value = true
    showBatteryProperties.value = false
    batteryData.value = {
        "id": 0,
        "type": "",
        "manufacturer": manufacturerOptions[0].value,
        "cellChemistry": chemistryOptions[0].value,
        "nominalCapacity": 0,
        "nominalWeight": 0,
        "length": 0,
        "width": 0,
        "height": 0
    }
}

const { handleFileInput, files } = useFileStorage()

async function storeImage() {

    const base64_string = files.value[0].content.split('base64,')[1]

    console.log(base64_string)

    const { data, error } = await supabase.storage.from("battery_types").upload("private/test.png", decode(base64_string), {
        contentType: "image/png"
    })

    if (error) {
        console.log(error)
    }
}

async function getImage() {
    const { data, error } = await supabase.storage.from("battery_types").download('private/test.png')

    if (error) {
        console.log(error)
    }

    console.log(data)

    return data
}

</script>

<template>
    <Main>
        <Transition>
            <Notification v-if="showBatteryAdded" text="Batterie Hinzugefügt" />
        </Transition>
        <Transition>
            <Notification v-if="showBatteryDeleted" text="Batterie Gelöscht" />
        </Transition>
        <Transition>
            <Notification v-if="showBatteryUpdated" text="Batterie Geändert" />
        </Transition>
        <Card title="Batterieliste" skeleton="true">
            <img :src="getImage()" alt="Bild konnte nicht geladen werden" />
            <div class="list-container overflow-auto">
                <ListItem v-for="item in batteryDataStore.batteries" :title="item.type"
                    :subtitle="`Hersteller: ${item.battery_manufacturers.name}`" :key="item.id"
                    v-on:click="showBatteryContent(item)" />
            </div>
            <ButtonAdd v-on:click="showNewBatteryCard()" label="Neue Freigabe" tooltip="Neuer Batterietyp freigeben">
            </ButtonAdd>
        </Card>
        <Card v-model="showNewBattery" v-if="showNewBattery" title="Neue Batterie" skeleton="true" closable="true">
            <form @submit.prevent="addBattery">
                <TextInput v-model="batteryData.type" label="Typ" placeholder="Typennummer" required />
                <Dropdown v-model="batteryData.manufacturer" label="Manufacturer" :options="manufacturerOptions" />
                <Dropdown v-model="batteryData.cellChemistry" label="Zellchemie" :options="chemistryOptions" />
                <TextInput v-model="batteryData.nominalCapacity" label="Nominalkapazität [Ah]"
                    placeholder="Nominalkapazität" />
                <TextInput v-model="batteryData.nominalWeight" label="Nominalgewicht [g]"
                    placeholder="Nominalgewicht" />
                <TextInput v-model="batteryData.length" label="Länge [mm]" placeholder="Länge" />
                <TextInput v-model="batteryData.width" label="Breite [mm]" placeholder="Breite" />
                <TextInput v-model="batteryData.height" label="Höhe [mm]" placeholder="Höhe" />
                <input @input="handleFileInput" type="file" accept="image/png image/jpeg" class="file-input max-w-xs" />
                <ButtonAdd type="submit" @submit="addBattery()" label="Batterie Erstellen"
                    tooltip="Neuer Batterietyp erstellen" />
            </form>
        </Card>
        <Card v-model="showBatteryProperties" v-if="showBatteryProperties" title="Eigenschaften" skeleton="true"
            closable="true">
            <form>
                <TextInput v-model="batteryData.type" label="Typ" placeholder="Typennummer" />
                <Dropdown v-model="batteryData.manufacturer" label="Manufacturer" :options="manufacturerOptions" />
                <Dropdown v-model="batteryData.cellChemistry" label="Zellchemie" :options="chemistryOptions" />
                <TextInput v-model="batteryData.nominalCapacity" label="Nominalkapazität [Ah]"
                    placeholder="Nominalkapazität" />
                <TextInput v-model="batteryData.nominalWeight" label="Nominalgewicht [g]"
                    placeholder="Nominalgewicht" />
                <TextInput v-model="batteryData.length" label="Länge [mm]" placeholder="Länge" />
                <TextInput v-model="batteryData.width" label="Breite [mm]" placeholder="Breite" />
                <TextInput v-model="batteryData.height" label="Höhe [mm]" placeholder="Höhe" />
                <ButtonChange v-on:click="updateBattery()" label="Batterie Ändern" tooltip="Batterietyp ändern" />
                <ButtonDelete v-on:click="deleteBattery()" label="Batterie löschen" tooltip="Batterietyp Löschen" />
            </form>
        </Card>
    </Main>
</template>

<style scoped>
.list-container {
    max-height: 300px;
}
</style>
