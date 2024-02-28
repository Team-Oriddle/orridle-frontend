<template>
  <button
    class="w-full h-full px-4 py-2 font-bold text-black transition duration-300 ease-in-out transform bg-gray-400 rounded hover:bg-gray-500 hover:-translate-y-1"
    @click="startGame"
  >
    게임 시작
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StartGameButton',
  emits: ['click'],
  methods: {
    startGame() {
      alert('게임 시작 버튼 클릭');
    },
  },
});
</script>
