<template>
  <button
    class="w-full h-full px-4 py-2 font-bold text-black transition duration-300 ease-in-out transform bg-gray-400 rounded hover:bg-gray-500 hover:-translate-y-1"
    @click="startGame(roomId)"
  >
    게임 시작
  </button>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StartGameButton',
  props:{
    roomId:{
      type: Number,
      required: true,
    }
  },
  emits: ['click'],
  methods: {
    startGame:async(quizRoomId:number) =>{
      try {
        const response = await axios.post(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}/start`,{
          withCredentials: true,
          headers:{
            'Content-Type': 'application/json'
          }
        })
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  },
});
</script>
