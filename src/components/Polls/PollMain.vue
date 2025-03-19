<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Bars from './PollBars.vue';
import { useUserStore } from '@/stores/user';
import { useApiStore } from '@/stores/api';
import axios from 'axios';
import { useEconomy } from '@/composables/useEconomy';
import PollDescription from './PollDescription.vue';
import IllegalBlock from './IllegalBlock.vue';
import PollInfo from './PollInfo.vue';
import BeanMath from './BeanMath.vue';

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
        <h1>
            {{ pollRef?.title }}
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
            <BeanMath :pollRef :isOwner :totalVotes />
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
            <span class="wid"
                >WAGER IDENTIFICATION CODE {{ pollRef?._id }}</span
            >
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
}

span.wid {
    display: block;
    font-size: 0.5em;
    margin-top: 0.5rem;
    text-align: right;
    color: var(--themeColor);
}
</style>
