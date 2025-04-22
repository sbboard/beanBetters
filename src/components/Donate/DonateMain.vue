<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import DonateOption from './DonateOption.vue';

const api = import.meta.env.VITE_API;
const userStore = useUserStore();
const poll = ref<Poll | null>(null);
const FEATURE_ID = '680685bfac986a4716b17a69';

const fetchPoll = async () => {
    try {
        const response = await axios.get(`${api}/polls/${FEATURE_ID}`, {
            params: { userId: userStore.user?._id },
        });
        poll.value = response.data;
    } catch (error) {
        console.error('Error fetching poll:', error);
    }
};

onMounted(async () => await fetchPoll());

async function placeBet(optionId: string) {
    const body = {
        pollId: FEATURE_ID,
        optionId: optionId,
        userId: userStore.user?._id,
        shares: 1,
    };

    try {
        const response = await axios.post(`${api}/polls/bet`, body);
        userStore.user = response.data.user;
        poll.value = response.data.poll;
    } catch (error) {
        console.error('Error placing bet:', error);
    }
}
</script>

<template>
    <img class="donate" src="/assets/k97G.gif" />
    <h2>
        Causes will be implemented as features of the site after reaching their
        3,000,000,000 bean funding goal.
    </h2>
    <div class="options" v-if="poll">
        <DonateOption
            v-for="(option, index) in poll.options"
            :key="index"
            :poll
            :option
            :betFunction="placeBet"
        />
    </div>
</template>

<style lang="scss" scoped>
.donate {
    filter: sepia(1) hue-rotate(33deg) saturate(3.5) contrast(1.5);
    max-height: 2em;
    max-width: 100%;
}

h2 {
    text-align: left;
    font-size: 1rem;
    text-transform: none;
    color: white;
    font-weight: 400;
    margin-bottom: 1rem;
}

.options {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    & * {
        box-sizing: border-box;
    }
}
</style>
