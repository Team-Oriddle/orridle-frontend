// socket/chatSocket.ts
import * as Stomp from 'webstomp-client';
import * as SockJS from 'sockjs-client';

export default class InGameChatSocket {
  stompClient: Stomp.Client|null = null;
  connected: boolean = false;
  constructor(quizRoomId:number) {
    this.connect(quizRoomId);
  }

  connect(quizRoomId:number) {
    const serverURL = 'ws://localhost:8080/ws'; // 실제 서버 주소로 변경
    const socket = new SockJS(serverURL);
    this.stompClient = Stomp.over(socket);
    
    this.stompClient.connect({}, frame => {
      this.connected = true;
      console.log('Connected: ' + frame);
      // 서버로부터 메세지를 받는 부분
      this.stompClient?.subscribe(`/topic/quiz-room/${quizRoomId}/join`, message => {
        // 메세지 처리 로직
        console.log(JSON.parse(message.body));
      });
      this.stompClient?.subscribe(`/topic/quiz-room/${quizRoomId}/leave`, message => {
        // 메세지 처리 로직
        console.log(JSON.parse(message.body));
      });
    });
  }

  // 메세지 전송
  sendMessage(msg,quizRoomId:number) {
    if (this.stompClient && this.stompClient.connected) {
      const message = JSON.stringify(msg);
      this.stompClient.send(`/app/quiz-room/${quizRoomId}`, message, {});
    }
  }
}