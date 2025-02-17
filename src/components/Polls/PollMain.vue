<script setup lang="ts">
import { computed, ref } from 'vue';
import Bars from './PollBars.vue';

const props = defineProps<{
    poll: Poll;
}>();

const totalVotes =
    props.poll.options?.reduce(
        (acc, option) => acc + option.betters.length,
        0
    ) || 0;

const selectedOption = ref<number | null>(null);

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
    if (!selectedOption.value) return 'Select an Option';
    return 'BET NOW BET NOW BET NOW!!!!! $$$$$$$$$$';
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

.betButton {
    cursor: pointer;
    background-color: var(--themeColor);
    color: black;
    padding: 0.5em;
    text-align: center;
    font-weight: bold;
    margin-top: 0.5rem;
    animation: blink .25s linear infinite;
    &.disabled {
        opacity: 0.5;
        animation: none;
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
