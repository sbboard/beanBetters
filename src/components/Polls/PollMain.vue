<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Bars from './PollBars.vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { addCommas } from '@/composables/useEconomy';

const { poll } = defineProps<{ poll: Poll }>();
const virtualPoll = ref(poll);

const selectedOption = ref<string | null>(null);
const userStore = useUserStore();
const userId = userStore.user?._id;
const shares = ref(1);

const beans = computed(() => userStore.user?.beans || 0);

const isOwner = computed(
    () => virtualPoll.value.creatorId === userId && !virtualPoll.value.winner
);
const isPastExpiration = computed(
    () => new Date() > new Date(virtualPoll.value.endDate)
);

const isPastSettleDate = computed(
    () =>
        new Date() >
        new Date(
            virtualPoll.value.settleDate
                ? virtualPoll.value.settleDate.toString()
                : virtualPoll.value.endDate.toString()
        )
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

async function placeBet() {
    if (!selectedOption.value) return;

    try {
        const response = await axios.post(
            'https://www.gang-fight.com/api/beans/polls/bet',
            {
                pollId: virtualPoll.value._id,
                optionId: selectedOption.value,
                userId,
                shares: shares.value,
            }
        );
        userStore.updateBeanCount(response.data.newBeanAmt);
        virtualPoll.value = response.data.poll;
        hasVoted.value = true; // Mark user as having voted
    } catch (error) {
        console.error('Error placing bet:', error);
    }
}

const selectedOptionData = computed(
    () =>
        virtualPoll.value.options.find(
            option => option._id === selectedOption.value
        ) || null
);

const usersShares = computed(
    () =>
        selectedOptionData.value?.bettors.filter(bettor => bettor === userId)
            .length ?? 0
);

const potentialPayout = computed(() => {
    let jackpot = virtualPoll.value.pot;
    const bookieTax = jackpot * 0.05;
    let payout = 0;

    if (virtualPoll.value.creatorId === userId) {
        payout = bookieTax;
    }

    //how many people voted for the winning option
    const winningOption = virtualPoll.value.options.find(
        option => option._id === virtualPoll.value.winner
    );
    const totalWinningShares = winningOption?.bettors.length || 0;
    if (totalVotes.value === totalWinningShares) {
        payout = 0; //remove bookie tax if everyone voted for the same option
        jackpot = totalWinningShares * virtualPoll.value.pricePerShare;
    }

    if (
        !selectedOptionData.value ||
        usersShares.value === 0 ||
        (virtualPoll.value.winner &&
            selectedOptionData.value._id !== virtualPoll.value.winner)
    ) {
        console.log(virtualPoll.value.title);
        return addCommas(Math.floor(payout));
    }

    const totalSharesOfWinner = selectedOptionData.value.bettors.length;
    const percentYouOwn = usersShares.value / totalSharesOfWinner;
    payout += (jackpot - bookieTax) * percentYouOwn;

    return addCommas(Math.floor(payout));
});

onMounted(async () => {
    if (!userId) return;
    virtualPoll.value.options.forEach(option => {
        if (option.bettors.includes(userId)) {
            selectedOption.value = option._id;
            hasVoted.value = true;
        }
    });
});
</script>

<template>
    <div class="poll" :class="{ hasVoted, hasWinner: virtualPoll.winner }">
        <h1>{{ virtualPoll.title }}</h1>
        <div class="details">
            <div>
                <div>
                    <span
                        ><strong>BOOKIE:</strong>
                        {{ virtualPoll.creatorName }}</span
                    >
                    <span
                        ><strong>PPS:</strong>
                        {{ addCommas(virtualPoll.pricePerShare) }} BEANS</span
                    >
                </div>
                <div class="right">
                    <span
                        ><strong>{{
                            !isPastExpiration
                                ? `BET DEADLINE`
                                : !virtualPoll.winner
                                ? `SETTLE DATE`
                                : `SETTLED`
                        }}</strong>
                        {{
                            !isPastExpiration
                                ? timeLeft
                                : formatDate(
                                      virtualPoll.settleDate
                                          ? virtualPoll.settleDate.toString()
                                          : virtualPoll.endDate.toString()
                                  )
                        }}</span
                    >
                </div>
            </div>
            <span class="description">
                <pre>{{ virtualPoll.description }}</pre>
            </span>
        </div>
        <div class="main">
            <div
                class="option"
                v-for="pollOption in virtualPoll.options"
                :class="{
                    isWinner: virtualPoll.winner === pollOption._id,
                    noMoney: virtualPoll.pricePerShare > beans,
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
                    :is-winner="virtualPoll.winner === pollOption._id"
                    :price-per-share="virtualPoll.pricePerShare"
                />
            </div>
            <div class="total seed">
                SEED BEANS: {{ addCommas(virtualPoll.seed || 2000000) }}
            </div>
            <div class="total">
                TOTAL BEANS: {{ addCommas(virtualPoll.pot) }}
            </div>
            <div v-if="usersShares > 0 || isOwner" class="position">
                <div>
                    <strong>POSITION: </strong>
                    {{ addCommas(usersShares * virtualPoll.pricePerShare) }}
                    BEANS
                </div>
                <div>
                    <strong
                        >{{
                            virtualPoll.winner ? '' : 'POTENTIAL '
                        }}PAYOUT: </strong
                    >{{ potentialPayout }}
                </div>
            </div>
            <hr v-if="!isPastExpiration || (isOwner && isPastSettleDate)" />
            <div v-if="!isPastExpiration" class="betControls">
                <div class="shares" v-if="virtualPoll.pricePerShare < beans">
                    BUY
                    <input
                        v-model="shares"
                        value="1"
                        min="1"
                        :max="beans / virtualPoll.pricePerShare"
                        type="number"
                    />
                    SHARES
                </div>
                <div v-if="shares < 1" class="betButton noBeans">
                    NO SHARES SELECTED
                </div>
                <div
                    v-else-if="beans < virtualPoll.pricePerShare * shares"
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
                    {{ addCommas(shares * virtualPoll.pricePerShare)
                    }}{{ hasVoted ? ' MORE' : '' }}
                    BEANS NOW !!!!!!
                </div>
            </div>
            <div v-if="isOwner && isPastSettleDate" class="ownerOptions">
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
