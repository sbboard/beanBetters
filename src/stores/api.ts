import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useApiStore = defineStore('api', () => {
    const winners = ref({
        data: <User[]>[],
        lastFetch: 0,
    });
    const polls = ref({
        data: <Poll[]>[],
        lastFetch: 0,
    });

    const api = 'https://www.gang-fight.com/api/beans';
    const fetchWinners: () => Promise<void> = async () => {
        const twoMinutesAgo = Date.now() - 1000 * 60 * 2;
        if (winners.value.lastFetch && Date.now() - twoMinutesAgo) return;
        try {
            const response = await axios.get(`${api}/user/winners`);
            winners.value.data = response.data;
            winners.value.lastFetch = Date.now();
        } catch (error) {
            console.error('Error fetching polls:', error);
            throw error;
        }
    };

    const fetchPolls: () => Promise<void> = async () => {
        const twoMinutesAgo = Date.now() - 1000 * 60 * 2;
        if (polls.value.lastFetch && Date.now() - twoMinutesAgo) return;
        try {
            const response = await axios.get(`${api}/polls`);
            polls.value.data = response.data;
            polls.value.lastFetch = Date.now();
        } catch (error) {
            console.error('Error fetching polls:', error);
            throw error;
        }
    };

    return { winners, polls, fetchWinners, fetchPolls };
});
