export const useBatteryChemistries = defineStore('batteryChemistries', () => {
    const supabase = useSupabaseClient()
    const batteryChemistries = ref()

    // Read Battery Chemistries from Supabase
    async function fetchBatteryChemistries() {
        const { data: battery_chemistries_data, error: battery_chemistries_error } = await supabase.from("battery_chemistries").select()

        if (battery_chemistries_error) {
            console.log(battery_chemistries_error)
        }

        batteryChemistries.value = battery_chemistries_data
    }

    return { batteryChemistries, fetchBatteryChemistries }
})