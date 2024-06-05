<script setup>

import { decode } from 'base64-arraybuffer'

import { v4 as uuidv4 } from 'uuid';

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

// Initialize Stores
const batteryTypesStore = useBatteryTypes()
const batteryManufacturersStore = useBatteryManufacturers()
const batteryChemistriesStore = useBatteryChemistries()
const batteryTypeImagesStore = useBatteryTypeImages()

// Define Battery Data Reference
const batteryData = ref({
    "id": 0,
    "type": "",
    "manufacturer": 1,
    "cellChemistry": 1,
    "nominalCapacity": 0,
    "nominalWeight": 0,
    "length": 0,
    "width": 0,
    "height": 0,
    "storageUUID": ''
})

const dataUrl = ref('')

async function getImage() {
    const { data, error } = await supabase.storage.from("battery_types").download('private/dd468e46-3458-479f-9aca-1e06a21f1cdf.png')

    if (error) {
        console.log(error)
    }

    const reader = new FileReader()

    reader.onload = function (e) {
        dataUrl.value = e.target.result
    }

    if (data) {
        reader.readAsDataURL(data)
    }
}

onMounted(async () => {
    await batteryTypesStore.fetchBatteryData()
    await batteryManufacturersStore.fetchBatteryManufacturers()
    await batteryChemistriesStore.fetchBatteryChemistries()
    await batteryTypeImagesStore.fetchBatteryTypeImages()
    await getImage()
});

async function addBattery() {
    batteryData.value.storageUUID = uuidv4()
    batteryTypesStore.insertBatteryData(batteryData.value)
    console.log(batteryData.value.storageUUID)
    storeImage(batteryData.value.storageUUID)

    showNotification(showBatteryAdded)

    showNewBattery.value = false
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
    batteryTypesStore.updateBatteryData(batteryData.value)

    showNotification(showBatteryUpdated)

    showBatteryProperties.value = false
}

async function deleteBattery() {
    batteryTypesStore.deleteBatteryData(batteryData.value.id)

    showNotification(showBatteryDeleted)

    showBatteryProperties.value = false
}

function showNewBatteryCard() {
    showNewBattery.value = true
    showBatteryProperties.value = false
    batteryData.value = {
        "id": 0,
        "type": "",
        "manufacturer": 1,
        "cellChemistry": 1,
        "nominalCapacity": 0,
        "nominalWeight": 0,
        "length": 0,
        "width": 0,
        "height": 0
    }
}

const { handleFileInput, files } = useFileStorage()

async function storeImage(batteryId) {

    console.log(files.value[0].content)

    const base64_string = files.value[0].content.split('base64,')[1]

    const { data, error } = await supabase.storage.from("battery_types").upload(`private/${batteryId}.png`, decode(base64_string), {
        contentType: "image/png"
    })

    if (error) {
        console.log(error)
    }

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
            <div class="list-container overflow-auto">
                <ListItem v-for="item in batteryTypesStore.batteryTypes" :title="item.type"
                    :subtitle="`Hersteller: ${item.battery_manufacturers.name}`" :key="item.id"
                    v-on:click="showBatteryContent(item)"
                    :image="batteryTypeImagesStore.batteryTypeImageReferences[item.storageUUID]" />
            </div>
            <ButtonAdd v-on:click="showNewBatteryCard()" label="Neue Freigabe" tooltip="Neuer Batterietyp freigeben">
            </ButtonAdd>
        </Card>
        <Card v-model="showNewBattery" v-if="showNewBattery" title="Neue Batterie" skeleton="true" closable="true">
            <form @submit.prevent="addBattery">
                <TextInput v-model="batteryData.type" label="Typ" placeholder="Typennummer" required />
                <Dropdown v-model="batteryData.manufacturer" label="Manufacturer"
                    :options="batteryManufacturersStore.batteryManufacturers" />
                <Dropdown v-model="batteryData.cellChemistry" label="Zellchemie"
                    :options="batteryChemistriesStore.batteryChemistries" />
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
                <div class="w-full flex justify-center">
                    <img :src="dataUrl" class="aspect-square object-cover rounded-md" width="100px" />
                </div>
                <TextInput v-model="batteryData.type" label="Typ" placeholder="Typennummer" />
                <Dropdown v-model="batteryData.manufacturer" label="Manufacturer"
                    :options="batteryManufacturersStore.batteryManufacturers" />
                <Dropdown v-model="batteryData.cellChemistry" label="Zellchemie"
                    :options="batteryChemistriesStore.batteryChemistries" />
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
