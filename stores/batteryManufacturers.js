export const useBatteryManufacturers = defineStore('batteryManufacturers', () => {
    const supabase = useSupabaseClient()
    const batteryManufacturers = ref()

    // Read Battery Manufacturrs from Supabase
    async function fetchBatteryManufacturers() {
        const { data: battery_manufacturer_data, error: battery_manufacturer_error } = await supabase.from("battery_manufacturers").select()

        if (battery_manufacturer_error) {
            console.log(battery_manufacturer_error)
        }

        batteryManufacturers.value = battery_manufacturer_data
    }

    return { batteryManufacturers, fetchBatteryManufacturers }
})