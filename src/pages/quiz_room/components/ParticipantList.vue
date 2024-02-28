<template>
  <div class="overflow-auto">
    <ul class="space-y-2">
      <li
        v-for="participant in participants"
        :key="participant.id"
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
          <div class="font-medium">{{ participant.name }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ParticipantList',
  setup() {
    // Mock 데이터
    const participants = ref([
      { id: 1, name: 'Alice', initials: 'A' },
      { id: 2, name: 'Bob', initials: 'B' },
      { id: 3, name: 'Bob', initials: 'C' },
      { id: 4, name: 'Bob', initials: 'D' },
      { id: 5, name: 'Bob', initials: 'E' },
      // ...더 많은 참가자 데이터
    ]);

    const selectParticipant = (participant: any) => {
      // 아바타 색상 변경 모달을 열기 위한 로직
      alert(`Select participant: ${participant.name}`);
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
