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
            {{ participant.position }}
          </div>
          <div class="font-medium">{{ participant.nickname }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Participant {
  userId: number;
  nickname: string;
  position: number;
}

export default defineComponent({
  name: 'ParticipantList',
  props: {
    participants: {
      type: Array as PropType<Participant[]>,
      required: true,
    },
  },
  setup(props) {
    const selectParticipant = (participant: Participant) => {
      alert(`Select participant: ${participant.userId}`);
    };
    return {
      selectParticipant
    };
  },
});
</script>

<style scoped>
/* 커스텀 스타일 */
</style>
