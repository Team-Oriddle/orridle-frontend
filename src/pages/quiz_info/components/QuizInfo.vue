<template>
  <div v-if="quizInfo" class="p-4 bg-gray-100 rounded-lg">
    <div class="flex flex-col items-center">
      <h2 class="mt-4 text-2xl font-bold">{{ quizInfo.title }}</h2>
      <img
        :src="quizInfo.imageUrl"
        alt="Quiz Image"
        class="object-cover w-48 h-48 rounded-lg"
      />
      <p class="mt-1 text-sm">제작자: {{ quizInfo.makerName }}</p>
      <p class="mt-4">{{ quizInfo.description }}</p>
      <p class="mt-2">
        질문 출처 유형: {{ quizInfo.questionSourceTypes.join(', ') }}
      </p>
      <p>답변 유형: {{ quizInfo.answerTypes.join(', ') }}</p>
      <button @click="showCreateRoomModal = true" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        퀴즈방 만들기
      </button>
    </div>
  </div>
  <div v-else class="p-4 bg-gray-100 rounded-lg">
    <p>Loading quiz information...</p>
  </div>

  <!-- 모달 -->
  <div v-if="showCreateRoomModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-4 rounded-lg">
      <div class="flex justify-end">
        <button
          @click="showCreateRoomModal = false"
          class="font-bold bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700"
        >
          X
        </button>
      </div>
      <div class="flex flex-col items-center">
        <input v-model="roomTitle" type="text" placeholder="방 제목" class="mt-2 p-2 border rounded" />
        <input v-model="maxParticipants" type="number" placeholder="최대 인원" class="mt-2 p-2 border rounded" />
        <button @click="createRoom" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          방 만들기
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import axios from 'axios'; // axios를 import 합니다.

export default defineComponent({
  name: 'QuizInfo',
  props: {
    quizInfo: {
      type: Object as PropType<{
        quizId?: number;
        title: string;
        makerName: string;
        imageUrl: string;
        description: string;
        questionSourceTypes: string[];
        answerTypes: string[];
      }>,
      required: false, // 이것은 필요에 따라 조정할 수 있습니다.
      default: undefined, // 기본값을 undefined로 설정
    },
  },
  setup(props) {
    const showCreateRoomModal = ref(false);
    const roomTitle = ref('');
    const maxParticipants = ref(0);

    const createRoom = async () => {
      try {
        if (!props.quizInfo) {
          console.error('Quiz information is missing.');
          return;
        }

        const response = await axios.post('http://localhost:8080/api/v1/quiz-room', {
          quizId: props.quizInfo.quizId,
          title: roomTitle.value,
          maxParticipant: maxParticipants.value,
        }, {
          withCredentials: true // 이 부분을 추가합니다.
        });

        if (response.data.code === "QR0001") {
          console.log('Quiz room created successfully:', response.data);
          showCreateRoomModal.value = false; // 모달 닫기
          // 생성된 퀴즈방 페이지로 이동
          window.location.href = `/quiz/room/${response.data.data.quizRoomId}`;
        } else {
          console.error('Failed to create quiz room:', response.data.message);
        }
      } catch (error) {
        console.error('Error creating quiz room:', error);
      }
    };

    return { showCreateRoomModal, roomTitle, maxParticipants, createRoom };
  },
});
</script>
