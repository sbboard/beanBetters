<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Bars from './PollBars.vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { getUserInfo } from '@/composables/useGetUserInfo';
import { addCommas } from '@/composables/useEconomy';

const { poll } = defineProps<{ poll: Poll }>();
const virtualPoll = ref(poll);

const selectedOption = ref<string | null>(null);
const userStore = useUserStore();
const userId = userStore.user?._id;

const beans = computed(() => userStore.user?.beans || 0);

const isOwner = computed(
    () => virtualPoll.value.creatorId === userId && !virtualPoll.value.winner
);
const isPastExpiration = computed(
    () => new Date() > new Date(virtualPoll.value.endDate)
);
const hasVoted = ref(isPastExpiration.value);

const timeLeft = computed(() => {
    const now = new Date();
    const end = new Date(virtualPoll.value.endDate);
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
});

const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

const totalVotes = computed(() =>
    virtualPoll.value.options.reduce(
        (sum, option) => sum + option.bettors.length,
        0
    )
);
const selectOption = (id: string) => {
    if (hasVoted.value) return; // Prevent re-voting
    selectedOption.value = selectedOption.value === id ? null : id;
};

const getPercentage = (v: number) => {
    if (!totalVotes.value || !v) return 0;
    return (v / totalVotes.value) * 100;
};

const creator = ref('');

async function placeBet() {
    if (!selectedOption.value || hasVoted.value) return; // Prevent multiple votes

    try {
        const response = await axios.post(
            'https://www.gang-fight.com/api/beans/polls/bet',
            {
                pollId: virtualPoll.value._id,
                optionId: selectedOption.value,
                userId,
                shares: 1,
            }
        );
        userStore.updateBeanCount(response.data.newBeanAmt);
        virtualPoll.value = response.data.poll;
        hasVoted.value = true; // Mark user as having voted
    } catch (error) {
        console.error('Error placing bet:', error);
    }
}

onMounted(async () => {
    if (!userId) return;
    virtualPoll.value.options.forEach(option => {
        if (option.bettors.includes(userId)) {
            selectedOption.value = option._id;
            hasVoted.value = true;
        }
    });
    creator.value = (await getUserInfo(virtualPoll.value.creatorId)).name;
});
</script>

<template>
    <div class="poll" :class="{ hasVoted, hasWinner: virtualPoll.winner }">
        <h1>{{ virtualPoll.title }}</h1>
        <div class="details">
            <div>
                <div>
                    <span><strong>BOOKIE:</strong> {{ creator }}</span>
                    <span
                        ><strong>PPS:</strong>
                        {{ addCommas(virtualPoll.pricePerShare) }} BEANS</span
                    >
                </div>
                <span
                    ><strong>{{
                        !isPastExpiration ? `TIME LEFT` : `CLOSED`
                    }}</strong>
                    {{
                        !isPastExpiration
                            ? timeLeft
                            : formatDate(virtualPoll.endDate.toString())
                    }}</span
                >
            </div>
            <span class="description">{{ virtualPoll.description }}</span>
        </div>
        <div class="main">
            <div
                class="option"
                v-for="pollOption in virtualPoll.options"
                :class="{ isWinner: poll.winner === pollOption._id }"
                :key="pollOption._id"
                @click="selectOption(pollOption._id)"
            >
                <div
                    class="selector"
                    :class="{ selected: selectedOption === pollOption._id }"
                >
                    <span v-if="selectedOption === pollOption._id">🫘</span>
                </div>
                <Bars
                    :key="totalVotes"
                    :percent="getPercentage(pollOption.bettors.length)"
                    :option="pollOption.text"
                    :voters="pollOption.bettors"
                    :is-winner="virtualPoll.winner === pollOption._id"
                    :price-per-share="virtualPoll.pricePerShare"
                />
            </div>
            <div class="total seed">SEED BEANS: 2,000,000</div>
            <div class="total">
                TOTAL BEANS: {{ addCommas(virtualPoll.pot) }}
            </div>
            <template v-if="!hasVoted && !isPastExpiration && selectedOption">
                <div
                    v-if="beans < virtualPoll.pricePerShare"
                    class="betButton noBeans"
                >
                    NOT ENOUGH BEANS
                </div>
                <div v-else @click="placeBet" class="betButton">
                    BET NOW BET NOW BET NOW!!!!! $$$$$
                </div>
            </template>
            <div v-if="isOwner && isPastExpiration" class="ownerOptions">
                <RouterLink :to="`/bets/settle/${virtualPoll._id}`"
                    >$$$ SETTLE BET $$$</RouterLink
                >
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.poll {
    border: 1px solid var(--themeColor);
    margin-bottom: 15px;
    h1 {
        color: var(--themeColor);
        border-bottom: 1px solid var(--themeColor);
        padding: 10px;
        margin-bottom: 0;
        text-align: left;
    }
    .details {
        padding: 10px;
        border-bottom: 1px solid var(--themeColor);
        font-size: 0.9em;
        word-wrap: break-word;
        span {
            display: block;
        }
        strong {
            font-weight: bold;
        }
        & > div {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
    }
    & > div {
        display: block;
    }

    .total {
        text-align: right;
        font-size: 0.9em;
        margin-top: 5px;
        font-weight: 600;
        &.seed {
            color: var(--themeColor);
        }
    }

    .main {
        padding: 10px;
        padding-top: 27px;
        border-bottom: 1px solid var(--themeColor);
    }

    .betButton,
    .ownerOptions > a {
        cursor: pointer;
        display: block;
        background-color: var(--themeColor);
        color: black;
        padding: 0.5em;
        text-align: center;
        font-weight: bold;
        margin-top: 0.5rem;
        animation: blink 0.25s linear infinite;
        &.noBeans {
            animation: none;
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .ownerOptions > a {
        color: var(--themeColor);
        background-color: transparent;
        border: 1px solid var(--themeColor);
        animation: none;
        text-decoration: none;
        &.disabled {
            opacity: 0.5;
            animation: none;
            pointer-events: none;
        }
    }
    &.hasVoted {
        .option {
            cursor: unset;
        }
        .selector {
            pointer-events: none;
            border: 1px solid transparent;
        }
    }
    &.hasWinner {
        .option {
            cursor: unset;
            opacity: 0.35;
            &.isWinner {
                opacity: 1;
            }
        }
    }
}

@keyframes blink {
    0% {
        color: black;
    }
    49% {
        color: black;
    }
    50% {
        color: var(--themeColor);
    }
    100% {
        color: var(--themeColor);
    }
}
</style>
