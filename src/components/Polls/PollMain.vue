<script setup lang="ts">
import { computed, ref } from 'vue';
import Bars from './PollBars.vue';
import { useUserStore } from '@/stores/user';

const props = defineProps<{
    poll: Poll;
}>();

const selectedOption = ref<number | null>(null);

const totalVotes =
    props.poll.options?.reduce(
        (acc, option) => acc + option.betters.length,
        0
    ) || 0;

const vote = (id: number) => {
    if (id === selectedOption.value) {
        selectedOption.value = null;
        return;
    }
    selectedOption.value = id;
};
const getPercentage = (v: number) => {
    if (!totalVotes || !v) return '0';
    return ((v / totalVotes) * 100).toFixed(2);
};

const betCopy = computed(() => {
    if (!selectedOption.value) return 'SELECT AN OPTION';
    return 'BET NOW BET NOW BET NOW!!!!! $$$$$$$$$$';
});

const isOwner = computed(() => props.poll.creatorId === useUserStore().userId);

const isPastExpiration = computed(() => {
    // return true;
    return new Date() > new Date(props.poll.endDate);
});

const timeLeft = computed(() => {
    const now = new Date();
    const end = new Date(props.poll.endDate);
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
</script>

<template>
    <div class="poll">
        <h1>{{ props.poll.title }}</h1>
        <div class="main">
            <div class="description">{{ props.poll.description }}</div>
            <div
                class="option"
                v-for="pollOption in props.poll.options"
                :key="pollOption._id"
            >
                <div
                    class="selector"
                    :class="{ selected: selectedOption === pollOption._id }"
                    @click="vote(pollOption._id)"
                ></div>
                <Bars
                    :percent="getPercentage(pollOption.betters.length)"
                    :option="pollOption.text"
                    :voters="pollOption.betters"
                />
            </div>
            <div class="total">Total Bets: {{ totalVotes }}</div>
            <div class="betButton" :class="{ disabled: !selectedOption }">
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
            <div>End Date: {{ props.poll.endDate?.toString() }}</div>
            <div>Managed by: {{ props.poll.creatorId }}</div>
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
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
    }
    & > div {
        display: block;
    }
}

.total {
    text-align: right;
    font-size: 0.9em;
    margin-top: 5px;
}

.main {
    border-bottom: 1px solid var(--themeColor);
    .description {
        margin-bottom: 10px;
    }
}

.footer,
.main {
    padding: 10px;
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
        cursor: not-allowed;
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
