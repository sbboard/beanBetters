import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Bets from '@/views/Polls/PollView.vue';
import CreateBet from '@/views/Polls/PollCreate.vue';
import SettleBet from '@/views/Polls/PollSettle.vue';
import Leaderboards from '@/views/LeaderBoards.vue';
import LoginView from '@/views/LoginView.vue';
import patchNotes from '@/views/patchNotes.vue';
import Rules from '@/views/RulesView.vue';
import Inventory from '@/views/InventoryView.vue';
import Loan from '@/views/LoanView.vue';
import Store from '@/views/StoreView.vue';
import AdminView from '@/views/AdminView.vue';
import NotificationView from '@/views/NotificationView.vue';
import MeetTheArtist from '@/views/Articles/MeetTheArtist.vue';

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
        {
            path: '/rules',
            name: 'rules',
            component: Rules,
        },
        {
            path: '/store',
            name: 'store',
            component: Store,
        },
        {
            path: '/inventory',
            name: 'inventory',
            component: Inventory,
        },
        {
            path: '/loan',
            name: 'loan',
            component: Loan,
        },
        {
            path: '/notifications',
            name: 'notifications',
            component: NotificationView,
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView,
        },
        {
            path: '/artist',
            name: 'artist',
            component: MeetTheArtist,
        },
    ],
});

// Navigation guard to scroll to top on each route change
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    next();
});

export default router;
