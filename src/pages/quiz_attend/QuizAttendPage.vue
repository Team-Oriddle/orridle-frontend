<!-- 필요 컴포넌트들 -->
<!-- TODO: 1. 검색창 -->
<!-- TODO: 2. 비공개 방 참가 버튼 -->
<!-- TODO: 3. 공개 방 목록들(카드), 우선은 mocking하기 -->

<template>
  <div class="container p-4 mx-auto">
    <h1 class="mb-4 text-2xl font-bold">
      QuizAttendPage에 오신 것을 환영합니다!
    </h1>
    <!-- 검색창 -->
    <div class="mb-4">
      <input
        type="text"
        v-model="searchTerm"
        @input="filterRooms"
        class="w-full p-2 border rounded"
        placeholder="방 검색..."
      />
    </div>
    <!-- 비공개 방 참가 버튼 -->
    <div class="mb-4">
      <button
        class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        비공개 방 참가
      </button>
    </div>
    <!-- 공개 방 목록 -->
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="room in filteredRooms"
        :key="room.id"
        class="p-4 border rounded shadow"
      >
        <h2 class="font-bold">{{ room.title }}</h2>
        <p>{{ room.description }}</p>
        <button
          class="px-2 py-1 mt-2 text-xs font-bold text-white bg-green-500 rounded hover:bg-green-700"
        >
          참가하기
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'QuizAttendPage',
  setup() {
    const searchTerm = ref('');
    const rooms = ref([
      {
        id: 1,
        title: '공개 방 1',
        description: '이 방은 모두에게 열려 있습니다.',
        private: false,
      },
      {
        id: 2,
        title: '공개 방 2',
        description: '즐겁게 퀴즈를 풀어보세요!',
        private: false,
      },
      // 추가 방 데이터...
    ]);

    const filteredRooms = computed(() => {
      if (!searchTerm.value) {
        return rooms.value.filter((room) => !room.private);
      }
      return rooms.value.filter(
        (room) =>
          !room.private &&
          room.title.toLowerCase().includes(searchTerm.value.toLowerCase()),
      );
    });

    const filterRooms = () => {
      // 필터링 로직이 필요하면 여기에 추가
    };

    return {
      searchTerm,
      filteredRooms,
      filterRooms,
    };
  },
});
</script>
