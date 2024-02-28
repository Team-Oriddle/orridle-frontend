<!-- 필요 컴포넌트들 -->

<template>
  <main class="container grid w-full grid-cols-12 gap-8 mx-auto mt-16">
    <!-- 상단 섹션: 퀴즈 정보(퀴즈 관련 정보들로 이미지, 제목, 생성자, 설명, 유형, 답변 유형(주관식, 객관식 등), 퀴즈방 생성하기 버튼으로 구성됨) -->
    <!-- 12그리드 중 중앙의 10개 그리드 영역을 사용 -->
    <section class="col-span-10 col-start-2">
      <QuizInfo :quizInfo="quizInfo" />
    </section>

    <!-- 하단 섹션: 해당 퀴즈의 댓글들을 나타내는 파트 -->
    <!-- 12그리드 전체 영역 사용 -->
    <section class="col-span-12 p-4 mt-4 bg-gray-100 rounded-lg">
      <QuizComments />
    </section>
  </main>
</template>

<script lang="ts">
import QuizInfo from './components/QuizInfo.vue';
import QuizComments from './components/QuizComments.vue';

export default {
  name: 'QuizInfoPage',
  components: {
    QuizInfo,
    QuizComments,
  },
  data() {
    return {
      quizInfo: {
        quizId: 1,
        title: '퀴즈 제목',
        makerName: '퀴즈 생성자',
        imageUrl: 'https://source.unsplash.com/random/800x600',
        description: '퀴즈 설명',
        questionSourceTypes: ['TEXT', 'IMAGE'],
        answerTypes: ['SHORT_ANSWER'],
      },
    };
  },
};
</script>
