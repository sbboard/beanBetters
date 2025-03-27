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

    const assumedWinningOptions = pollRef.winner
        ? [pollRef.winner]
        : selectedOptions.value.map(option => option._id);

    const losingOptionIds = pollRef.options
        .filter(opt => !assumedWinningOptions.includes(opt._id.toString()))
        .map(opt => opt._id.toString());
    const losingBettors = pollRef.options
        .filter(opt => losingOptionIds.includes(opt._id.toString()))
        .flatMap(opt => opt.bettors);

    if (losingBettors.includes(userId)) return addCommas(Math.floor(payout));

    const totalShares = selectedOptions.value.reduce(
        (shares, option) => shares + option.bettors.length,
        0
    );
    let percentYouOwn = usersShares.value / totalShares;

    if (pollRef.betPerWager && pollRef.betPerWager > 1) {
        const winningVoters = pollRef.options.filter(opt =>
            assumedWinningOptions.includes(opt._id.toString())
        );

        const winningVotersNoLosses = winningVoters.map(opt => {
            return opt.bettors.filter(
                bettor => !losingBettors.includes(bettor)
            );
        });

        const winsPerWinner: Record<string, number> = {};
        [...new Set(winningVotersNoLosses.flat())].forEach(winner => {
            winsPerWinner[winner] = winningVotersNoLosses.filter(arr =>
                arr.includes(winner)
            ).length;
        });

        const winnersWithMostWins = winningVoters
            .map(opt =>
                opt.bettors.filter(bettor =>
                    Object.keys(winsPerWinner)
                        .filter(
                            winner =>
                                winsPerWinner[winner] ===
                                Math.max(...Object.values(winsPerWinner))
                        )
                        .includes(bettor)
                )
            )
            .flat();

        percentYouOwn = winnersWithMostWins.includes(userId)
            ? usersShares.value / winnersWithMostWins.length
            : 0;
    }

    payout += (pollRef.pot - bookieTax) * percentYouOwn;

    return addCommas(Math.floor(payout));
});

const uniqueBettors = computed(() => {
    return pollRef.options
        .map(option => option.bettors)
        .flat()
        .filter((v, i, a) => a.indexOf(v) === i).length;
});
</script>

<template>
    <div class="total seed">
        <span></span>
        <span>SEED BEANS: {{ addCommas(pollRef.seed || 2000000) }}</span>
    </div>
    <div class="total">
        <span>TOTAL BETTORS: {{ uniqueBettors }}</span>
        <span>TOTAL BEANS: {{ addCommas(pollRef.pot) }}</span>
    </div>

    <hr v-if="!isPastExpiration || (isOwner && isPastSettleDate)" />
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
    display: flex;
    justify-content: space-between;
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
    margin-top: 10px;
    div {
        margin-right: 0.5rem;
        &:last-of-type {
            margin-right: 0;
            text-align: right;
        }
    }
}

hr {
    border: 1px solid var(--themeColor);
    width: calc(100% + 18px);
    margin-left: -10px;
}
</style>
