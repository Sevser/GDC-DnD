import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import routes from './routes';

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
});

export default router;
