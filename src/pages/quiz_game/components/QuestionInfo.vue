<template>
  <section class="grid grid-cols-12 gap-4">
    <!-- 제목, 문제 유형, 점수를 띄워주는 영역 -->

    <div class="flex justify-between col-span-10 col-start-2">
      <h1 class="text-xl font-bold">{{ question.description }}</h1>
      <div class="flex flex-col items-center">
      {{ countdown }}초 남았습니다!
    </div>
      <div class="flex">
        <p class="text-md">유형: {{ question.type }},</p>
        <p>점수: {{ question.score }}</p>
      </div>
    </div>
    <!-- 문제 이미지와 선택지 영역 -->
    <div class="grid grid-cols-10 col-span-10 col-start-2 gap-4">
      <div class="col-span-4">
        <img :src="question.source" alt="문제 이미지" class="w-72" />
      </div>
      <div class="grid grid-cols-2 col-span-6 gap-4">
        <div
          v-for="(choice, index) in question.choices"
          :key="index"
          class="p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
        >
          {{ choice }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'QuestionInfo',
  props: {
    question: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        type: '',
        score: 0,
        imageUrl: '',
        choices: [],
      }),
    },
  },
  
  setup(props){
    let countdown = ref(30);
    let intervalId = null; 

    watch(() => props.question, (newValue, oldValue) => {
      countdown.value = 30;
    });

    onMounted(()=>{
        intervalId = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
            countdown.value = 0
          }
        }, 1000);
    })

    return{
      countdown
    }
  }
});
</script>
