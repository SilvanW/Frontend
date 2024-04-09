<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const loginInvalid = ref('')

function login() {
    if (username.value != "Test" || password.value != "123") {
        loginInvalid.value = "Benutzername oder Passwort ungültig"
        return
    }
    if (loginInvalid.value != "") {
        loginInvalid.value = ""
    }
    return navigateTo("/overview")
}

definePageMeta({
    layout: 'start'
})

</script>

<template>
    <div class="main-background flex-1 flex flex-col justify-center items-center flex-nowrap">
        <Card title="Login">
            <InputError :condition="loginInvalid" :text="loginInvalid" />
            <form @submit.prevent="login" class="w-full">
                <TextInput type="text" label="Benutzername" placeholder="Benutzername eingeben" v-model="username"
                    required />
                <TextInput type="password" label="Passwort" placeholder="Passwort eingeben" v-model="password"
                    required />
                <div class="p-2">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-lg w-full"
                        @submit="login()">Login</button>
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