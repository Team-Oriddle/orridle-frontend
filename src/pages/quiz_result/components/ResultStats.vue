<template>
  <div class="p-4 border-b result-stats">
    <h3 class="text-lg font-semibold">게임 요약</h3>
    <div>순위: {{ rank }}</div>
    <div>점수: {{ score }}</div>
    <div>정답률: {{ accuracy }}%</div>
    <!-- 참여자 정보 및 점수 막대 그래프 (예시) -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ResultStats',
  setup() {
    const rank = ref(1);
    const score = ref(100);
    const accuracy = ref(75);

    return {
      rank,
      score,
      accuracy,
    };
  },
});
</script>
