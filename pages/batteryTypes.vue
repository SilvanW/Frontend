<script setup>

definePageMeta({
    middleware: ["auth"]
})

onMounted(() => {
    get_batteries()
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
const showProperties = ref(false)

// Notifications
const showBatteryAdded = ref(false)
const showBatteryDeleted = ref(false)
const showBatteryUpdated = ref(false)

const inputValid = ref(false)

const items = ref([])

async function get_batteries() {
    // Read Items from Database
    const { data: battery_data, error: battery_error } = await supabase.from("batteries").select(`
    id,
    type,
    battery_manufacturers (id, name),
    battery_chemistries (id, name),
    nominalCapacity,
    nominalWeight,
    length,
    width,
    height
`)

    if (battery_error) {
        console.log(battery_error)
    } else {
        items.value = battery_data
    }
}

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

    showNotification(showBatteryAdded)

    showNewBattery.value = false

    get_batteries()
}

function showBatteryContent(item) {
    showProperties.value = true

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
    const { error } = await supabase.from("batteries").update(
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
    ).eq('id', batteryData.value.id)

    if (error) {
        console.log(error)
    }

    showNotification(showBatteryUpdated)

    showProperties.value = false

    get_batteries()
}

async function deleteBattery() {
    const { error } = await supabase.from("batteries").delete().eq('id', batteryData.value.id)

    if (error) {
        console.log(error)
    }

    showNotification(showBatteryDeleted)

    showProperties.value = false

    get_batteries()
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
        <Card title="Batterieliste">
            <div class="list-container overflow-auto">
                <ListItem v-for="item in items" :title="item.type"
                    :subtitle="`Hersteller: ${item.battery_manufacturers.name}`" :key="item.id"
                    v-on:click="showBatteryContent(item)" />
            </div>
            <ButtonAdd v-on:click="showNewBattery = true" label="Neue Freigabe"></ButtonAdd>
        </Card>
        <Card v-model="showNewBattery" v-if="showNewBattery" title="Neue Batterie" closable="true">
            <form @submit.prevent="addBattery">
                <InputError :condition="inputValid" text="Werte konnten nicht abgespeichert werden" />
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
                <ButtonAdd type="submit" @submit="addBattery()" label="Batterie Erstellen" />
            </form>
        </Card>
        <Card v-model="showProperties" v-if="showProperties" title="Eigenschaften" closable="true">
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
                <ButtonChange v-on:click="updateBattery()" label="Batterie Ändern" />
                <ButtonDelete v-on:click="deleteBattery()" label="Batterie löschen" />
            </form>
        </Card>
    </Main>
</template>

<style scoped>
.list-container {
    max-height: 300px;
}
</style>
