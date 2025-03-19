<script setup lang="ts">
import { useEconomy } from '@/composables/useEconomy';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref } from 'vue';

const { pollRef, isOwner, totalVotes } = defineProps<{
    pollRef: Poll;
    isOwner: boolean;
    totalVotes: number;
}>();

const { addCommas } = useEconomy();
const userStore = useUserStore();

const userId = userStore.user?._id;
const selectedOption = ref<string | null>(null);

const selectedOptionData = computed(
    () =>
        pollRef.options.find(option => option._id === selectedOption.value) ||
        null
);

const usersShares = computed(
    () =>
        selectedOptionData.value?.bettors.filter(bettor => bettor === userId)
            .length ?? 0
);

const potentialPayout = computed(() => {
    if (!pollRef) return 0;
    let jackpot = pollRef.pot || 0;
    const bookieTax = jackpot * 0.05;
    let payout = 0;

    if (pollRef.creatorName === userStore.user?.name) payout = bookieTax;

    //how many people voted for the winning option
    const winningOption = pollRef.options.find(
        option => option._id === pollRef.winner
    );
    const totalWinningShares = winningOption?.bettors.length || 0;
    if (totalVotes === totalWinningShares) {
        payout = 0; //remove bookie tax if everyone voted for the same option
        jackpot = totalWinningShares * pollRef.pricePerShare;
    }

    if (
        !selectedOptionData.value ||
        usersShares.value === 0 ||
        (pollRef.winner && selectedOptionData.value._id !== pollRef.winner)
    ) {
        return addCommas(Math.floor(payout));
    }

    const totalSharesOfWinner = selectedOptionData.value.bettors.length;
    const percentYouOwn = usersShares.value / totalSharesOfWinner;
    payout += (jackpot - bookieTax) * percentYouOwn;

    return addCommas(Math.floor(payout));
});

onMounted(async () => {
    pollRef.options.forEach(option => {
        if (!option.bettors.includes(userId!)) return;
        selectedOption.value = option._id;
    });
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
        <div>
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
