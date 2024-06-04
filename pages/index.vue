<script setup>

definePageMeta({
    middleware: ["auth"]
})

const supabase = useSupabaseClient()

const current_user = await supabase.auth.getUser()

const email = current_user.data.user.email

const current_user_data = ref(null)

async function get_current_user(user_email) {
    // Read Items from Database
    const { data: user_data, error: user_error } = await supabase.from("users").select(`
    id,
    email,
    name,
    permission
`).eq("email", user_email).limit(1)

    if (user_error) {
        console.log(user_error)
    } else {
        current_user_data.value = user_data[0]
    }
}

onMounted(() => {
    get_current_user(email)
})

</script>

<template>
    <Main>
        <Card title="Willkommen" :skeleton="current_user_data">
            <div class="p-2">
                <TextOutput label="Benutzer" :value="current_user_data.name" />
                <TextOutput label="Funktion" :value="current_user_data.permission" />
            </div>
        </Card>
    </Main>
</template>