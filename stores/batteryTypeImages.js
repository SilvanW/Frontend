export const useBatteryTypeImages = defineStore('batteryTypeImages', () => {
    const supabase = useSupabaseClient()
    const batteryTypeImageReferences = ref({})

    async function fetchBatteryTypeImages() {
        const { data, error } = await supabase
            .storage
            .from('battery_types')
            .list('private', {
                limit: 100,
                offset: 1, // Exclude Placeholder
                sortBy: { column: 'name', order: 'asc' },
            })

        if (error) {
            console.log(error)
            alert("An unknown error has occurred. Please try again later")
            return
        }

        // Fill Object with image uuid's
        let batteryTypeImageObject = {}
        for (let batteryTypeImage of data) {
            batteryTypeImageObject[batteryTypeImage.name.split(".")[0]] = ''
        }
        batteryTypeImageReferences.value = batteryTypeImageObject
        downloadBatteryTypeImages()

    }

    async function downloadBatteryTypeImages() {
        for (let batteryTypeImageUUID in batteryTypeImageReferences.value) {
            const { data, error } = await supabase.storage.from("battery_types").download(`private/${batteryTypeImageUUID}.png`)

            if (error) {
                console.log(error)
                alert("An unknown error has occurred. Please try again later")
                return
            }

            const reader = new FileReader()

            reader.onload = function (e) {
                batteryTypeImageReferences.value[batteryTypeImageUUID] = e.target.result
            }

            if (data) {
                reader.readAsDataURL(data)
            }
        }
    }

    async function deleteBatteryTypeImage(uuid) {
        const { data, error } = await supabase.storage.from("battery_types").remove([`private/${uuid}.png`])

        if (error) {
            console.log(error)
            alert("An unknown error has occurred. Please try again later")
        }
    }

    async function uploadBatteryTypeImage(uuid, imageData) {
        const { data, error } = await supabase.storage.from("battery_types").upload(`private/${uuid}.png`, imageData, {
            contentType: "image/png"
        })

        if (error) {
            console.log(error)
            alert("An unknown error has occurred. Please try again later")
            return
        }

        fetchBatteryTypeImages()
    }

    return { batteryTypeImageReferences, fetchBatteryTypeImages, downloadBatteryTypeImages, deleteBatteryTypeImage, uploadBatteryTypeImage }
})