import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        layout: 'main',
        display: 'Dashboard',
        crumbs: ['Dashboard']
      }
    }
  ]
});

export default router;
