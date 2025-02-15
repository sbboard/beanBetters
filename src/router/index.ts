import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Bets from '@/views/BetsView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/bets',
            name: 'bets',
            component: Bets,
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
        },
    ],
});

export default router;
