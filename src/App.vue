<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<template>
  <div class="flex flex-row justify-center min-h-screen">
    <div class="mx-auto w-screen-orridle">
      <Header></Header>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
