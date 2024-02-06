import VueRouter from 'vue-router';

declare module './router.js' {
  const router: VueRouter;
  export default router;
}
