<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import Bars from './PollBars.vue';
import { useUserStore } from '@/stores/user';
import { useApiStore } from '@/stores/api';
import axios from 'axios';
import { useEconomy } from '@/composables/useEconomy';
import PollDescription from './PollDescription.vue';
import IllegalBlock from './IllegalBlock.vue';
import PollInfo from './PollInfo.vue';
import BeanTotals from './BeanTotals.vue';

const { pollId } = defineProps<{ pollId: string }>();
const { addCommas } = useEconomy();
const apiStore = useApiStore();
const pollRef = computed(() =>
    apiStore.polls.data?.find(poll => poll._id === pollId)
);
const updatePoll = (poll: Poll) => {
    const pollIndex = apiStore.polls.data?.findIndex(
        poll => poll._id === pollId
    );
    if (!pollIndex) return;
    apiStore.polls.data?.splice(pollIndex, 1, poll);
};

const votedOptions = ref<string[]>([]); //locked in votes
const selectedOptions = ref<string[]>([]);
const userStore = useUserStore();
const userId = userStore.user?._id;
const shares = ref(1);
const fixedShares = computed(() => Math.floor(shares.value));

const beans = computed(() => userStore.user?.beans || 0);

const isOwner = computed(
    () =>
        pollRef.value?.creatorName === userStore.user?.name &&
        !pollRef.value?.winner &&
        !pollRef.value?.winners?.length
);
const isPastExpiration = computed(() => {
    if (!pollRef.value) return false;
    return new Date() > new Date(pollRef.value.endDate);
});

const totalPrice = computed(() => {
    if (!pollRef.value) return 0;
    if (!pollRef.value.betPerWager) return pollRef.value.pricePerShare;
    return (selectedOptions.value.length || 1) * pollRef.value.pricePerShare;
});

const isPastSettleDate = computed(() => {
    if (!pollRef.value) return false;
    return (
        new Date() >
        new Date(
            pollRef.value.settleDate
                ? pollRef.value.settleDate.toString()
                : pollRef.value.endDate.toString()
        )
    );
});

const disableOptions = computed(() => {
    if (!pollRef.value || isPastExpiration.value) return true;
    if (pollRef.value.betPerWager || 0 > 1) return false;
    return pollRef.value.options.some(option =>
        option.bettors.includes(userId || '')
    );
});

const canBet = (optId: string) => {
    if (!pollRef.value) return false;
    if (!pollRef.value.betPerWager || pollRef.value.betPerWager < 2) {
        return !disableOptions.value;
    }

    const selectedNotVoted = selectedOptions.value.filter(
        option => !votedOptions.value.includes(option)
    );
    const totalBets = selectedNotVoted.length + votedOptions.value.length;
    if (totalBets < pollRef.value.betPerWager) return true;
    return (
        votedOptions.value.indexOf(optId) > -1 ||
        selectedOptions.value.indexOf(optId) > -1
    );
};

const totalVotes = computed(() => {
    if (!pollRef.value) return 0;
    return pollRef.value.options.reduce((sum, option) => {
        return sum + option.bettors.length;
    }, 0);
});

const selectOption = (id: string) => {
    const betLimit = pollRef.value?.betPerWager || 1;
    selectedOptions.value = selectedOptions.value.includes(id)
        ? selectedOptions.value.filter(option => option !== id)
        : selectedOptions.value.length < betLimit
        ? [...selectedOptions.value, id]
        : selectedOptions.value;
};

const getPercentage = (v: number) => {
    const mostPopularBet = pollRef.value?.options.reduce((a, b) =>
        a.bettors.length > b.bettors.length ? a : b
    ).bettors.length;
    if (!mostPopularBet) return 0;
    return (v / mostPopularBet) * 100;
};

const api = import.meta.env.VITE_API;
async function placeBet() {
    if (!selectedOptions.value.length) return;

    const body = {
        pollId: pollRef.value?._id,
        optionId: undefined as string | undefined,
        optionsArray: undefined as string[] | undefined,
        userId,
        shares: fixedShares.value,
    };

    if (pollRef.value?.betPerWager) body.optionsArray = selectedOptions.value;
    else body.optionId = selectedOptions.value[0];

    try {
        const response = await axios.post(`${api}/polls/bet`, body);
        userStore.updateBeanCount(response.data.newBeanAmt);
        updatePoll(response.data.poll);
    } catch (error) {
        console.error('Error placing bet:', error);
    }
}

onBeforeMount(async () => {
    if (!userId) return;
    pollRef.value?.options.forEach(option => {
        if (!option.bettors.includes(userId)) return;
        votedOptions.value.push(option._id);
        selectedOptions.value.push(option._id);
    });
});
</script>

<template>
    <div
        class="poll"
        v-if="pollRef"
        :class="{ hasWinner: pollRef?.winner || pollRef.winners?.length }"
    >
        <h1>
            {{ pollRef?.title }}
            <span class="wid"
                >WAGER IDENTIFICATION CODE {{ pollRef?._id }}</span
            >
        </h1>
        <div class="details">
            <PollInfo :poll="pollRef" />
            <PollDescription :description="pollRef.description" />
        </div>
        <div class="main">
            <IllegalBlock
                v-if="pollRef.legalStatus && !pollRef.legalStatus.isLegal"
                :lawsBroken="pollRef.legalStatus.lawsBroken || []"
            />
            <div
                class="option"
                v-for="pollOption in pollRef.options"
                :class="{
                    isWinner:
                        pollRef.winner === pollOption._id ||
                        pollRef.winners?.includes(pollOption._id),
                    disabled:
                        pollRef.pricePerShare > beans ||
                        disableOptions ||
                        !canBet(pollOption._id),
                }"
                :key="pollOption._id"
                @click="selectOption(pollOption._id)"
            >
                <div
                    class="selector"
                    :class="{
                        selected: selectedOptions.includes(pollOption._id),
                    }"
                >
                    <span v-if="selectedOptions.includes(pollOption._id)"
                        >🫘</span
                    >
                </div>
                <Bars
                    :key="totalVotes"
                    :percent="getPercentage(pollOption.bettors.length)"
                    :option="pollOption.text"
                    :voters="pollOption.bettors"
                    :pps="pollRef.pricePerShare"
                    :userId="userId || ''"
                />
            </div>
            <BeanTotals :pollRef :isOwner />
            <div v-if="!isPastExpiration" class="betControls">
                <div class="shares" v-if="pollRef.pricePerShare < beans">
                    BUY
                    <input
                        v-model.number="shares"
                        :min="1"
                        :value="fixedShares"
                        :max="beans / totalPrice"
                        type="number"
                        step="1"
                    />
                    SHARES
                </div>
                <div v-if="fixedShares < 1" class="betButton disabled">
                    NO SHARES SELECTED
                </div>
                <div
                    v-else-if="beans < fixedShares * totalPrice"
                    class="betButton noBeans"
                >
                    CANNOT AFFORD BET
                </div>
                <div
                    v-else
                    class="betButton"
                    :class="{
                        disabled: !selectedOptions.length,
                    }"
                    @click="placeBet"
                >
                    BET
                    {{ addCommas(fixedShares * totalPrice)
                    }}{{ votedOptions.length ? ' MORE' : '' }}
                    BEANS
                </div>
            </div>
            <div v-if="isOwner && isPastSettleDate" class="ownerOptions">
                <RouterLink :to="`/bets/settle/${pollRef._id}`"
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
    }
    & > div {
        display: block;
    }

    .main {
        padding: 10px;
        padding-top: 27px;
        border-bottom: 1px solid var(--themeColor);
        position: relative;
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
        &.noBeans {
            animation: none;
            opacity: 0.5;
            cursor: not-allowed;
            border: 1px solid var(--themeColor);
            background-color: transparent;
            color: var(--themeColor);
        }
        &.disabled {
            animation: none;
            opacity: 0.5;
            pointer-events: none;
        }
    }

    .ownerOptions {
        margin-top: 0.5rem;
        & > a {
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
    .betControls {
        margin-top: 0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .shares {
            margin-right: 1em;
            color: white;
            input {
                background: none;
                outline: none;
                border: 0;
                color: var(--themeColor);
                border-bottom: 2px solid var(--themeColor);
                width: 1.125em;
                text-align: center;
                font-size: 1.125em;
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
            }
        }
        .betButton {
            flex: 1;
        }
    }
}

.option.disabled {
    cursor: unset;
    pointer-events: none;
    .selector {
        pointer-events: none;
        border: 1px solid transparent;
    }
}

span.wid {
    display: block;
    font-size: 0.5rem;
    margin-top: 0.25rem;
    text-align: left;
    font-weight: 400;
    color: var(--themeColor);
}
</style>
