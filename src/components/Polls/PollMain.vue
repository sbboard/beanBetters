<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Bars from './PollBars.vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { getUserInfo } from '@/composables/useGetUserInfo';

const { poll } = defineProps<{ poll: Poll }>();
const virtualPoll = ref(poll);

const selectedOption = ref<string | null>(null);
const userStore = useUserStore();
const userId = userStore.user?._id;

const isOwner = computed(() => poll.creatorId === userId && !poll.winner);
const isPastExpiration = computed(() => new Date() > new Date(poll.endDate));
const hasVoted = ref(isPastExpiration.value);

const timeLeft = computed(() => {
    const now = new Date();
    const end = new Date(poll.endDate);
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
});

const totalVotes = computed(() =>
    virtualPoll.value.options.reduce(
        (sum, option) => sum + option.betters.length,
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
        await axios.post('https://www.gang-fight.com/api/beans/polls/bet', {
            pollId: poll._id,
            optionId: selectedOption.value,
            userId,
        });
        hasVoted.value = true; // Mark user as having voted
        virtualPoll.value.options = virtualPoll.value.options.map(option => {
            if (option._id === selectedOption.value) {
                option.betters.push(userId as string);
            }
            return option;
        });
    } catch (error) {
        console.error('Error placing bet:', error);
    }
}

onMounted(async () => {
    if (!userId) return;
    poll.options.forEach(option => {
        if (option.betters.includes(userId)) {
            selectedOption.value = option._id;
            hasVoted.value = true;
        }
    });
    creator.value = (await getUserInfo(poll.creatorId)).name;
});
</script>

<template>
    <div class="poll" :class="{ hasVoted, hasWinner: poll.winner }">
        <h1>{{ poll.title }}</h1>
        <div class="details">
            <div>
                <span><strong>MANAGED BY:</strong> {{ creator }}</span>
                <span
                    ><strong>{{ timeLeft ? `TIME LEFT` : `CLOSED` }}</strong>
                    {{ timeLeft ? timeLeft : poll.endDate }}</span
                >
            </div>
            <span class="description">{{ poll.description }}</span>
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
                    :percent="getPercentage(pollOption.betters.length)"
                    :option="pollOption.text"
                    :voters="pollOption.betters"
                    :is-winner="poll.winner === pollOption._id"
                />
            </div>
            <div class="total">Total Bets: {{ totalVotes }}</div>
            <div
                v-if="!hasVoted && !isPastExpiration && selectedOption"
                @click="placeBet"
                class="betButton"
            >
                BET NOW BET NOW BET NOW!!!!! $$$$$
            </div>
            <div v-if="isOwner && isPastExpiration" class="ownerOptions">
                <RouterLink
                    :class="{ disabled: !isPastExpiration }"
                    :to="`/bets/settle/${poll._id}`"
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
    .option {
        margin-bottom: 10px;
        display: flex;
        cursor: pointer;
        .selector {
            height: 20px;
            width: 20px;
            border: 1px solid var(--themeColor);
            box-sizing: border-box;
            user-select: none;
            position: relative;
            overflow: visible;
            &.selected {
                display: flex;
                justify-content: center;
                align-items: center;
                line-height: 0;
                position: relative;
                overflow: visible;
                span {
                    position: absolute;
                    top: 50%;
                    bottom: 0;
                }
            }
        }
    }

    .total {
        text-align: right;
        font-size: 0.9em;
        margin-top: 5px;
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
        &.disabled {
            opacity: 0.5;
            animation: none;
            pointer-events: none;
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
