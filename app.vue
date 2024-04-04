<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Octopus'
})
</script>

<style>
:root {
  --header_background: rgb(255, 255, 255);
  --logo_text_color: rgb(23, 65, 152);

  --main_background: rgb(244, 244, 244);

  --red: rgb(255, 27, 28);
  --orange: rgb(255, 165, 0)
}

body {
  padding: 0px;
  margin: 0px;
}
</style>