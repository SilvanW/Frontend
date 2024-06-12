export const useCurrentUser = defineStore('user', () => {
    const supabase = useSupabaseClient()
    const { setLocale } = useI18n()
    const user = ref()

    // Read Current user from Supabase
    async function fetchCurrentUser() {
        const currentUser = await supabase.auth.getUser()

        const { data: user_data, error: user_error } = await supabase.from("users").select(`
        id,
        email,
        name,
        permission,
        defaultLanguage
        `).eq("email", currentUser.data.user.email).limit(1)

        if (user_error) {
            console.log(user_error)
            alert("An unknown error has occurred. Please try again later")
            return
        }

        user.value = user_data[0]

        setDisplayLanguage()
    }

    // Update Users Default language
    async function updateDefaultLanguage(newLanguage) {
        const { error } = await supabase.from('users').update({ "defaultLanguage": newLanguage }).eq('id', user.value.id)

        if (error) {
            console.log(error)
            alert("An unknown error has occurred. Please try again later")
            return
        }

        user.value.defaultLanguage = newLanguage

        setDisplayLanguage()
    }

    // Set Language
    function setDisplayLanguage() {
        setLocale(user.value.defaultLanguage)
    }

    return { user, fetchCurrentUser, updateDefaultLanguage, setDisplayLanguage }
})