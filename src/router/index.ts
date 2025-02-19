import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Bets from '@/views/Polls/PollView.vue';
import CreateBet from '@/views/Polls/PollCreate.vue';
import SettleBet from '@/views/Polls/PollSettle.vue';
import Leaderboards from '@/views/LeaderBoards.vue';
import LoginView from '@/views/LoginView.vue';
import patchNotes from '@/views/patchNotes.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/bets/create',
            name: 'create-bet',
            component: CreateBet,
        },
        {
            path: '/bets/settle/:id',
            name: 'settle-bet',
            component: SettleBet,
        },
        {
            path: '/bets',
            name: 'bets',
            component: Bets,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/leaderboards',
            name: 'leaderboards',
            component: Leaderboards,
        },
        {
            path: '/notes',
            name: 'patchnotes',
            component: patchNotes,
        },
    ],
});

export default router;
