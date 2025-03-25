import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './user';

const API_TIMEOUT = 1000 * 10;

export const useApiStore = defineStore('api', () => {
    const winners = ref({
        data: <User[]>[],
        chart: <ChartEntry[]>[],
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

    function resetAPIs() {
        winners.value.data = [];
        winners.value.chart = [];
        winners.value.lastFetch = 0;
        polls.value.data = [];
        polls.value.lastFetch = 0;
        lottoAmt.value.data = 0;
        lottoAmt.value.lastFetch = 0;
    }

    const api = import.meta.env.VITE_API;
    const fetchWinners: () => Promise<void> = async () => {
        const now = Date.now();
        if (
            winners.value.lastFetch &&
            winners.value.lastFetch >= now - API_TIMEOUT
        ) {
            return;
        }

        try {
            const response = await axios.get(`${api}/user/winners`);
            winners.value.data = response.data;
            const secondResponse = await axios.get(`${api}/user/winners-chart`);
            winners.value.chart = secondResponse.data;
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
            polls.value.lastFetch >= now - API_TIMEOUT
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
            lottoAmt.value.lastFetch >= now - API_TIMEOUT
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

    return {
        winners,
        polls,
        lottoAmt,
        fetchWinners,
        fetchPolls,
        fetchLotto,
        resetAPIs,
    };
});
