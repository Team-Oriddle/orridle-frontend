<!-- 필요 컴포넌트들 -->
<!-- 1. 세로가 긴 카드(추후 아바타) 목록 형식의 참가자 목록 -->
<!-- 1.1 카드 누를 시 나오는 아바타 색상 변경 모달창 -->
<!-- 2. 퀴즈 방 정보(방 제목, 최대 인원, 공개방 여부, 비밀번호, 퀴즈 이름, 퀴즈방 링크 복사 버튼, 수정 버튼 -->
<!-- 3. 채팅창 -->
<!-- 4. 게임 시작 버튼 -->

<template>
  <main class="container grid h-full grid-cols-12 gap-4 p-4 mx-auto">
    <!-- 좌측 섹션: 참가자 목록, 채팅창(그리드 8개 할당) -->
    <section class="grid col-span-8 grid-rows-2 gap-4 bg-gray-100">
      <!-- TODO: 참가자 목록 -->
      <div class="bg-red-500">참가자 목록</div>

      <!-- TODO: 채팅창 -->
      <div class="bg-blue-500">채팅창</div>
    </section>

    <!-- 우측 섹션: 퀴즈방 정보, 게임 시작 버튼(그리드 4개 할당) -->
    <section class="grid col-span-4 gap-4 bg-gray-100 grid-rows-8">
      <!-- TODO: 퀴즈 방 정보 & 설정 -->
      <div class="bg-red-500 row-span-7">퀴즈 방 정보 & 설정</div>

      <!-- TODO: 게임 시작 버튼 -->
      <div class="bg-blue-500">
        <StartGameButton @start-game="handleGameStart" />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import StartGameButton from './components/StartGameButton.vue';

export default {
  name: 'QuizRoomPage',
  components: {
    // dynamic import를 사용하여 컴포넌트를 비동기로 가져옴
    StartGameButton,
  },
  methods: {
    handleGameStart() {
      alert('게임 시작 버튼 클릭');
    },
  },
};
</script>
