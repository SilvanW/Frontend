export const useCurrentUser = defineStore('user', () => {
    const supabase = useSupabaseClient()
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
        }

        user.value = user_data[0]
    }

    // Update Users Default language
    async function updateDefaultLanguage(newLanguage) {
        const { error } = await supabase.from('users').update({ "defaultLanguage": newLanguage }).eq('id', user.value.id)

        if (error) {
            console.log(error)
        }
    }

    return { user, fetchCurrentUser, updateDefaultLanguage }
})