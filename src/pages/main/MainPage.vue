<template>
  <div
    class="flex flex-col justify-start items-center w-screen-orridle min-h-screen min-w-screen"
  >
    <SearchBar></SearchBar>
    <QuizList></QuizList>
  </div>
</template>

<script lang="ts">
import QuizList from './components/QuizList.vue';
import SearchBar from './components/SearchBar.vue';
export default {
  name: 'MainPage',
  components: { QuizList, SearchBar },
};
</script>
