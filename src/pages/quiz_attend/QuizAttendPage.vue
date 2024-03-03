<!-- 필요 컴포넌트들 -->
<!-- TODO: 1. 검색창 -->
<!-- TODO: 2. 비공개 방 참가 버튼 -->
<!-- TODO: 3. 공개 방 목록들(카드), 우선은 mocking하기 -->

<template>
  <main class="container p-4 mx-auto">
    <!-- 검색창, 비공개 방 참가 버튼 -->
    <section>
      <div class="mb-4">
        <input
          type="text"
          v-model="searchTerm"
          @input="filterRooms"
          class="w-full p-2 border rounded"
          placeholder="방 검색..."
        />
      </div>
      <div class="mb-4">
        <button
          class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          비공개 방 참가
        </button>
      </div>
    </section>

    <!-- 공개 방 목록 -->
    <section>
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
            v-bind:on-click="AttendGameRoom(room.id)"
          >
            참가하기
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { publicRoomData } from './data/mockData';
import axios from 'axios'


export default defineComponent({
  name: 'QuizAttendPage',
  setup() {
    const searchTerm = ref('');
    const rooms = ref(publicRoomData);

    // vue3의 computed를 사용하여 실시간으로 필터링된 방 목록을 반환
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
      // ex) 인원수, 문제유형, 카테고리 등
    };

    return {
      searchTerm,
      filteredRooms,
      filterRooms,
    };
  },
  methods:{
    AttendGameRoom(quizRoomId:number){
      axios.get(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}/join`)
        .then(response => {
          //페이지 이동 관련 코드 작성
        })
        .catch(error => {
          console.error('에러!',error)
        })      
    }
  }
});
</script>
