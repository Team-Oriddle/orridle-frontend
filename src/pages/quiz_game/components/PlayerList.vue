<template>
  <section class="flex items-end gap-4 mt-8 space-y-4 justify-evenly">
    <div
      v-for="player in user"
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

export default defineComponent({
  name: 'PlayerList',
  props:{
    user:{
      type: Array,
      required:true
    }
  }
  ,
  setup(props) {
    const players = ref([
      {
        id: 1,
        name: 'Player1',
        score: 100,
        avatarUrl: 'https://source.unsplash.com/random/100x100',
        message: '정답이 뭘까요?',
      },
      {
        id: 2,
        name: 'Player2',
        score: 150,
        avatarUrl: 'https://source.unsplash.com/random/100x100',
        message: '',
      },
      // 추가 플레이어 데이터
    ]);
    console.log('시발')

    console.log(props.user)


    return {
      players,
    };
  },
});
</script>
