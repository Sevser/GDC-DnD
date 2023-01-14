import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.ASSET_URL),
  routes: routes as RouteRecordRaw[],
});

export default router;
