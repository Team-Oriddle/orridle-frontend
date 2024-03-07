<template>
  <div class="overflow-auto">
    <ul class="space-y-2">
      <li
        v-for="participant in participants"
        :key="participant.userId"
        class="p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
        @click="selectParticipant(participant)"
      >
        <!-- 추후 아바타로 대체될 예정 -->
        <div class="flex items-center space-x-3">
          <div
            class="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full"
          >
            {{ participant.initials }}
          </div>
          <div class="font-medium">{{ participant.nickname }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRaw } from 'vue';

interface Participant {
  userId: number;
  nickname: string;
  position: number;
}

export default defineComponent({
  name: 'ParticipantList',
  setup() {
    // Mock 데이터
    const participants = ref([
      { userId: 1, nickname: 'Alice', initials: 'A' },
      { userId: 2, nickname: 'Bob', initials: 'B' },
      { userId: 3, nickname: 'Bob', initials: 'C' },
      { userId: 4, nickname: 'Bob', initials: 'D' },
      { userId: 5, nickname: 'Bob', initials: 'E' },
      // ...더 많은 참가자 데이터
    ]);

    const selectParticipant = (participant: any) => {
      // 아바타 색상 변경 모달을 열기 위한 로직
      alert(`Select participant: ${participant.name}`);
  
  // props: {
  //   participants: {
  //     type: Array as PropType<Participant[]>, // Participant 배열 타입으로 지정
  //     required: true,
  //   },
  // },
  // setup(props) {
  //   console.log(props)
  //   const participants = JSON.stringify(props.participants)
  //   console.log(participants)
  //   const selectParticipant = (participant: Participant) => {
  //     console.log(toRaw(props.participants));
  //     alert(`Select participant: ${participant.userId}`);
    };

    return {
      participants,
      selectParticipant,
    };
  },
});
</script>

<style scoped>
/* 커스텀 스타일 */
</style>
