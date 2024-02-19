import { createWebHistory, createRouter } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import test from '../components/test.vue';
import Auth from '../pages/Auth/AuthPage.vue'
import QuizRoomPage from '../pages/quiz_room/QuizRoomPage.vue'
import QuizGamePage from '../pages/quiz_game/QuizGamePage.vue'
import QuizAttendpage from '../pages/quiz_attend/QuizAttendPage.vue'
import QuizResultPage from '../pages/quiz_result/QuizResultPage.vue'
import QuizCreatePage from '../pages/quiz_create/QuizCreatePage.vue'
import Mypage from '../pages/my_Page/Mypage.vue'
import InfoPage from '../pages/info/InfoPage.vue'
import NoticePage from '../pages/notice/NoticePage.vue'
import Layout from '../components/Layout.vue'
import MainPage from '../pages/main/MainPage.vue'

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/test',
    component: test,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: "/quiz",
    component: Layout,
    children:[
      {
        path: "room",
        name : 'quizroom',
        component: QuizRoomPage
      },
      {
        path: "game",
        name : 'quizgame',
        component: QuizGamePage
      },
      {
        path: "attend",
        name : 'quizattend',
        component: QuizAttendpage
      },
      {
        path: "result",
        name : 'quizroom',
        component:  QuizResultPage
      },
      {
        path: "create",
        name : 'quizroom',
        component: QuizCreatePage
      },
    ]
  },
  {
    path: "/mypage",
    name: 'mypage',
    component: Mypage
  },
  {
    path: "/info",
    name : 'infomation',
    component: InfoPage
  },
  {
    path: "/notice",
    name : 'notice',
    component: NoticePage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
