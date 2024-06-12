export const useBatteryManufacturers = defineStore('batteryManufacturers', () => {
    const supabase = useSupabaseClient()
    const batteryManufacturers = ref()

    // Read Battery Manufacturrs from Supabase
    async function fetchBatteryManufacturers() {
        const { data: battery_manufacturer_data, error: battery_manufacturer_error } = await supabase.from("battery_manufacturers").select()

        if (battery_manufacturer_error) {
            console.log(battery_manufacturer_error)
            alert("An unknown error has occurred. Please try again later")
            return
        }

        batteryManufacturers.value = battery_manufacturer_data
    }

    return { batteryManufacturers, fetchBatteryManufacturers }
})