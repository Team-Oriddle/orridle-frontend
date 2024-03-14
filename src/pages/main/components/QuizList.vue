<template>
  <div class="flex flex-col w-10/12 border-2 border-solid px-16">
    <div class="flex justify-end my-8">
      <div>최신순</div>
      |
      <div>인기순</div>
      |
      <div>플레이횟수</div>
    </div>
    <div class="grid grid-cols-4">
      <QuizPreview
        v-for="item in quizzes"
        :key="item.quizId"
        :title="item.title"
        :img="item.imageUrl"
        :description="item.description"
        :quizId="item.quizId"
      ></QuizPreview>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import QuizPreview from './QuizPreview.vue';

interface Quiz {
  quizId: number;
  title: string;
  imageUrl: string;
  description: string;
}

export default {
  name: 'QuizList',
  components: {
    QuizPreview,
  },
  data() {
    return {
      quizzes: [] as Quiz[],
    };
  },
  created() {
    this.fetchQuizzes();
  },
  methods: {
    async fetchQuizzes() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/quiz/page/0');
        if (response.data && response.data.data && response.data.data.quizzes) {
          this.quizzes = response.data.data.quizzes as Quiz[];
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        // 오류 처리 로직
      }
    },
  },
};
</script>
