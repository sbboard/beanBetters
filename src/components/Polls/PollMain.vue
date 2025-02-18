<script setup lang="ts">
import { computed, ref } from 'vue';
import Bars from './PollBars.vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const { poll } = defineProps<{ poll: Poll }>();

const selectedOption = ref<string | null>(null);

const isOwner = computed(() => poll.creatorId === useUserStore().userId);
const isPastExpiration = computed(() => new Date() > new Date(poll.endDate));
const betCopy = computed(() => {
    if (!selectedOption.value) return 'SELECT AN OPTION';
    return 'BET NOW BET NOW BET NOW!!!!! $$$$$$$$$$';
});

const timeLeft = computed(() => {
    const now = new Date();
    const end = new Date(poll.endDate);
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
});

const settleCopy = computed(() => {
    if (isPastExpiration.value) return '$$$ SETTLE BET $$$';
    return `TIME LEFT: ${timeLeft.value}`;
});

const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
};

const totalVotes = poll.options
    .map(o => o.betters.length)
    .reduce((a, b) => a + b, 0);

const selectOption = (id: string) => {
    if (id === selectedOption.value) return (selectedOption.value = null);
    selectedOption.value = id;
};

const getPercentage = (v: number) => {
    if (!totalVotes || !v) return 0;
    return (v / totalVotes) * 100;
};

async function placeBet() {
    if (!selectedOption.value) return;

    try {
        const { userId } = useUserStore();
        await axios.post('https://www.gang-fight.com/api/beans/polls/bet', {
            pollId: poll._id,
            optionId: selectedOption.value,
            userId,
        });

        console.log('Bet placed successfully');
    } catch (error) {
        console.error('Error placing bet:', error);
    }
}
</script>

<template>
    <div class="poll">
        <h1>{{ poll.title }}</h1>
        <div class="main">
            <div class="description">{{ poll.description }}</div>
            <div
                class="option"
                v-for="pollOption in poll.options"
                :key="pollOption._id"
            >
                <div
                    class="selector"
                    :class="{ selected: selectedOption === pollOption._id }"
                    @click="selectOption(pollOption._id)"
                ></div>
                <Bars
                    :percent="getPercentage(pollOption.betters.length)"
                    :option="pollOption.text"
                    :voters="pollOption.betters"
                />
            </div>
            <div class="total">Total Bets: {{ totalVotes }}</div>
            <div
                @click="placeBet"
                class="betButton"
                :class="{ disabled: !selectedOption }"
            >
                {{ betCopy }}
            </div>
            <div v-if="isOwner" class="ownerOptions">
                <RouterLink
                    :class="{ disabled: !isPastExpiration }"
                    :to="`/bets/settle/${poll._id}`"
                    >{{ settleCopy }}</RouterLink
                >
            </div>
        </div>
        <div class="footer">
            <div>End Date: {{ formatDate(poll.endDate.toString()) }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.poll {
    border: 1px solid var(--themeColor);
    margin-bottom: 15px;
    h1 {
        border-bottom: 1px solid var(--themeColor);
        padding: 10px;
        margin-bottom: 0;
    }
    & > div {
        display: block;
    }
    .option {
        margin-bottom: 10px;
    }
}

.total {
    text-align: right;
    font-size: 0.9em;
    margin-top: 5px;
}

.footer,
.main {
    padding: 10px;
}
.main {
    border-bottom: 1px solid var(--themeColor);
    .description {
        margin-bottom: 20px;
    }
}

.option {
    display: flex;
    .selector {
        height: 20px;
        width: 20px;
        border: 1px solid var(--themeColor);
        cursor: pointer;
        &.selected {
            background-color: var(--themeColor);
        }
    }
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
