<template>
  <div class="flex flex-col justify-between h-full p-4 bg-white rounded shadow">
    <h2 class="mb-4 text-2xl font-bold">퀴즈방 정보</h2>
    <div class="flex flex-col h-full">
      <div class="flex mb-2">
        <label class="font-bold">방 제목:</label>
        <p>{{ quizInfo.title }}</p>
      </div>
      <div class="flex mb-2">
        <label class="font-bold">최대 인원:</label>
        <p>{{ quizInfo.maxParticipants }}</p>
      </div>
      <div class="flex mb-2">
        <label class="font-bold">공개방 여부:</label>
        <p>{{ quizInfo.isPublic ? '공개' : '비공개' }}</p>
      </div>
      <div class="flex mb-2">
        <label class="font-bold">비밀번호:</label>
        <p>{{ quizInfo.password }}</p>
      </div>
      <div class="flex mb-2">
        <label class="font-bold">퀴즈 이름:</label>
        <p>{{ quizInfo.quizName }}</p>
      </div>
    </div>

    <div class="flex flex-row">
      <button
        class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        링크 복사
      </button>
      <button
        class="px-4 py-2 ml-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
      >
        수정
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuizInfo',
  data() {
    return {
      quizInfo: {
        title: '지리 퀴즈',
        maxParticipants: 5,
        isPublic: true,
        password: '1234',
        quizName: '세계 수도 퀴즈',
        link: 'http://example.com/quiz',
      },
    };
  },
  methods: {
    copyLink() {
      // 링크 복사 로직
    },
    editQuizInfo() {
      // 퀴즈 정보 수정 로직
    },
  },
});
</script>
