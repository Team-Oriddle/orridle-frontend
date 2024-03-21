<template>
  <div class="flex flex-col justify-between h-full p-4 bg-white rounded shadow">
    <h2 class="mb-4 text-2xl font-bold">퀴즈방 정보</h2>
    <div class="flex flex-col h-full">
      <div class="flex mb-2">
        <label class="font-bold">방 제목:</label>
        <p>{{ quizInfo.roomTitle }}</p>
      </div>
      <div class="flex mb-2">
        <label class="font-bold">최대 인원:</label>
        <p>{{ quizInfo.maxParticipant }}</p>
      </div>
      <!-- <div class="flex mb-2">
        <label class="font-bold">공개방 여부:</label>
        <p>{{ quizInfo.isPublic ? '공개' : '비공개' }}</p>
      </div> -->
      <!-- <div class="flex mb-2">
        <label class="font-bold">비밀번호:</label>
        <p>{{ quizInfo.password }}</p>
      </div> -->
      <div class="flex mb-2">
        <label class="font-bold">퀴즈 이름:</label>
        <p>{{ quizInfo.quizTitle }}</p>
      </div>
    </div>

    <div class="flex flex-row">
      <button
        class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        @click="copyLink"
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
import axios from 'axios';

export default defineComponent({
  name: 'QuizInfo',
  props: {
    roomId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      quizInfo: {},
    };
  },
  methods: {
    async fetchQuizInfo() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/quiz-room/${this.roomId}`,
          {withCredentials: true}
        );
        console.log(response.data);
        this.quizInfo = response.data.data; // API 응답으로 quizInfo 업데이트
      } catch (error) {
        console.error('Quiz info fetch failed:', error);
      }
    },
    async copyLink() {
    try {
      const quizRoomUrl = window.location.href; // 현재 페이지의 URL을 가져옵니다.
      await navigator.clipboard.writeText(quizRoomUrl); // 클립보드에 URL 복사
        alert('링크가 클립보드에 복사되었습니다.'); // 사용자에게 알림
      } catch (error) {
      console.error('링크 복사 실패:', error);
        alert('링크 복사에 실패했습니다.'); // 실패 알림
      }
    },
    editQuizInfo() {
      // 퀴즈 정보 수정 로직
    },
  },
  mounted() {
    this.fetchQuizInfo(); // 컴포넌트가 마운트될 때 fetchQuizInfo 메소드 실행
  },
});
</script>
