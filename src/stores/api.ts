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
            const response = await axios.get(`${api}/polls`);
            polls.value.data = response.data;
            polls.value.lastFetch = now;
        } catch (error) {
            console.error('Error fetching polls:', error);
            throw error;
        }
    };

    return { winners, polls, fetchWinners, fetchPolls };
});
