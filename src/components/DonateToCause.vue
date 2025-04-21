<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import Bars from '../components/Polls/PollBars.vue';
import { computed, onMounted, ref } from 'vue';
import { useEconomy } from '@/composables/useEconomy';

const api = import.meta.env.VITE_API;
const userStore = useUserStore();

const shares = ref(1);
const shareLimit = (option: PollOption) => {
    if (!poll.value) return 0;
    const beans = userStore.user?.beans || 0;
    const sharesUserCanAfford = Math.floor(beans / poll.value.pricePerShare);
    const sharesNeeded = (poll.value.seed || 0) / poll.value.pricePerShare;
    const halfShares = Math.floor(sharesNeeded / 2);
    const sharesLeft = sharesNeeded - option.bettors.length;
    return Math.min(sharesUserCanAfford, halfShares, sharesLeft);
};
const poll = ref<Poll | null>(null);
const { addCommas } = useEconomy();
const FEATURE_ID = '680685bfac986a4716b17a69';

const disableDonating = computed(() => {
    if (shares.value < 1) {
        return 'NO SHARES';
    }
    if ((userStore.user?.beans || 0) < (poll.value?.pricePerShare || 0)) {
        return 'TOO POOR TO DONATE';
    }
    if ((userStore.user?.debt || 0) > 0) {
        return 'CANNOT DONATE WITH DEBT';
    }
    return '';
});

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

const getFundedAmt = (option: PollOption) => {
    if (!poll.value) return 0;
    return option.bettors.length * poll.value.pricePerShare;
};

onMounted(async () => {
    await fetchPoll();
});
</script>

<template>
    <hr />
    <img class="donate" src="/assets/k97G.gif" />
    <h2>
        Causes will be implemented as features of the site after reaching their
        3,000,000,000 bean funding goal.
    </h2>
    <div class="options">
        <div v-for="(option, index) in poll?.options" :key="index">
            <img :src="`/assets/features/${option._id}.jpg`" />
            <h1>{{ option.text }}</h1>
            <Bars
                style="border: 1px solid var(--themeColor); padding: 0.25em 0"
                :percent="getFundedAmt(option) / (poll?.seed || 1)"
                :option="`
                ${addCommas(option.bettors.length * (poll?.pricePerShare || 0))}
                BEANS RAISED`"
                :voters="option.bettors"
                :pps="poll?.pricePerShare || 0"
                :userId="userStore.user!._id"
                :hideBeanCount="true"
            />
            <div class="shares">
                <input
                    v-model.number="shares"
                    :min="1"
                    :value="Math.floor(shares)"
                    :max="shareLimit(option)"
                    type="number"
                    step="1"
                />
                SHARES
            </div>
            <div
                class="betButton"
                @click="placeBet(option._id)"
                :class="{ disabled: disableDonating }"
            >
                {{
                    disableDonating ||
                    `DONATE ${addCommas(poll!.pricePerShare * shares)} BEANS`
                }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
hr {
    margin: 1em 0;
    border-color: var(--themeColor);
}

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
    & > div {
        padding: 0 1em;
        img {
            max-width: 80%;
            margin: 0 auto;
            border-radius: 50%;
            display: block;
            margin-bottom: 1rem;
        }
    }
    h1 {
        font-size: 1em;
        margin-bottom: 0.5em;
    }
    .betButton {
        margin-top: 0.5em;
        cursor: pointer;
        display: block;
        background-color: var(--themeColor);
        color: black;
        padding: 0.5em;
        text-align: center;
        font-weight: bold;
        width: 100%;
        box-sizing: border-box;
        user-select: none;
        &.disabled {
            animation: none;
            opacity: 0.5;
            cursor: not-allowed;
            border: 1px solid var(--themeColor);
            background-color: transparent;
            color: var(--themeColor);
            pointer-events: none;
        }
    }

    .shares {
        color: white;
        width: 100%;
        text-align: center;
        input {
            background: none;
            outline: none;
            border: 0;
            color: var(--themeColor);
            border-bottom: 2px solid var(--themeColor);
            width: 4em;
            text-align: center;
            font-size: 1.125em;
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }
        }
    }
}
</style>
