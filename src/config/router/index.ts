import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
    },
    {
      path: '/rides',
      name: 'rides',
      component: () => import('@/views/RideListView.vue'),
    },

    {
      path: '/rides/:rideId',
      name: 'rides.detail',
      component: () => import('@/views/RideDetailView.vue'),
    },

    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountView.vue'),
    },
  ],
})

export default router
