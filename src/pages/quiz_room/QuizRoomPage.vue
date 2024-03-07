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
        <!--ㅎgameData넘겨주기-->>
        <ParticipantList :participants=gameData />
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
        <QuizRoomInfo />
      </div>

      <!-- 게임 시작 버튼 -->
      <div class="">
        <StartGameButton />
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

interface Participant {
  userId: number;
  nickname: string;
  position: number;
}

export default {
  name: 'QuizRoomPage', //내차 에올라타
  components: { 
    StartGameButton,
    QuizRoomInfo,
    ParticipantList,
    ChatWindow,
  },
  data() {
    return {
      chatSocket: null,
      messages: [],
      newMessage: '',
      gameData: [],
    };
  },
  created(){
    this.chatSocket = new ChatSocket(1,this.$router);
    this.gameData = this.chatSocket.getGameData();
    console.log(this.gameData)
  },
  methods:{
    sendMessage(){
      console.log('메시지 전송을 준비하고 있어요')
      const msg = {
        userName: 'User1',
        content: this.newMessage,
      };
      this.chatSocket.sendMessage(msg,1);
      this.newMessage = '';
      console.log('메시지 전송을 마무리했어요')
    }
  }
};
</script>
