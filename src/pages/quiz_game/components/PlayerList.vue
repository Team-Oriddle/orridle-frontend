<template>
  <section class="flex items-end gap-4 mt-8 space-y-4 justify-evenly">
    <div
      v-for="player in socket.ParticipantList"
      :key="player.id"
      class="flex flex-col items-center"
    >
      <!-- 채팅 말풍선 -->
      <div
        v-if="player.message"
        class="p-2 mb-2 text-sm bg-gray-200 rounded-full"
      >
        {{ player.message }}
      </div>
      <!-- 아바타 -->
      <img
        :src=" 'https://source.unsplash.com/random/100x100'"
        alt="Avatar"
        class="w-12 h-12 rounded-full"
      />
      <!-- 닉네임과 점수 -->
      <div class="mt-2 font-semibold text-center">{{ player.nickname }}</div>
      <div class="text-sm">{{ player.score }}점</div>
    </div>  
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InGameSocket from '../../../socket/inGameChatSocket';

export default defineComponent({
  name: 'PlayerList',
  props:{
    socket:{
      type:InGameSocket,
      required: true,
    }
  }
  ,
  setup(props) {
    console.log('시발')
    console.log(props.socket.ParticipantList)

  },
});
</script>
