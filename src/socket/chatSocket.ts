// socket/chatSocket.ts
import { ref } from 'vue';
import { Router } from 'vue-router';
import * as Stomp from 'webstomp-client';

interface UserData{
  nickname:string,
  position: number,
  userId:number
}

export default class ChatSocket {
  stompClient: Stomp.Client|null = null;
  connected: boolean = false;
  quizRoomId: number = -1;
  router: Router;
  ParticipantList = ref<UserData[]>([]);
  constructor(quizRoomId:number, router:Router, participants:UserData[]) {
    this.ParticipantList.value = participants
    console.log(this.ParticipantList.value)
    this.quizRoomId = quizRoomId
    this.router = router;
    this.connect();
  }

  connect() {
    const serverURL = 'ws://localhost:8080/ws';
    const socket = new WebSocket(serverURL);
    
    this.stompClient = Stomp.over(socket);
    console.log(`${this.quizRoomId}번 방으로 접속중...`)
    this.stompClient.connect({},this.onConnected, this.onError);
  }
  onConnected = () =>{
    console.log("연결 성공")
    this.connected = true;
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/join`, message => {
      const newPlayer = JSON.parse(message.body);
      this.ParticipantList.value.push(newPlayer)
      console.log(this.ParticipantList.value)
    });
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/leave`, message => {
      const userId = JSON.parse(message.body).userId;
      console.log(userId)
      const index = this.ParticipantList.value.findIndex(player => player.userId === userId);
      if (index !== -1) {
        this.ParticipantList.value.splice(index, 1);
      }
      console.log(this.ParticipantList.value);
    });
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/start`, message => {
        // 참가자 정보 + 방 정보를 넘겨줘야함
        // API에 있음
      console.log(JSON.parse(message.body));
      this.router.push('/quiz/game')
    });
  }
  onError(){
    console.log('error')
  }
  sendMessage(msg,quizRoomId:number) {
    if (this.stompClient && this.stompClient.connected) {
      const message = JSON.stringify(msg);
      this.stompClient.send(`/app/quiz-room/${quizRoomId}`, message, {});
    }
  }
}