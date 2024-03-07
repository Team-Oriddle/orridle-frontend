// socket/chatSocket.ts
import { Router } from 'vue-router';
import * as Stomp from 'webstomp-client';

interface UserData{
  nickname:string,
  position: number,
  userId:number
}

interface GameData{
  ParticipantList:UserData[]
}

export default class ChatSocket {
  stompClient: Stomp.Client|null = null;
  connected: boolean = false;
  quizRoomId: number = -1;
  router: Router;
  ParticipantList:UserData[] = [];
  constructor(quizRoomId:number, router:Router) {
    this.quizRoomId = quizRoomId
    this.router = router;
    this.connect();
  }

  getGameData(): GameData{
    return{
      ParticipantList: this.ParticipantList
      //추후에 채팅 데이터도 추가
    }
  }
  

  connect() {
    const serverURL = 'ws://localhost:8080/ws';
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

    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/join`, message => {
      const newPlayer = JSON.parse(message.body);
      this.ParticipantList.push(newPlayer)
      console.log(this.ParticipantList)
    });
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/leave`, message => {
      this.ParticipantList = this.ParticipantList.filter((player) => player.userId !== JSON.parse(message.body).userId)
      console.log(this.ParticipantList)
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