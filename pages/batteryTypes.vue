<script setup>

const supabase = useSupabaseClient()

// Define initial State
const showNewBattery = ref(false)
const showProperties = ref(false)

const items = ref([])

// Read Items from Database
const { data: battery_data, error: battery_error } = await supabase.from("battery").select(`
    id,
    type,
    battery_manufacturers (id, name)
`)

if (battery_error) {
    console.log(battery_error)
} else {
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

const batteryData = ref(
    {
        "type": "",
        "manufacturer": manufacturerOptions[0].value,
        "cellChemistry": 0
    }
)

const chemistryOptions = [
    {
        "value": 0,
        "text": "LFP"
    },
    {
        "value": 1,
        "text": "NMC"
    }
]

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
        "cellChemistry": 0
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
                <TextInput label="Nominalkapazität [Ah]" placeholder="Nominalkapazität" />
                <TextInput label="Nominalgewicht [g]" placeholder="Nominalgewicht" />
                <TextInput label="Länge [mm]" placeholder="Länge" />
                <TextInput label="Breite [mm]" placeholder="Breite" />
                <TextInput label="Höhe [mm]" placeholder="Höhe" />
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
