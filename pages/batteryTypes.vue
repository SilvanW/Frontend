<script setup>

import { decode } from 'base64-arraybuffer'

import { v4 as uuidv4 } from 'uuid';

definePageMeta({
    middleware: ["auth"]
})

const { t } = useI18n()

const { handleFileInput, files } = useFileStorage()

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
const currentUserStore = useCurrentUser()
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

const batteryErrors = ref({
    type: false,
    nominalCapacity: false,
    nominalWeight: false,
    length: false,
    width: false,
    height: false,
    image: false
})

function isPositiveNumber(number) {
    // Check if number
    if (isNaN(number)) {
        return false
    }

    // Check if positive
    if (number <= 0) {
        return false
    }

    return true
}

function checkBatteryData(popupName) {
    // Check Type
    if (batteryData.value.type === "") {
        errorMessage.value = `${t('type')} ${t('errorMessages.defined')}`
        batteryErrors.value.type = true
        return
    }

    // Error should be disabled when checks complete
    batteryErrors.value.type = false

    // Check Capacity
    if (batteryData.value.nominalCapacity === "") {
        errorMessage.value = `${t('nominalCapacity')} ${t('errorMessages.defined')}`
        batteryErrors.value.nominalCapacity = true
        return
    }

    if (!isPositiveNumber(batteryData.value.nominalCapacity)) {
        errorMessage.value = `${t('nominalCapacity')} ${t('errorMessages.positveNumber')}`
        batteryErrors.value.nominalCapacity = true
        return
    }

    // Error should be disabled when checks complete
    batteryErrors.value.nominalCapacity = false

    // Check Weight
    if (batteryData.value.nominalWeight === "") {
        errorMessage.value = `${t('nominalWeight')} ${t('errorMessages.defined')}`
        batteryErrors.value.nominalWeight = true
        return
    }

    if (!isPositiveNumber(batteryData.value.nominalWeight)) {
        errorMessage.value = `${t('nominalWeight')} ${t('errorMessages.positveNumber')}`
        batteryErrors.value.nominalWeight = true
        return
    }

    // Error should be disabled when checks complete
    batteryErrors.value.nominalWeight = false

    // Check Length
    if (batteryData.value.length === "") {
        errorMessage.value = `${t('length')} ${t('errorMessages.defined')}`
        batteryErrors.value.length = true
        return
    }

    if (!isPositiveNumber(batteryData.value.length)) {
        errorMessage.value = `${t('length')} ${t('errorMessages.positveNumber')}`
        batteryErrors.value.length = true
        return
    }

    // Error should be disabled when checks complete
    batteryErrors.value.length = false

    // Check Width
    if (batteryData.value.width === "") {
        errorMessage.value = `${t('width')} ${t('errorMessages.defined')}`
        batteryErrors.value.width = true
        return
    }

    if (!isPositiveNumber(batteryData.value.width)) {
        errorMessage.value = `${t('width')} ${t('errorMessages.positveNumber')}`
        batteryErrors.value.width = true
        return
    }

    // Error should be disabled when checks complete
    batteryErrors.value.width = false

    // Check Height
    if (batteryData.value.height === "") {
        errorMessage.value = `${t('height')} ${t('errorMessages.defined')}`
        batteryErrors.value.height = true
        return
    }

    if (!isPositiveNumber(batteryData.value.height)) {
        errorMessage.value = `${t('height')} ${t('errorMessages.positveNumber')}`
        batteryErrors.value.height = true
        return
    }

    // Error should be disabled when checks complete
    batteryErrors.value.height = false

    // Check Image (only when new battery gets created)
    if (files.value[0] === undefined && popupName === "CreateBatteryPopup") {
        errorMessage.value = `${t('errorMessages.imageRequired')}`
        batteryErrors.value.image = true
        return
    }

    // Error should be disabled when checks complete
    batteryErrors.value.image = false

    errorMessage.value = ''

    if (popupName === "CreateBatteryPopup") {
        showCreateBatteryPopup.value = true
    } else {
        showChangeBatteryPopup.value = true
    }
}

async function addBattery() {
    batteryData.value.storageUUID = uuidv4()
    batteryTypesStore.insertBatteryData(batteryData.value)

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
    // Reset errors
    errorMessage.value = ''
    batteryErrors.value = {
        type: false,
        nominalCapacity: false,
        nominalWeight: false,
        length: false,
        width: false,
        height: false,
        image: false
    }

    showNewBattery.value = true
    showBatteryProperties.value = false

    // Delete files in fileStorage (required to check if files uploaded or not)
    files.value[0] = undefined
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

async function storeImage(uuid) {

    const base64_string = files.value[0].content.split('base64,')[1]

    batteryTypeImagesStore.uploadBatteryTypeImage(uuid, decode(base64_string))
}

onMounted(async () => {
    await currentUserStore.fetchCurrentUser()
    await batteryTypesStore.fetchBatteryData()
    await batteryManufacturersStore.fetchBatteryManufacturers()
    await batteryChemistriesStore.fetchBatteryChemistries()
    await batteryTypeImagesStore.fetchBatteryTypeImages()
});

</script>

<template>
    <Main>
        <Transition>
            <Notification v-if="showBatteryAdded" :text="$t('notifications.batteryAdded')" />
        </Transition>
        <Transition>
            <Notification v-if="showBatteryDeleted" :text="$t('notifications.batteryDeleted')" />
        </Transition>
        <Transition>
            <Notification v-if="showBatteryUpdated" :text="$t('notifications.batteryChanged')" />
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
                <div v-if="files[0]" class="w-full flex justify-center">
                    <img :src="files[0].content" class="aspect-square object-cover rounded-md" width="100px" />
                </div>
                <TextInput v-model="batteryData.type" :label="$t('type')" :placeholder="$t('placeholders.typeNumber')"
                    :hasError="batteryErrors.type" />
                <Dropdown v-model="batteryData.manufacturer" :label="$t('manufacturer')"
                    :options="batteryManufacturersStore.batteryManufacturers" />
                <Dropdown v-model="batteryData.cellChemistry" :label="$t('cellChemistry')"
                    :options="batteryChemistriesStore.batteryChemistries" />
                <TextInput v-model="batteryData.nominalCapacity" :label="$t('nominalCapacity')"
                    :placeholder="$t('placeholders.nominalCapacity')" :hasError="batteryErrors.nominalCapacity" />
                <TextInput v-model="batteryData.nominalWeight" :label="$t('nominalWeight')"
                    :placeholder="$t('placeholders.nominalWeight')" :hasError="batteryErrors.nominalWeight" />
                <TextInput v-model="batteryData.length" :label="$t('length')" :placeholder="$t('placeholders.length')"
                    :hasError="batteryErrors.length" />
                <TextInput v-model="batteryData.width" :label="$t('width')" :placeholder="$t('placeholders.width')"
                    :hasError="batteryErrors.width" />
                <TextInput v-model="batteryData.height" :label="$t('height')" :placeholder="$t('placeholders.height')"
                    :hasError="batteryErrors.height" />
                <TextOutput v-if="files[0]" label="Filename" :value="files[0].name" />
                <label v-bind:class="{ 'btn-error': batteryErrors.image }"
                    class="btn btn-neutral my-2 py-2 px-4 w-full">
                    <div class="flex flex-row justify-center items-center">
                        <Icon name="fa6-solid:image" color="white" size="1em"></Icon>
                        <h5 class="px-1 m-1 text-white">{{ $t('uploadImage') }}</h5>
                    </div>
                    <input @input="handleFileInput" type="file" accept="image/png image/jpeg" style="display: none;" />
                </label>
                <ButtonAdd @click="checkBatteryData('CreateBatteryPopup')" :label="$t('createBattery')"
                    :tooltip="$t('tooltips.newBattery')" />
            </div>

        </Card>
        <Card v-model="showBatteryProperties" v-if="showBatteryProperties" :title="$t('properties')" skeleton="true"
            closable="true">
            <div class="p-2">
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
                <TextInput v-model="batteryData.width" :label="$t('width')" :placeholder="$t('placeholders.width')" />
                <TextInput v-model="batteryData.height" :label="$t('height')"
                    :placeholder="$t('placeholders.height')" />
                <ButtonChange v-on:click="checkBatteryData('ChangeBatteryPopup')" :label="$t('changeBattery')"
                    :tooltip="$t('tooltips.changeBattery')" />
                <ButtonDelete v-on:click="showDeleteBatteryPopup = true" :label="$t('deleteBattery')"
                    :tooltip="$t('tooltips.deleteBattery')" />
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
