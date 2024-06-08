<script setup>

const supabase = useSupabaseClient()

useI18n()

const showNav = ref(false)

function toggleNav() {
	showNav.value = !showNav.value
}

async function logout() {
	toggleNav()
	const { error } = await supabase.auth.signOut()

	if (error) {
		console.log(error)
	}

	navigateTo("/login")
}

</script>

<template>
	<div class="h-screen flex flex-col">
		<header class="my-2">
			<div class="flex flex-row justify-center items-center">
				<Icon v-on:click="toggleNav()" class="burger-icon cursor-pointer" name="fa6-solid:bars" size="2em">
				</Icon>
				<h1 id="title" class="font-bold text-6xl self-start px-5">Octopus</h1>
			</div>
			<img src="/Logo-Kyburz.svg" alt="Kyburz Logo" id="logo" />
		</header>
		<div class="flex-1 flex flex-row overflow-auto">
			<div v-show="showNav" class="sidenav fixed z-10 duration-500 p-2 h-full">
				<SidenavButton v-model="showNav" icon="fa6-solid:user" :label="$t('myPage')" target-page="/" />
				<SidenavButton v-model="showNav" icon="fa6-solid:battery-full" :label="$t('batteryTypes')"
					target-page="/batteryTypes" />
				<SidenavButton v-model="showNav" icon="fa6-solid:gear" :label="$t('settings')"
					target-page="/settings" />
				<div v-on:click="logout()"
					class="flex flex-row justify-left items-center p-2 cursor-pointer hover:bg-blue-500 rounded-lg">
					<Icon name="fa6-solid:arrow-right-from-bracket" color="red" />
					<h3 class="logout-text font-medium text-xl mx-2 my-0">Logout</h3>
				</div>
			</div>
			<NuxtPage />
		</div>

	</div>
</template>

<style scoped>
header {
	background: var(--header_background);
	padding: 0.1rem 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.logout-text {
	color: var(--red)
}

.sidenav {
	background-color: var(--logo_text_color);
}

#title {
	color: var(--logo_text_color);
}

#logo {
	height: 50%;
	max-width: 25%;
	min-width: 150px;
}

.burger-icon {
	color: var(--logo_text_color)
}
</style>