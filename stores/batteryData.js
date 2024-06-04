export const useBatteryTypes = defineStore('batteryTypes', () => {
    const supabase = useSupabaseClient()
    const batteries = ref()

    // Read Data from Supabase
    async function fetchBatteryData() {
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
            batteries.value = battery_data
        }
    }

    // Update Data from Supabase
    async function updateBatteryData(batteryInfo) {
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

        fetchBatteryData()

    }

    // Delete Data from Supabase
    async function deleteBatteryData(batteryId) {
        const { error } = await supabase.from("batteries").delete().eq('id', batteryId)

        if (error) {
            console.log(error)
        }

        fetchBatteryData()
    }

    return { batteries, fetchBatteryData, updateBatteryData, deleteBatteryData }
})