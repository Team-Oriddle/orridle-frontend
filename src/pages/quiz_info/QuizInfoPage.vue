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
import { defineComponent, PropType } from 'vue';
import axios from 'axios';
import QuizInfo from './components/QuizInfo.vue';
import QuizComments from './components/QuizComments.vue';

interface QuizInfoType {
  title: string;
  makerName: string;
  imageUrl: string;
  description: string;
  questionSourceTypes: string[];
  answerTypes: string[];
}

export default defineComponent({
  name: 'QuizInfoPage',
  components: {
    QuizInfo,
    QuizComments,
  },
  props: {
    quizId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // quizInfo의 초기값을 null로 설정하고, 타입을 QuizInfoType | null로 지정합니다.
      quizInfo: null as QuizInfoType | null,
    };
  },
  computed: {
    numericQuizId(): number {
      return Number(this.quizId);
    }
  },
  async created() {
    await this.fetchQuizInfo();
  },
  methods: {
    async fetchQuizInfo() {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/quiz/info/${this.numericQuizId}`);
        this.quizInfo = response.data.data; // 또는 response.data.data; 구조에 따라 다름
      } catch (error) {
        console.error('Error fetching quiz info:', error);
      }
    },
  },
});
</script>
