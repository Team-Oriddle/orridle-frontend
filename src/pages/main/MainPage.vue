<template>
  <div
    class="flex flex-col items-center justify-start min-h-screen w-screen-orridle min-w-screen"
  >
    <SearchBar></SearchBar>
    <QuizList></QuizList>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import QuizList from './components/QuizList.vue';
import SearchBar from './components/SearchBar.vue';
import { onMounted } from 'vue';
export default {
  name: 'MainPage',
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchUserInfo');
    });
  },
  components: { QuizList, SearchBar },
};
</script>
