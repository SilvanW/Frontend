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
        <Card title="Login" skeleton="true">
            <InputError :condition="loginInvalid" :text="loginInvalid" />
            <form @submit.prevent="logInWithUsername" class="w-full">
                <TextInput id="email" type="email" label="Email" placeholder="Email eingeben" v-model="email"
                    required />
                <TextInput id="password" type="password" label="Passwort" placeholder="Passwort eingeben"
                    v-model="password" required />
                <button id="login" class="btn btn-primary w-full" @submit="logInWithUsername()">Login</button>
            </form>
        </Card>
    </div>
</template>

<style scoped>
.main-background {
    background-color: var(--main_background)
}
</style>