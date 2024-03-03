// socket/chatSocket.ts
import * as Stomp from 'webstomp-client';
import * as SockJS from 'sockjs-client/dist/sockjs';

export default class ChatSocket {
  stompClient: Stomp.Client|null = null;
  connected: boolean = false;
  quizRoomId: number = -1;
  constructor(quizRoomId:number) {
    this.quizRoomId = quizRoomId
    this.connect();
  }

  connect() {
    //SockJS => http:
    //WebSocket => ws:
        const serverURL = ' http://localhost:8080/ws'; // 실제 서버 주소로 변경
    const socket = new SockJS(serverURL);
    console.log(socket)

    this.stompClient = Stomp.over(socket);
    console.log(this.stompClient)
    console.log(`${this.quizRoomId}번 방으로 접속중...`)

    this.stompClient.connect({},this.onConnected, this.onError);
  }
  onConnected(){
    console.log("연결 시도 중")

    this.connected = true;
    console.log('Connected');
      // 서버로부터 메세지를 받는 부분
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/join`, message => {
        // 메세지 처리 로직
      console.log(JSON.parse(message.body));
    });
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/leave`, message => {
        // 메세지 처리 로직
      console.log(JSON.parse(message.body));
    });
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/start`, message => {
        // 페이지 이동 로직 작성
        // 참가자 정보 + 방 정보를 넘겨줘야함
      console.log(JSON.parse(message.body));
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