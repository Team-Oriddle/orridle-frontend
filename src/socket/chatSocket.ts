// socket/chatSocket.ts
import { Router } from 'vue-router';
import * as Stomp from 'webstomp-client';

interface GameData{
  ParticipantList:[]
}

export default class ChatSocket {
  stompClient: Stomp.Client|null = null;
  connected: boolean = false;
  quizRoomId: number = -1;
  router: Router;
  ParticipantList:[] = [];
  constructor(quizRoomId:number, router:Router) {
    this.quizRoomId = quizRoomId
    this.router = router;
    //ParticipantList의 경우 userId,nickname,position의 데이터를 가지고 있음,
    this.connect();
  }

  getGameData(): GameData{
    return{
      ParticipantList: this.ParticipantList
    }
  }

  connect() {
    //SockJS => http:
    //WebSocket => ws
    const serverURL = 'ws://localhost:8080/ws'; // 실제 서버 주소로 변경
    const socket = new WebSocket(serverURL);
    console.log(socket)
    
    this.stompClient = Stomp.over(socket);
    console.log(this.stompClient)
    console.log(`${this.quizRoomId}번 방으로 접속중...`)

    this.stompClient.connect({},this.onConnected, this.onError);
  }
  onConnected = () =>{
    console.log("연결 성공")

    this.connected = true;

      // 서버로부터 메세지를 받는 부분
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/join`, message => {
      console.log(JSON.parse(message.body));
      this.ParticipantList.push(message.body)
      console.log(this.ParticipantList)
    });
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/leave`, message => {
        // 메세지 처리 로직
      console.log(JSON.parse(message.body));
      this.ParticipantList = this.ParticipantList.filter((player) => player.userId !== message.body.userId)
      console.log(this.ParticipantList)
      //동일한 userId를 찾아서 퇴장 시킴
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