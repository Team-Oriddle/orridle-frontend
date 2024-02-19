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
        v-for="items in questionList"
        :title="items.title"
        :img="items.imageUrl"
        :description="items.description"
      ></QuizPreview>
    </div>
  </div>
</template>

<script lang="ts">
import QuizPreview from './QuizPreview.vue';

export default {
  name: 'QuizList',
  components: { QuizPreview },
  data() {
    return {
      questionList: {
        1: {
          title: '다음 중 올바른 보기는?',
          imageUrl: 'https://source.unsplash.com/random/800x600',
          description: '설명',
        },
        2: {
          title: '다음 중 올바른 보기는?',
          imageUrl: 'https://source.unsplash.com/random/800x600',
          description: '설명',
        },
      },
    };
  },
};
</script>
