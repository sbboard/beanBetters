<script setup lang="ts">
import { useEconomy } from '@/composables/useEconomy';
import { useUserStore } from '@/stores/user';
import { computed, type ComputedRef } from 'vue';

const { pollRef, isOwner } = defineProps<{
    pollRef: Poll;
    isOwner: boolean;
}>();

const { addCommas } = useEconomy();
const userStore = useUserStore();
const currentUserId = userStore.user!._id;
const uniqueBettors = computed(
    () =>
        pollRef.options
            .map(option => option.bettors)
            .flat()
            .filter((v, i, a) => a.indexOf(v) === i).length
);

const selectedOptions = (userId: string) =>
    pollRef.options.filter(option => option.bettors.includes(userId));

const usersShares = (userId: string) =>
    selectedOptions(userId).reduce(
        (shares, option) =>
            shares + option.bettors.filter(id => id === userId).length,
        0
    );

const winningOptions = computed(() => {
    const winningIds = pollRef.winners?.length
        ? pollRef.winners
        : selectedOptions(currentUserId).map(option => option._id);

    return pollRef.options.filter(opt =>
        winningIds.includes(opt._id.toString())
    );
});

interface WinnerScores {
    name: string;
    beans: string;
}

const winnerScores: ComputedRef<WinnerScores[]> = computed(() => {
    const bettors: string[] = [];
    const winnerValues: WinnerScores[] = [];
    pollRef.options.forEach(opt => {
        opt.bettors.forEach(bettor => {
            if (bettor === 'dupe') return;
            if (!bettors.includes(bettor)) bettors.push(bettor);
        });
    });
    bettors.forEach(bettor => {
        let displayName = bettor;
        if (bettor === currentUserId) displayName = userStore.user?.name || '';
        winnerValues.push({
            name: displayName,
            beans: calculatePayout(bettor, true),
        });
    });
    //sort by bean amount
    return winnerValues.sort((a, b) => {
        return (
            parseInt(b.beans.replaceAll(',', '')) -
            parseInt(a.beans.replaceAll(',', ''))
        );
    });
});

const calculatePayout = (userId: string, net = false) => {
    const { pot, creatorName } = pollRef;

    // Add bookie tax
    const bookieTax = pot * 0.05;
    let displayName = userId;
    if (userId === currentUserId) displayName = userStore.user?.name || '';
    let payout = creatorName === displayName ? bookieTax : 0;

    const optWithBets = winningOptions.value.filter(o => o.bettors.length > 0);
    const beansPerBet = (pot - bookieTax) / optWithBets.length;

    optWithBets.forEach(o => {
        const ts = o.bettors.length; // total shares
        const yourShares = o.bettors.filter(i => i === userId).length / ts;
        payout += beansPerBet * yourShares;
    });

    const sharesOwned = usersShares(userId);
    if (net) {
        payout -= sharesOwned * pollRef.pricePerShare;
    }

    return addCommas(Math.floor(payout));
};
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

    <hr v-if="usersShares(currentUserId) > 0 || isOwner" />
    <div v-if="usersShares(currentUserId) > 0 || isOwner" class="position">
        <div>
            <strong>POSITION: </strong>
            {{ addCommas(usersShares(currentUserId) * pollRef.pricePerShare) }}
            BEANS
        </div>
        <div>
            <strong
                >{{
                    pollRef.winners?.length ? '' : 'POTENTIAL '
                }}PAYOUT: </strong
            >{{ calculatePayout(currentUserId) }}
        </div>
    </div>
    <div v-if="pollRef.winners?.length" class="winners">
        <div>
            <strong>NET WINNINGS: </strong>
            <span v-for="(winner, i) in winnerScores" :key="winner.name">
                <strong>{{ winner.name }}</strong> ({{ winner.beans }})
                <template v-if="i < winnerScores.length - 1"> // </template>
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.winners {
    font-size: 0.9em;
    & > div {
        margin-top: 10px;
    }
}
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
