<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Bars from './PollBars.vue';
import { useUserStore } from '@/stores/user';
import { useApiStore } from '@/stores/api';
import axios from 'axios';
import { useEconomy } from '@/composables/useEconomy';

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

const selectedOption = ref<string | null>(null);
const userStore = useUserStore();
const userId = userStore.user?._id;
const shares = ref(1);
const fixedShares = computed(() => Math.floor(shares.value));

const beans = computed(() => userStore.user?.beans || 0);

const isOwner = computed(
    () =>
        pollRef.value?.creatorName === userStore.user?.name &&
        !pollRef.value?.winner
);
const isPastExpiration = computed(() => {
    if (!pollRef.value) return false;
    return new Date() > new Date(pollRef.value.endDate);
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

const hasVoted = computed(() => {
    if (!pollRef.value || isPastExpiration.value) return true;
    return pollRef.value.options.some(option =>
        option.bettors.includes(userId || '')
    );
});

const timeLeft = computed(() => {
    if (!pollRef.value) return '';
    const now = new Date();
    const end = new Date(pollRef.value.endDate);
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
    pollRef.value?.options.reduce(
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

const api = import.meta.env.VITE_API;
async function placeBet() {
    if (!selectedOption.value) return;

    try {
        const response = await axios.post(`${api}/polls/bet`, {
            pollId: pollRef.value?._id,
            optionId: selectedOption.value,
            userId,
            shares: fixedShares.value,
        });
        userStore.updateBeanCount(response.data.newBeanAmt);
        updatePoll(response.data.poll);
    } catch (error) {
        console.error('Error placing bet:', error);
    }
}

const selectedOptionData = computed(
    () =>
        pollRef.value?.options.find(
            option => option._id === selectedOption.value
        ) || null
);

const usersShares = computed(
    () =>
        selectedOptionData.value?.bettors.filter(bettor => bettor === userId)
            .length ?? 0
);

const potentialPayout = computed(() => {
    if (!pollRef.value) return 0;
    let jackpot = pollRef.value?.pot || 0;
    const bookieTax = jackpot * 0.05;
    let payout = 0;

    if (pollRef.value.creatorName === userStore.user?.name) {
        payout = bookieTax;
    }

    //how many people voted for the winning option
    const winningOption = pollRef.value.options.find(
        option => option._id === pollRef.value?.winner
    );
    const totalWinningShares = winningOption?.bettors.length || 0;
    if (totalVotes.value === totalWinningShares) {
        payout = 0; //remove bookie tax if everyone voted for the same option
        jackpot = totalWinningShares * pollRef.value.pricePerShare;
    }

    if (
        !selectedOptionData.value ||
        usersShares.value === 0 ||
        (pollRef.value.winner &&
            selectedOptionData.value._id !== pollRef.value.winner)
    ) {
        return addCommas(Math.floor(payout));
    }

    const totalSharesOfWinner = selectedOptionData.value.bettors.length;
    const percentYouOwn = usersShares.value / totalSharesOfWinner;
    payout += (jackpot - bookieTax) * percentYouOwn;

    return addCommas(Math.floor(payout));
});

onMounted(async () => {
    if (!userId) return;
    pollRef.value?.options.forEach(option => {
        if (option.bettors.includes(userId)) {
            selectedOption.value = option._id;
        }
    });
});
</script>

<template>
    <div
        class="poll"
        v-if="pollRef"
        :class="{ hasVoted, hasWinner: pollRef?.winner }"
    >
        <h1>{{ pollRef?.title }}</h1>
        <div class="details">
            <div>
                <div>
                    <span
                        ><strong>BOOKIE:</strong>
                        {{ pollRef.creatorName }}</span
                    >
                    <span
                        ><strong>PPS:</strong>
                        {{ addCommas(pollRef.pricePerShare) }} BEANS</span
                    >
                </div>
                <div class="right">
                    <span
                        ><strong>{{
                            !isPastExpiration
                                ? `BET DEADLINE`
                                : !pollRef.winner
                                ? `SETTLE DATE`
                                : `SETTLED`
                        }}</strong>
                        {{
                            !isPastExpiration
                                ? timeLeft
                                : formatDate(
                                      pollRef.settleDate
                                          ? pollRef.settleDate.toString()
                                          : pollRef.endDate.toString()
                                  )
                        }}</span
                    >
                </div>
            </div>
            <span class="description">
                <pre>{{ pollRef.description }}</pre>
            </span>
        </div>
        <div class="main">
            <div
                class="option"
                v-for="pollOption in pollRef.options"
                :class="{
                    isWinner: pollRef.winner === pollOption._id,
                    noMoney: pollRef.pricePerShare > beans,
                }"
                :key="pollOption._id"
                @click="selectOption(pollOption._id)"
            >
                <div
                    class="selector"
                    :class="{
                        selected: selectedOption === pollOption._id,
                    }"
                >
                    <span v-if="selectedOption === pollOption._id">🫘</span>
                </div>
                <Bars
                    :key="totalVotes"
                    :percent="getPercentage(pollOption.bettors.length)"
                    :option="pollOption.text"
                    :voters="pollOption.bettors"
                    :is-winner="pollRef.winner === pollOption._id"
                    :price-per-share="pollRef.pricePerShare"
                />
            </div>
            <div class="total seed">
                SEED BEANS: {{ addCommas(pollRef.seed || 2000000) }}
            </div>
            <div class="total">TOTAL BEANS: {{ addCommas(pollRef.pot) }}</div>
            <div v-if="usersShares > 0 || isOwner" class="position">
                <div>
                    <strong>POSITION: </strong>
                    {{ addCommas(usersShares * pollRef.pricePerShare) }}
                    BEANS
                </div>
                <div>
                    <strong
                        >{{
                            pollRef.winner ? '' : 'POTENTIAL '
                        }}PAYOUT: </strong
                    >{{ potentialPayout }}
                </div>
            </div>
            <hr v-if="!isPastExpiration || (isOwner && isPastSettleDate)" />
            <div v-if="!isPastExpiration" class="betControls">
                <div class="shares" v-if="pollRef.pricePerShare < beans">
                    BUY
                    <input
                        v-model.number="shares"
                        :min="1"
                        :value="fixedShares"
                        :max="beans / pollRef.pricePerShare"
                        type="number"
                        step="1"
                    />
                    SHARES
                </div>
                <div v-if="fixedShares < 1" class="betButton noBeans">
                    NO SHARES SELECTED
                </div>
                <div
                    v-else-if="beans < pollRef.pricePerShare * shares"
                    class="betButton noBeans"
                >
                    CANNOT AFFORD BET
                </div>
                <div
                    v-else
                    class="betButton"
                    :class="{ disabled: !selectedOption }"
                    @click="placeBet"
                >
                    BET
                    {{ addCommas(fixedShares * pollRef.pricePerShare)
                    }}{{ hasVoted ? ' MORE' : '' }}
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
        .right {
            text-align: right;
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

    hr {
        border: 1px solid var(--themeColor);
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
    .noMoney {
        pointer-events: none;
        .selector {
            border: 1px solid transparent;
        }
    }
    .position {
        display: flex;
        justify-content: space-between;
        font-size: 0.9em;
        font-weight: bold;
        margin-top: 1rem;
        div {
            margin-right: 0.5rem;
            &:last-of-type {
                margin-right: 0;
                text-align: right;
            }
        }
    }
    pre {
        text-wrap: auto;
    }
}
</style>
