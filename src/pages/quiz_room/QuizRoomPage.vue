<!-- 필요 컴포넌트들 -->
<!-- 1. 세로가 긴 카드(추후 아바타) 목록 형식의 참가자 목록 -->
<!-- 1.1 카드 누를 시 나오는 아바타 색상 변경 모달창 -->
<!-- 2. 퀴즈 방 정보(방 제목, 최대 인원, 공개방 여부, 비밀번호, 퀴즈 이름, 퀴즈방 링크 복사 버튼, 수정 버튼 -->
<!-- 3. 채팅창 -->
<!-- 4. 게임 시작 버튼 -->
<!-- TODO: 현재 가로 크기가 줄어들면 레이아웃 위치가 이상해지는 현상 발견 -->
<!-- TODO: 참가자 수가 늘어날 수록 채팅창 크기도 같이 커짐 -->

<template>
  <main class="container grid w-full h-full grid-cols-12 gap-4 p-4 mx-auto">
    <!-- 좌측 섹션: 참가자 목록, 채팅창(그리드 8개 할당) -->
    <section class="grid col-span-8 grid-rows-2 gap-4 bg-gray-100">
      <!-- 참가자 목록 -->
      <div class="bg-gray-200">
        <!--gameData넘겨주기-->>
        <ParticipantList :participants="alignedUserData" />
      </div>
      <!-- 채팅창 -->
      <div class="bg-gray-200">
        <ChatWindow />
      </div>
    </section>

    <!-- 우측 섹션: 퀴즈방 정보, 게임 시작 버튼(그리드 4개 할당) -->
    <section class="grid col-span-4 gap-4 bg-gray-100 grid-rows-8">
      <!-- 퀴즈 방 정보 & 설정 -->
      <div class="row-span-7">
        <QuizRoomInfo :roomId="quizRoomId"/>
      </div>

      <!-- 게임 시작 버튼 -->
      <div class="">
        <StartGameButton :roomId="quizRoomId"/>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import StartGameButton from './components/StartGameButton.vue';
import QuizRoomInfo from './components/QuizRoomInfo.vue';
import ParticipantList from './components/ParticipantList.vue';
import ChatWindow from './components/ChatWindow.vue';
import ChatSocket from '../../socket/chatSocket.ts'
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Participant {
  userId: number;
  nickname: string;
  position: number;
  isHost: boolean;
}


export default {
  name: 'QuizRoomPage',
  components: { 
    StartGameButton,
    QuizRoomInfo,
    ParticipantList,
    ChatWindow,
  },
  setup(){
    const router = useRouter()
    const quizRoomId = router.currentRoute.value.params.id
    console.log('방번호 왜 이렇게 잡힘?')
    console.log(quizRoomId)
    const UserData = ref<Participant[]>([])
    function UpdateUserData(props){//UserData를 업데이트 하는 함수
      UserData.value = props
    }

    const QuizData = ref([])
    function UpdateQuizData(props){
      QuizData.value = props
    }

    const chatSocket = ref(null)

    const alignedUserData = computed(()=>UserData.value.sort(function(a,b){
      return a.position-b.position
    }))

    async function getQuizData(quizRoomId:number){
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}`,{
          withCredentials: true,
          headers:{
            'Content-Type': 'application/json'
          }
        })
        UpdateUserData(response.data.data.participants)
        UpdateQuizData(response.data.data)
        console.log(QuizData.value)
        chatSocket.value = new ChatSocket(quizRoomId,router,UserData.value)//UserData의 value를 넘겨줌
      } catch (error) {
        console.error(error)
      }
    }

    async function joinGame(quizRoomId:number) {
      try {
        const response = await axios.post(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}/join`,
        {},
        {
          withCredentials: true,
          headers:{
            'Content-Type': 'application/json'
          }
        })
        console.log(response)
      } catch (error) {
        if(error.message == 'Request failed with status code 401'){
          console.log('401')
          const redirectEndPoint = encodeURIComponent(`/quiz/room/${quizRoomId}`);
          window.location.href = `http://localhost:8080/api/v1/login/google?redirectEndPoint=${redirectEndPoint}`
        }
        console.log(error)
      } 
      getQuizData(quizRoomId)
    }

    onMounted( async() =>{
      joinGame(quizRoomId)

    })

    return{
      UserData,
      chatSocket,
      alignedUserData,
      quizRoomId,
    }
  }
};
</script>