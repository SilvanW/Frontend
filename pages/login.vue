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
            <form>
                <div class="p-2">
                    <label class="block">Username: {{ username }}</label>
                    <input v-model="username" placeholder="Enter Username"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg p-2" />
                </div>
                <div class="p-2">
                    <label class="block">Password: {{ password }}</label>
                    <input v-model="password" placeholder="Enter Password" type="password"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg p-2" />
                </div>
                <div class="p-2">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                        @click="say(username, password)">Login</button>
                </div>
            </form>
        </Card>
    </Main>
</template>
