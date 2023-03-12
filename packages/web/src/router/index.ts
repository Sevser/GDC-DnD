import { authManager } from '@/plugins/auth';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.ASSET_URL),
  routes: routes as RouteRecordRaw[],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.authRequired && !authManager.authState.isAuth) {
    // redirect the user to the login page
    return next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
