<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
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

const options = computed(() => {
    if (!poll.value) return [];
    const betsNeeded = (poll.value.seed || 0) / poll.value.pricePerShare;
    const bets: PollOption[] = [];
    poll.value.options.forEach(option => {
        if (option.bettors.length < betsNeeded) {
            bets.push(option);
        }
    });
    return bets;
});

onMounted(async () => await fetchPoll());
</script>

<template>
    <img class="donate" src="/assets/k97G.gif" style="margin-bottom: 1em" />
    <div class="options" v-if="poll">
        <DonateOption
            v-for="(option, index) in options"
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
    text-align: center;
    margin: 0 auto 1em auto;
    display: block;
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

@media (max-width: 700px) {
    .options {
        flex-direction: column;
        .singleOption {
            margin-bottom: 1em;
            padding: 0;
        }
    }
}
</style>
