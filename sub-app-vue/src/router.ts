import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import Dashboard from './pages/Dashboard.vue';
import Details from './pages/Details.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/details/:id',
    component: Details,
  },
];

export function createAppRouter(basePath: string) {
  return createRouter({
    history: createWebHistory(basePath),
    routes,
  });
}
