<!-- TODO: 1. 화면 가로/세로 비율이 일정 이하로 내려가면 스크롤이 생기도록 변경하기 -->
<!-- TODO: 2. 고정 높이를 제공하여 이미지가 로딩되면서 레이아웃 변형 없도록 하기 -->
<template>
  <!-- 전체 12column 그리드, section 별 컴포넌트 분리 예정 -->
  <main class="container h-[90vh] mt-8 flex flex-col justify-evenly">
    <!-- 진행중인 퀴즈 문제에 대한 정보 제공 섹션, 중앙 10개 그리드 사용 -->
    <section>
      <QuestionInfo :question="currentQuestion" />
    </section>
    <!-- 각각의 캐릭터들 아바타와 아래에 닉네임, 그 아래에 점수가 적혀있는 부분과(퍼블리싱 때는 카드로) 그 위에 채팅 말풍선이 나타날 영역(퍼블리싱 때는 말풍선 영역 보이도록 하기) -->
    <section>
      <!-- 위에서부터 채팅 말풍선, 캐릭터(아바타)영역, 닉네임, 점수, 채팅 입력 바 -->
      <div class="justify-between">
        <!-- 플레이어 목록 컴포넌트: 아바타, 닉네임, 점수 -->
        <PlayerList :players="players" />

        <!-- 채팅 입력하는 부분 -->
        <ChatInput />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import QuestionInfo from './components/QuestionInfo.vue';
import ChatInput from './components/ChatInput.vue';
import PlayerList from './components/PlayerList.vue';

export default {
  name: 'QuizGamePage',
  components: {
    QuestionInfo,
    ChatInput,
    PlayerList,
  },
  data() {
    return {
      currentQuestion: {
        title: '다음 중 올바른 보기는?',
        type: '객관식',
        score: 10,
        imageUrl: 'https://source.unsplash.com/random/800x600',
        choices: ['선택지 1', '선택지 2', '선택지 3', '선택지 4'],
      },
      players: [
        // 플레이어 데이터 예시
        { avatarUrl: 'avatar1.png', nickname: 'Player1', score: 100 },
        // 추가 플레이어 데이터...
      ],
    };
  },
};
</script>
