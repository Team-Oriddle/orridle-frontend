<template>
  <div class="space-y-4">
    <h2 class="mb-4 text-2xl font-bold">댓글</h2>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="p-4 bg-white rounded-lg shadow"
    >
      <div class="font-semibold">{{ comment.author }}</div>
      <p class="text-sm">{{ comment.content }}</p>
      <p class="text-xs text-gray-500">{{ comment.postedAt }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'QuizComments',
  setup() {
    // 예시 댓글 데이터
    const comments = ref([
      {
        id: 1,
        author: 'Alice',
        content: '정말 흥미로운 퀴즈네요!',
        postedAt: '1시간 전',
      },
      {
        id: 2,
        author: 'Bob',
        content: '어려웠지만 재밌었습니다 :)',
        postedAt: '2시간 전',
      },
      // 추가 댓글 데이터
    ]);

    return {
      comments,
    };
  },
});
</script>
