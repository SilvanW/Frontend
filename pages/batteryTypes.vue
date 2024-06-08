<script setup>

import { decode } from 'base64-arraybuffer'

import { v4 as uuidv4 } from 'uuid';

definePageMeta({
    middleware: ["auth"]
})

useI18n()

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

// Popups
const showChangeBatteryPopup = ref(false)
const showDeleteBatteryPopup = ref(false)
const showCreateBatteryPopup = ref(false)

// Error Message
const errorMessage = ref('')

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

async function checkBatteryData() {
    console.log(batteryData.value)
    // Check Type
    if (batteryData.value.type === "") {
        errorMessage.value = "Type must be defined"
        return
    }

    // Check Capacity
    if (batteryData.value.nominalCapacity === "") {
        errorMessage.value = "Nominal Capacity must be defined"
        return
    }

    if (isNaN(batteryData.value.nominalCapacity)) {
        errorMessage.value = "Nominal Capacity must be a positve number"
        return
    }

    if (batteryData.value.nominalCapacity <= 0) {
        errorMessage.value = "Nominal Capacity must be a positive number"
        return
    }

    // Check Weight
    if (batteryData.value.nominalWeight === "") {
        errorMessage.value = "Nominal Weight must be defined"
        return
    }

    if (isNaN(batteryData.value.nominalWeight)) {
        errorMessage.value = "Nominal Weight must be a positive number"
        return
    }

    if (batteryData.value.nominalWeight <= 0) {
        errorMessage.value = "Nominal Weight must be a positive number"
        return
    }

    // Check Length
    if (batteryData.value.length === "") {
        errorMessage.value = "Length must be defined"
        return
    }

    if (isNaN(batteryData.value.length)) {
        errorMessage.value = "Length must be a positive number"
        return
    }

    if (batteryData.value.length <= 0) {
        errorMessage.value = "Length must be a positive number"
        return
    }

    // Check Width
    if (batteryData.value.width === "") {
        errorMessage.value = "Width must be defined"
        return
    }

    if (isNaN(batteryData.value.width)) {
        errorMessage.value = "Width must be a positive number"
        return
    }

    if (batteryData.value.width <= 0) {
        errorMessage.value = "Width must be a positive number"
        return
    }

    // Check Height
    if (batteryData.value.height === "") {
        errorMessage.value = "Height must be defined"
        return
    }

    if (isNaN(batteryData.value.height)) {
        errorMessage.value = "Height must be a positive number"
        return
    }

    if (batteryData.value.height <= 0) {
        errorMessage.value = "Height must be a positive number"
        return
    }

    errorMessage.value = ''

    showCreateBatteryPopup.value = true
}

async function addBattery() {
    batteryData.value.storageUUID = uuidv4()
    batteryTypesStore.insertBatteryData(batteryData.value)
    console.log(batteryData.value.storageUUID)
    storeImage(batteryData.value.storageUUID)

    showNotification(showBatteryAdded)

    showNewBattery.value = false

    showCreateBatteryPopup.value = false
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
        "height": item.height,
        "storageUUID": item.storageUUID
    }

}

async function updateBattery() {
    batteryTypesStore.updateBatteryData(batteryData.value)

    showNotification(showBatteryUpdated)

    showBatteryProperties.value = false

    showChangeBatteryPopup.value = false
}

async function deleteBattery() {
    batteryTypesStore.deleteBatteryData(batteryData.value.id)
    batteryTypeImagesStore.deleteBatteryTypeImage(batteryData.value.storageUUID)

    showNotification(showBatteryDeleted)

    showBatteryProperties.value = false

    showDeleteBatteryPopup.value = false
}

function showNewBatteryCard() {
    showNewBattery.value = true
    showBatteryProperties.value = false
    batteryData.value = {
        "id": 0,
        "type": "",
        "manufacturer": 1,
        "cellChemistry": 1,
        "nominalCapacity": '',
        "nominalWeight": '',
        "length": '',
        "width": '',
        "height": ''
    }
}

const { handleFileInput, files } = useFileStorage()

async function storeImage(uuid) {

    const base64_string = files.value[0].content.split('base64,')[1]

    batteryTypeImagesStore.uploadBatteryTypeImage(uuid, decode(base64_string))
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
        <Card :title="$t('batteryList')" skeleton="true">
            <div class="p-2">
                <div class="list-container overflow-auto">
                    <ListItem v-for="item in batteryTypesStore.batteryTypes" :title="item.type"
                        :subtitle="`${$t('manufacturer')}: ${item.battery_manufacturers.name}`" :key="item.id"
                        v-on:click="showBatteryContent(item)"
                        :image="batteryTypeImagesStore.batteryTypeImageReferences[item.storageUUID]" />
                </div>
                <ButtonAdd v-on:click="showNewBatteryCard()" :label="$t('newBattery')"
                    :tooltip="$t('tooltips.newBattery')">
                </ButtonAdd>
            </div>

        </Card>
        <Card v-model="showNewBattery" v-if="showNewBattery" :title="$t('newBattery')" skeleton="true" closable="true">
            <div class="p-2">
                <InputError :text="errorMessage" :condition="errorMessage" />
                <form @submit.prevent="true">
                    <div v-if="batteryData.storageUUID" class="w-full flex justify-center">
                        <img :src="batteryTypeImagesStore.batteryTypeImageReferences[batteryData.storageUUID]"
                            class="aspect-square object-cover rounded-md" width="100px" />
                    </div>
                    <TextInput v-model="batteryData.type" :label="$t('type')"
                        :placeholder="$t('placeholders.typeNumber')" />
                    <Dropdown v-model="batteryData.manufacturer" :label="$t('manufacturer')"
                        :options="batteryManufacturersStore.batteryManufacturers" />
                    <Dropdown v-model="batteryData.cellChemistry" :label="$t('cellChemistry')"
                        :options="batteryChemistriesStore.batteryChemistries" />
                    <TextInput v-model="batteryData.nominalCapacity" :label="$t('nominalCapacity')"
                        :placeholder="$t('placeholders.nominalCapacity')" />
                    <TextInput v-model="batteryData.nominalWeight" :label="$t('nominalWeight')"
                        :placeholder="$t('placeholders.nominalWeight')" />
                    <TextInput v-model="batteryData.length" :label="$t('length')"
                        :placeholder="$t('placeholders.length')" />
                    <TextInput v-model="batteryData.width" :label="$t('width')"
                        :placeholder="$t('placeholders.width')" />
                    <TextInput v-model="batteryData.height" :label="$t('height')"
                        :placeholder="$t('placeholders.height')" />
                    <input @input="handleFileInput" type="file" accept="image/png image/jpeg"
                        class="file-input max-w-xs" />
                    <ButtonAdd @click="checkBatteryData()" :label="$t('createBattery')"
                        :tooltip="$t('tooltips.newBattery')" />
                </form>
            </div>

        </Card>
        <Card v-model="showBatteryProperties" v-if="showBatteryProperties" :title="$t('properties')" skeleton="true"
            closable="true">
            <div class="p-2">
                <form @submit.prevent="true">
                    <div class="w-full flex justify-center">
                        <img :src="batteryTypeImagesStore.batteryTypeImageReferences[batteryData.storageUUID]"
                            class="aspect-square object-cover rounded-md" width="100px" />
                    </div>
                    <TextInput v-model="batteryData.type" :label="$t('type')"
                        :placeholder="$t('placeholders.typeNumber')" />
                    <Dropdown v-model="batteryData.manufacturer" :label="$t('manufacturer')"
                        :options="batteryManufacturersStore.batteryManufacturers" />
                    <Dropdown v-model="batteryData.cellChemistry" :label="$t('cellChemistry')"
                        :options="batteryChemistriesStore.batteryChemistries" />
                    <TextInput v-model="batteryData.nominalCapacity" :label="$t('nominalCapacity')"
                        :placeholder="$t('placeholders.nominalCapacity')" />
                    <TextInput v-model="batteryData.nominalWeight" :label="$t('nominalWeight')"
                        :placeholder="$t('placeholders.nominalWeight')" />
                    <TextInput v-model="batteryData.length" :label="$t('length')"
                        :placeholder="$t('placeholders.length')" />
                    <TextInput v-model="batteryData.width" :label="$t('width')"
                        :placeholder="$t('placeholders.width')" />
                    <TextInput v-model="batteryData.height" :label="$t('height')"
                        :placeholder="$t('placeholders.height')" />
                    <ButtonChange v-on:click="showChangeBatteryPopup = true" :label="$t('changeBattery')"
                        :tooltip="$t('tooltips.changeBattery')" />
                    <ButtonDelete v-on:click="showDeleteBatteryPopup = true" :label="$t('deleteBattery')"
                        :tooltip="$t('tooltips.deleteBattery')" />
                </form>
            </div>
        </Card>
    </Main>
    <Popup v-if="showChangeBatteryPopup" :title="$t('popups.changeBattery.title')" v-model="showChangeBatteryPopup">
        <h1>{{ $t('popups.changeBattery.message') }}</h1>
        <div class="flex gap-2">
            <ButtonDecline @click="showChangeBatteryPopup = false" :label="$t('popups.changeBattery.decline')" />
            <ButtonAccept @click="updateBattery()" :label="$t('popups.changeBattery.accept')" />
        </div>
    </Popup>
    <Popup v-if="showDeleteBatteryPopup" :title="$t('popups.deleteBattery.title')" v-model="showDeleteBatteryPopup">
        <h1>{{ $t('popups.deleteBattery.message') }}</h1>
        <div class="flex gap-2">
            <ButtonDecline @click="showDeleteBatteryPopup = false" :label="$t('popups.deleteBattery.decline')" />
            <ButtonAccept @click="deleteBattery()" :label="$t('popups.deleteBattery.accept')" />
        </div>
    </Popup>
    <Popup v-if="showCreateBatteryPopup" :title="$t('popups.createBattery.title')" v-model="showCreateBatteryPopup">
        <h1>{{ $t('popups.createBattery.message') }}</h1>
        <div class="flex gap-2">
            <ButtonDecline @click="showCreateBatteryPopup = false" :label="$t('popups.createBattery.decline')" />
            <ButtonAccept @click="addBattery()" :label="$t('popups.createBattery.accept')" />
        </div>
    </Popup>
</template>

<style scoped>
.list-container {
    max-height: 300px;
}
</style>
