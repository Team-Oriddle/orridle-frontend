<template>
  <section class="grid grid-cols-12 gap-4">
    <!-- 제목, 문제 유형, 점수를 띄워주는 영역 -->
    <div class="flex justify-between col-span-10 col-start-2">
      <h1 class="text-xl font-bold">{{ question.title }}</h1>
      <div class="flex">
        <p class="text-md">유형: {{ question.type }},</p>
        <p>점수: {{ question.score }}</p>
      </div>
    </div>
    <!-- 문제 이미지와 선택지 영역 -->
    <div class="grid grid-cols-10 col-span-10 col-start-2 gap-4">
      <div class="col-span-4">
        <img :src="question.imageUrl" alt="문제 이미지" class="w-full" />
      </div>
      <div class="grid grid-cols-2 col-span-6 gap-4">
        <div
          v-for="(choice, index) in question.choices"
          :key="index"
          class="p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
        >
          {{ choice }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuestionInfo',
  props: {
    question: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        type: '',
        score: 0,
        imageUrl: '',
        choices: [],
      }),
    },
  },
});
</script>
