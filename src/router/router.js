import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue"
import test from "../components/test.vue"

const routes = [
  {
    path: "/",
    component: HelloWorld,
  },
  {
    path: "/test",
    component: test,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;