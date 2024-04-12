<script setup>

const supabase = useSupabaseClient()

// Define initial State
const showNewBattery = ref(false)
const showProperties = ref(false)

const items = ref([])

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
    console.log(battery_data)
    items.value = battery_data
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

function addBattery() {
    showNewBattery.value = false
}

function updateBattery() {
    alert("Not Implemented")
}

function showBatteryContent(item) {
    showProperties.value = true

    batteryData.value = {
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

</script>

<template>
    <Main>
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
                <TextInput v-model="batteryData.type" label="Typ" placeholder="Typennummer" required />
                <Dropdown v-model="batteryData.manufacturer" label="Manufacturer" :options="manufacturerOptions" />
                <Dropdown v-model="batteryData.cellChemistry" label="Zellchemie" :options="chemistryOptions" />
                <TextInput label="Nominalkapazität [Ah]" placeholder="Nominalkapazität" />
                <TextInput label="Nominalgewicht [g]" placeholder="Nominalgewicht" />
                <TextInput label="Länge [mm]" placeholder="Länge" />
                <TextInput label="Breite [mm]" placeholder="Breite" />
                <TextInput label="Höhe [mm]" placeholder="Höhe" />
                <ButtonAdd type="submit" @submit="addBattery()" label="Batterie Erstellen" />
            </form>
        </Card>
        <Card v-model="showProperties" v-if="showProperties" title="Eigenschaften" closable="true">
            <form @submit.prevent="updateBattery">
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
                <ButtonChange type="submit" @submit="updateBattery()" label="Batterie Ändern" />
            </form>
        </Card>
    </Main>
</template>

<style scoped>
.list-container {
    max-height: 300px;
}
</style>
