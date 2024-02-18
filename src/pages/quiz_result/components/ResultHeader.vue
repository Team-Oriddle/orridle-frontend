<template>
  <div class="flex justify-between p-4 border-b result-header">
    <div>
      <h2 class="text-xl font-bold">{{ quizTitle }}</h2>
      <p>시작 시간: {{ startTime }}</p>
    </div>
    <!-- 공유 버튼 (예시) -->
    <button class="bg-gray-200 share-btn">공유하기</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ResultHeader',
  setup() {
    const quizTitle = ref('퀴즈 제목 예시');
    const startTime = ref('2024-01-01 12:00');

    return {
      quizTitle,
      startTime,
    };
  },
});
</script>
