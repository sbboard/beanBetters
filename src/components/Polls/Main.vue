<script setup lang="ts">
import { computed, ref } from 'vue';
import Bars from './Bars.vue';
import { useUserStore } from '@/stores/user';

const props = defineProps<{
    poll: Poll;
}>();

const totalVotes = props.poll.options.reduce(
    (acc, option) => acc + option.betters.length,
    0
);

const { isLoggedIn } = useUserStore();
const selectedOption = ref<number | null>(null);

const vote = (id: number) => {
    if (id === selectedOption.value) {
        selectedOption.value = null;
        return;
    }
    selectedOption.value = id;
};
const getPercentage = (v: number) => ((v / totalVotes) * 100).toFixed(2);

const betCopy = computed(() => {
    if (!isLoggedIn) return 'Login to Bet';
    if (!selectedOption.value) return 'Select an Option';
    return 'Bet 100 Beans';
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
            <div style="margin-top: 5px">Total Bets: {{ totalVotes }}</div>
            <div
                class="betButton"
                :class="{ disabled: !selectedOption || !isLoggedIn }"
            >
                {{ betCopy }}
            </div>
        </div>
        <div class="footer">
            <div>End Date: {{ props.poll.endDate.toString() }}</div>
            <div>Payout: {{ totalVotes * 80 }} beans</div>
            <div>
                Managed by:
                <a :href="props.poll.creatorId">{{ props.poll.creator }}</a>
            </div>
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
        &.selected {
            background-color: var(--themeColor);
        }
    }
}

.betButton {
    &.disabled {
        opacity: 0.5;
    }
}
</style>
