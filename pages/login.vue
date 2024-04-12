<script setup>
import { ref } from 'vue'

const supabase = useSupabaseClient()

const logInWithUsername = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    if (error) {
        console.log(error)
        loginInvalid.value = "Benutzername oder Passwort ungültig"
    } else {
        return navigateTo("/")
    }
}

const email = ref('')
const password = ref('')

const loginInvalid = ref('')

definePageMeta({
    layout: 'start'
})

</script>

<template>
    <div class="main-background flex-1 flex flex-col justify-center items-center flex-nowrap">
        <Card title="Login">
            <InputError :condition="loginInvalid" :text="loginInvalid" />
            <form @submit.prevent="logInWithUsername" class="w-full">
                <TextInput type="email" label="Email" placeholder="Email eingeben" v-model="email" required />
                <TextInput type="password" label="Passwort" placeholder="Passwort eingeben" v-model="password"
                    required />
                <div class="p-2">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-lg w-full"
                        @submit="logInWithUsername()">Login</button>
                </div>
            </form>
        </Card>
    </div>
</template>

<style scoped>
.main-background {
    background-color: var(--main_background)
}
</style>