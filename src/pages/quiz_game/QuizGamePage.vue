<!-- TODO: 1. 화면 가로/세로 비율이 일정 이하로 내려가면 스크롤이 생기도록 변경하기 -->
<!-- TODO: 2. 고정 높이를 제공하여 이미지가 로딩되면서 레이아웃 변형 없도록 하기 -->
<template>
  <!-- 전체 12column 그리드, section 별 컴포넌트 분리 예정 -->
  <main v-if="GameSocket.QuestionData.number!==0" class="container h-[90vh] mt-8 flex flex-col justify-evenly">
    <!-- 진행중인 퀴즈 문제에 대한 정보 제공 섹션, 중앙 10개 그리드 사용 -->

    <section>
      <QuestionInfo :question="GameSocket.QuestionData" />
    </section>
    <!-- 모달 컴포넌트 -->
    <Modal v-if="modalOpen" @close="closeModal"/>
    <!-- 각각의 캐릭터들 아바타와 아래에 닉네임, 그 아래에 점수가 적혀있는 부분과(퍼블리싱 때는 카드로) 그 위에 채팅 말풍선이 나타날 영역(퍼블리싱 때는 말풍선 영역 보이도록 하기) -->
    <section>
      <!-- 위에서부터 채팅 말풍선, 캐릭터(아바타)영역, 닉네임, 점수, 채팅 입력 바 -->
      <div class="justify-between">
        <!-- 플레이어 목록 컴포넌트: 아바타, 닉네임, 점수 -->
        <PlayerList :user="UserData"/>
        <!-- 채팅 입력하는 부분 -->
        <ChatInput :socket="GameSocket" />
        <div>
        </div>
      </div>
    </section>
  </main>
  <div v-else>
    <!-- 대기 화면 -->
    <p>Loading...</p>
    <p>{{ countdown }}초 뒤에 시작합니다</p>

    <p v-if="GameSocket.answer !== null">정답은 {{ GameSocket.answer.answer }}입니다</p>

  </div>
</template>

<script lang="ts">
import QuestionInfo from './components/QuestionInfo.vue';
import ChatInput from './components/ChatInput.vue';
import PlayerList from './components/PlayerList.vue';
import InGameChatSocket from '../../socket/inGameChatSocket'
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import Modal from '../../components/Modal.vue';


export default {
  name: 'QuizGamePage',
  components: {
    QuestionInfo,
    ChatInput,
    PlayerList,
    Modal,
  },
  setup(){
    const router = useRouter()
    const quizRoomId:Number =router.currentRoute.value.params.id
    const isLoading = ref(true)
    const UserData = ref([])
    const modalOpen = ref(true)
    const QuestionData = ref({
      "number": 0,
      "description": "퀴즈가 준비중입니당",
      "type": "미정",
      "sourceType": "IMAGE",
      "source": null,
      "score": "미정",
      "timeLimit": 30
    })
    const GameSocket = ref({
      Participantlist:null,
      QuestionData:{
        "number": null,
        "description": null,
        "type": null,
        "sourceType": null,
        "source": null,
        "score": null,
        "timeLimit": null
      },
      answer:null,
      connected:null,
      onConnected:null,
      quizRoomId:null,
      router:null,
      stompClient:null,
    })

    let countdown = ref(5);
    let intervalId = null; 
    let isStart = true

    function openModal(){
      modalOpen.value = true;
    }

    function closeModal(){
      modalOpen.value = false
    }
    
    async function getUserData(quizRoomId:number) {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}`,{
          withCredentials: true,
          headers:{
            'Content-Type': 'application/json'
          }
        })
        console.log(response)
        UserData.value = response.data.data.participants
        console.log(UserData.value)
        GameSocket.value = new InGameChatSocket(quizRoomId,router,UserData.value,QuestionData.value)
        QuestionData.value = GameSocket.value.QuestionData 
        isLoading.value = true
        
      } catch (error) {
        console.error(error)
      }
    }
    

    watch(() => GameSocket.value.answer, (newValue, oldValue) => {
      GameSocket.value.QuestionData.number = 0;
      countdown.value = 5
      intervalId = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
            clearInterval(intervalId);
          }
        }, 1000);
    });

    onMounted(async () => {
      // intervalId = setInterval(() => {
      //     countdown.value--;
      //     if (countdown.value <= 0) {
      //       clearInterval(intervalId);
      //     }
      //   }, 1000);

      getUserData(quizRoomId)
    })

    return{
      UserData,
      QuestionData,
      GameSocket,
      isLoading,
      countdown,
      openModal,
      closeModal,
      modalOpen,
    }
  }
};
</script>
