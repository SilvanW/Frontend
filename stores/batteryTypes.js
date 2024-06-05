export const useBatteryTypes = defineStore('batteryTypes', () => {
    const supabase = useSupabaseClient()
    const batteryTypes = ref()

    // Read Data from Supabase
    async function fetchBatteryTypes() {
        const { data: battery_data, error: battery_error } = await supabase.from("batteries").select(`
            id,
            type,
            battery_manufacturers (id, name),
            battery_chemistries (id, name),
            nominalCapacity,
            nominalWeight,
            length,
            width,
            height,
            storageUUID
        `)

        if (battery_error) {
            console.log(battery_error)
        } else {
            batteryTypes.value = battery_data
        }
    }

    // Add Data to Supabase
    async function insertBatteryTypes(batteryInfo) {
        const { error } = await supabase.from("batteries").insert(
            {
                "type": batteryInfo.type,
                "manufacturer": batteryInfo.manufacturer,
                "chemistry": batteryInfo.cellChemistry,
                "nominalCapacity": batteryInfo.nominalCapacity,
                "nominalWeight": batteryInfo.nominalWeight,
                "length": batteryInfo.length,
                "width": batteryInfo.width,
                "height": batteryInfo.height,
                "storageUUID": batteryInfo.storageUUID
            }
        )

        if (error) {
            console.log(error)
        }

        fetchBatteryTypes()
    }

    // Update Data from Supabase
    async function updateBatteryTypes(batteryInfo) {
        const { error } = await supabase.from("batteries").update(
            {
                "type": batteryInfo.type,
                "manufacturer": batteryInfo.manufacturer,
                "chemistry": batteryInfo.cellChemistry,
                "nominalCapacity": batteryInfo.nominalCapacity,
                "nominalWeight": batteryInfo.nominalWeight,
                "length": batteryInfo.length,
                "width": batteryInfo.width,
                "height": batteryInfo.height
            }
        ).eq('id', batteryInfo.id)

        if (error) {
            console.log(error)
        }

        fetchBatteryTypes()

    }

    // Delete Data from Supabase
    async function deleteBatteryTypes(batteryId) {
        const { error } = await supabase.from("batteries").delete().eq('id', batteryId)

        if (error) {
            console.log(error)
        }

        fetchBatteryTypes()
    }

    return { batteryTypes, fetchBatteryData: fetchBatteryTypes, insertBatteryData: insertBatteryTypes, updateBatteryData: updateBatteryTypes, deleteBatteryData: deleteBatteryTypes }
})