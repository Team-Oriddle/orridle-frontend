<template>
  <div class="p-4 bg-gray-100 rounded-lg">
    <div class="flex flex-col items-center">
      <h2 class="mt-4 text-2xl font-bold">{{ quizInfo.title }}</h2>
      <img
        :src="quizInfo.imageUrl"
        alt="Quiz Image"
        class="object-cover w-48 h-48 rounded-lg"
      />
      <p class="mt-1 text-sm">제작자: {{ quizInfo.makerName }}</p>
      <p class="mt-4">{{ quizInfo.description }}</p>
      <p class="mt-2">
        질문 출처 유형: {{ quizInfo.questionSourceTypes.join(', ') }}
      </p>
      <p>답변 유형: {{ quizInfo.answerTypes.join(', ') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default {
  name: 'QuizInfo',
  props: {
    quizInfo: {
      type: Object as PropType<{
        title: string;
        makerName: string;
        imageUrl: string;
        description: string;
        questionSourceTypes: string[];
        answerTypes: string[];
      }>,
      required: true,
    },
  },
};
</script>
