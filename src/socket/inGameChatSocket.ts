// socket/chatSocket.ts
import { ref } from 'vue';
import { Router } from 'vue-router';
import * as Stomp from 'webstomp-client';

interface UserData{
  nickname:string,
  position: number,
  userId:number
}


interface Question{
  number: number, // 문제의 번호(몇 번째 번호인지)
  description: string,
	type: string,
	sourceType: string,
	source: string,
	score: number,
	timeLimit: number
}

interface Answer{
	answer: string,
	userIndex: number,
	score: number, 
	scores: number[], 
	waitTime: number 
}


export default class InGameSocket {
  stompClient: Stomp.Client|null = null;
  connected: boolean = false;
  quizRoomId: number = -1;
  router: Router;
  QuestionData = ref<Question|null>(null);
  answer: Answer|null = null;
  ParticipantList = ref<UserData[]>([]);
  constructor(quizRoomId:number, router:Router, participants:UserData[],QuestionData:any) {
    this.ParticipantList.value = participants
    this.QuestionData.value = QuestionData
    console.log(this.ParticipantList.value)
    console.log(this.QuestionData.value)
    this.quizRoomId = quizRoomId
    this.router = router;
    this.connect();
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
      console.log(this.ParticipantList.value)
      const newPlayer = JSON.parse(message.body);
      this.ParticipantList.value.push(newPlayer)
      console.log(this.ParticipantList.value)
      console.log(this)
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

    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/question`, message => {
      console.log(JSON.parse(message.body))
      this.QuestionData.value = JSON.parse(message.body)
      console.log(this.QuestionData.value)
      console.log(this)

    });
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/answer`, message => {
      console.log(JSON.parse(message.body))
      const newAnswer = JSON.parse(message.body)
      this.answer = newAnswer
    });
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/timeover`, message => {
      console.log(JSON.parse(message.body))
      const newAnswer = JSON.parse(message.body)
      this.answer = newAnswer
    });
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/finish`, message => {
      console.log(JSON.parse(message.body))
      //시간 초과시 정답을 알려주는 구독
    });
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/chat`, message => {
      console.log(JSON.parse(message.body))
    });
    
  }
  onError(){
    console.log('error')
  }
  sendMessage(msg,quizRoomId:number) {
    if (this.stompClient && this.stompClient.connected) {
      const message = JSON.stringify(msg);
      this.stompClient.send(`/app/quiz-room/${quizRoomId}`, message, {});
      //주관식이면 채팅입력시 퀴즈 문제 정답과 퀴즈방 채팅을 동시에 쏴주고
      //그게 아닌경우 채팅으로 퀴즈방 채팅만
    }
  }
}