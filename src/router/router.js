import { createWebHistory, createRouter } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import test from '../components/test.vue';
import AuthPage from '../pages/Auth/AuthPage.vue';

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
    component: AuthPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
