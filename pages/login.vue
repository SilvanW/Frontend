<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

function say(username, password) {
    alert(username)
    alert(password)
}

</script>

<template>
    <Main>
        <Card title="Login">
            <form class="w-ful">
                <TextInput label="Username" placeholder="Enter Username" />
                <TextInput label="Password" placeholder="Enter Password" />
                <div class="p-2">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                        @click="say(username, password)">Login</button>
                </div>
            </form>
        </Card>
    </Main>
</template>
