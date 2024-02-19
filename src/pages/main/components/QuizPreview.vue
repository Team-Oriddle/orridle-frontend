<template>
  <div class="flex flex-col content-center h-56 border-2 border-solid m-4">
    <div class="h-2/3 bg-amber-400">{{ img }}</div>
    <div class="h-1/3 px-4 py-1">
      <div class="text-xl">{{ title }}</div>
      <div class="text-sm">{{ description }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'QuizPreview',
  props: {
    title: String,
    img: String,
    description: String,
  },
};
</script>
