// socket/chatSocket.ts
import { Router } from 'vue-router';
import * as Stomp from 'webstomp-client';

interface UserData{
  nickname:string,
  position: number,
  userId:number
}

interface Question{
  description: string,
	type: string,
	number: number, // 문제의 번호(몇 번째 번호인지)
	sourceType: string,
	source: string,
	score: number,
	timeLimit: number
}

interface GameData{
  ParticipantList:UserData[]
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
  ParticipantList:UserData[] = [];
  Question:Question|null = null;
  answer:Answer|null = null;
  constructor(quizRoomId:number, router:Router) {
    this.quizRoomId = quizRoomId
    this.router = router;
    this.connect();
  }

  getAnswer(){
    return{
      Answer: this.answer
    }
  }

  getQuestionData(){
    return{
      Question: this.Question
    }
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
    //////////////////////////////////////////////
    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/question`, message => {
      console.log(JSON.parse(message.body))
      const newQuestion = JSON.parse(message.body)
      this.Question = newQuestion

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