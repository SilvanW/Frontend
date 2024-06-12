export const useBatteryChemistries = defineStore('batteryChemistries', () => {
    const supabase = useSupabaseClient()
    const batteryChemistries = ref()

    // Read Battery Chemistries from Supabase
    async function fetchBatteryChemistries() {
        const { data: battery_chemistries_data, error: battery_chemistries_error } = await supabase.from("battery_chemistries").select()

        if (battery_chemistries_error) {
            so(battery_chemistries_error)
            alert("An unknown error has occurred. Please try again later")
            return
        }

        batteryChemistries.value = battery_chemistries_data
    }

    return { batteryChemistries, fetchBatteryChemistries }
})