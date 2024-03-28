<script lang="ts" setup></script>

<template>
	<div>
		<header>
			<h1 id="title">Octopus</h1>
			<img src="/Logo-Kyburz.svg" alt="Kyburz Logo" id="logo" />
		</header>
		<NuxtPage />
	</div>
</template>

<style scoped>
header {
	background: #c4c2c2;
	padding: 0.1rem 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 75px;
}

#title {
	font-size: 50px;
	color: rgb(23, 65, 152);
}

#logo {
	height: 50%;
	max-width: 25%;
	min-width: 150px;
}
</style>