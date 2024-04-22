export default defineNuxtRouteMiddleware((to, from) => {
    const supabase = useSupabaseClient()

    if (!supabase.auth.getUser()) {
        return navigateTo("/login")
    }
})