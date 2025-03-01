import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './user';

export const useApiStore = defineStore('api', () => {
    const winners = ref({
        data: <User[]>[],
        lastFetch: 0,
    });
    const polls = ref({
        data: <Poll[]>[],
        lastFetch: 0,
    });
    const lottoAmt = ref({
        data: <number>0,
        lastFetch: 0,
    });
    const api = import.meta.env.VITE_API;
    const fetchWinners: () => Promise<void> = async () => {
        const now = Date.now();
        if (
            winners.value.lastFetch &&
            winners.value.lastFetch >= now - 1000 * 30
        ) {
            return;
        }

        try {
            const response = await axios.get(`${api}/user/winners`);
            winners.value.data = response.data;
            winners.value.lastFetch = now;
        } catch (error) {
            console.error('Error fetching polls:', error);
            throw error;
        }
    };

    const fetchPolls = async (force = false): Promise<void> => {
        const now = Date.now();
        if (
            !force &&
            polls.value.lastFetch &&
            polls.value.lastFetch >= now - 1000 * 30
        ) {
            return;
        }

        try {
            const userStore = useUserStore();
            const response = await axios.get(`${api}/polls`, {
                params: { userId: userStore.user?._id },
            });
            polls.value.data = response.data;
            polls.value.lastFetch = now;
        } catch (error) {
            console.error('Error fetching polls:', error);
            throw error;
        }
    };

    const fetchLotto = async (force = false): Promise<void> => {
        const now = Date.now();
        if (
            !force &&
            lottoAmt.value.lastFetch &&
            lottoAmt.value.lastFetch >= now - 1000 * 30
        ) {
            return;
        }

        try {
            const response = await axios.get(`${api}/store/get-jackpot`);
            lottoAmt.value.data = response.data.jackpot;
            lottoAmt.value.lastFetch = now;
        } catch (error) {
            console.error('Error fetching polls:', error);
            throw error;
        }
    };

    return { winners, polls, lottoAmt, fetchWinners, fetchPolls, fetchLotto };
});
