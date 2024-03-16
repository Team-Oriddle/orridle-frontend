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
        v-for="items in QuiestionList"
        :title="items.title"
        :img="items.imageUrl"
        :description="items.description"
      ></QuizPreview>
    </div>
  </div>
</template>

<script lang="ts">
import QuizPreview from './QuizPreview.vue';
import QuiestionList from '../data/mockData';
export default {
  name: 'QuizList',
  components: { QuizPreview },
  data() {
    return {
      QuiestionList,
    };
  },
};
</script>
