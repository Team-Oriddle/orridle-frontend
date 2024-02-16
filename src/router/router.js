import { createWebHistory, createRouter } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import test from '../components/test.vue';
import Auth from '../pages/Auth/AuthPage.vue';
import QuizLayout from '../components/QuizLayout.vue';
import QuizGamePage from '../pages/quiz_game/QuizGamePage.vue';
import QuizAttendpage from '../pages/quiz_attend/QuizAttendPage.vue';
import QuizResultPage from '../pages/quiz_result/QuizResultPage.vue';
import QuizCreatePage from '../pages/quiz_create/QuizCreatePage.vue';
import QuizRoomPage from '../pages/quiz_room/QuizRoomPage.vue';
import Mypage from '../pages/my_page/Mypage.vue';
import InfoPage from '../pages/info/InfoPage.vue';
import NoticePage from '../pages/notice/NoticePage.vue';

const routes = [
  {
    path: '/',
    component: HelloWorld,
  },
  {
    path: '/test',
    component: test,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/quiz',
    component: QuizLayout,
    children: [
      {
        // 퀴즈 대기실
        path: 'room',
        name: 'quizroom',
        component: QuizRoomPage,
      },
      {
        // 퀴즈 게임 진행 페이지
        path: 'game',
        name: 'quizgame',
        component: QuizGamePage,
      },
      {
        path: 'attend',
        name: 'quizattend',
        component: QuizAttendpage,
      },
      {
        path: 'result',
        name: 'quizresult',
        component: QuizResultPage,
      },
      {
        path: 'create',
        name: 'quizcreate',
        component: QuizCreatePage,
      },
    ],
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: Mypage,
  },
  {
    path: '/info',
    name: 'infomation',
    component: InfoPage,
  },
  {
    path: '/notice',
    name: 'notice',
    component: NoticePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
