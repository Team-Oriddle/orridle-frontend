<!-- 필요 컴포넌트들 -->
<!-- TODO: TopStats의 이미지 너비에 따라 전체 영역 가로너비가 달라지는 현상 있음 -->
<!-- 이는 추후에 컨텐츠가 결정되면서 해결될 것으로 보임 -->
<template>
  <main class="w-full mt-8">
    <section>
      <ResultHeader />
    </section>
    <section>
      <ResultStats />
    </section>
    <section class="flex top-stats-section justify-evenly">
      <TopStats
        class="most-correct"
        :title="mostCorrectQuiz.title"
        :altText="mostCorrectQuiz.altText"
        :statsData="mostCorrectQuiz"
      />
      <TopStats
        class="most-incorrect"
        :title="mostIncorrectQuiz.title"
        :altText="mostIncorrectQuiz.altText"
        :statsData="mostIncorrectQuiz"
      />
    </section>
  </main>
</template>

<script lang="ts">
import ResultHeader from './components/ResultHeader.vue';
import ResultStats from './components/ResultStats.vue';
import TopStats from './components/TopStats.vue';

export default {
  name: 'QuizResultPage',
  components: {
    ResultHeader,
    ResultStats,
    TopStats,
  },
  data() {
    return {
      mostCorrectQuiz: {
        title: '가장 많이 맞춘 퀴즈',
        question: '이것은 가장 많이 맞춘 퀴즈의 예시입니다.',
        imageUrl: 'https://source.unsplash.com/random/300x300?quiz',
        accuracy: 95,
        altText: '가장 많이 맞춘 퀴즈 이미지',
      },
      mostIncorrectQuiz: {
        title: '가장 많이 틀린 퀴즈',
        question: '이것은 가장 많이 틀린 퀴즈의 예시입니다.',
        imageUrl: 'https://source.unsplash.com/random/300x300?quiz',
        accuracy: 25,
        altText: '가장 많이 틀린 퀴즈 이미지',
      },
    };
  },
};
</script>

<style scoped>
.top-stats-section {
  gap: 1rem;
  height: 200px;
}
</style>
