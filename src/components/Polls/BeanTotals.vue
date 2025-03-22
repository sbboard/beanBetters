<script setup lang="ts">
import { useEconomy } from '@/composables/useEconomy';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const { pollRef, isOwner } = defineProps<{
    pollRef: Poll;
    isOwner: boolean;
}>();

const { addCommas } = useEconomy();
const userStore = useUserStore();

const selectedOptions = computed(() => {
    if (!userStore.user || !userStore.user._id) return [];
    return pollRef.options.filter(option =>
        option.bettors.includes(userStore.user!._id)
    );
});

const usersShares = computed(() =>
    selectedOptions.value.reduce(
        (shares, option) =>
            shares +
            option.bettors.filter(id => id === userStore.user?._id).length,
        0
    )
);

const potentialPayout = computed(() => {
    const userId = userStore.user?._id;
    if (!pollRef || !userId) return 0;

    const bookieTax = pollRef.pot * 0.05;
    let payout = pollRef.creatorName === userStore.user?.name ? bookieTax : 0;

    if (!selectedOptions.value.length) return addCommas(Math.floor(payout));

    // Determine winning options (assume user's options win if no winner exists)
    const assumedWinningOptions = pollRef.winner
        ? [pollRef.winner]
        : selectedOptions.value.map(option => option._id);

    // Check if user bet on a losing option
    const votedForLosingOption = pollRef.options.some(
        option =>
            option.bettors.includes(userId) &&
            !assumedWinningOptions.includes(option._id)
    );
    if (votedForLosingOption) return addCommas(Math.floor(payout));

    // User bet on the assumed winning option
    const totalShares = selectedOptions.value.reduce(
        (shares, option) => shares + option.bettors.length,
        0
    );
    let percentYouOwn = usersShares.value / totalShares;

    if (pollRef.betPerWager && pollRef.betPerWager > 1) {
        const totalSharesPerBettor = new Map();

        pollRef.options.forEach(option => {
            option.bettors.forEach(id => {
                totalSharesPerBettor.set(
                    id,
                    (totalSharesPerBettor.get(id) || 0) + 1
                );
            });
        });

        const winningSharesPerBettor = new Map();
        totalSharesPerBettor.forEach((shares, id) => {
            if (
                pollRef.options.some(
                    option =>
                        assumedWinningOptions.includes(option._id) &&
                        option.bettors.includes(id)
                )
            ) {
                winningSharesPerBettor.set(id, shares);
            }
        });

        const totalWinningShares = [...winningSharesPerBettor.values()].reduce(
            (sum, shares) => sum + shares,
            0
        );
        percentYouOwn =
            (winningSharesPerBettor.get(userId) || 0) / totalWinningShares;
    }

    payout += (pollRef.pot - bookieTax) * percentYouOwn;

    return addCommas(Math.floor(payout));
});
</script>

<template>
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
        <div v-if="!pollRef.winner || !pollRef.betPerWager">
            <strong>{{ pollRef.winner ? '' : 'POTENTIAL ' }}PAYOUT: </strong
            >{{ potentialPayout }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.total {
    text-align: right;
    font-size: 0.9em;
    margin-top: 5px;
    font-weight: 600;
    &.seed {
        color: var(--themeColor);
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
</style>
