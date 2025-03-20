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
    let payout = 0;

    if (pollRef.creatorName === userStore.user?.name) payout = bookieTax;

    const losingOptions = pollRef.options.filter(
        option =>
            (pollRef.winner && option._id !== pollRef.winner) ||
            !option.bettors.includes(userId)
    );
    const votedForLosingOption = losingOptions.some(option =>
        option.bettors.includes(userId)
    );
    if (votedForLosingOption) return addCommas(Math.floor(payout));

    //////////////////////////////////////////////////////////
    //BELOW IS ASSUMING USER VOTED FOR WINNING OPTION
    //////////////////////////////////////////////////////////
    //payout += (pollRef.seed || 0) - bookieTax;

    const lostBeans =
        losingOptions.reduce(
            (shares, option) => shares + option.bettors.length,
            0
        ) * pollRef.pricePerShare;

    const totalSharesOfSelectedPolls = selectedOptions.value.reduce(
        (shares, option) => shares + option.bettors.length,
        0
    );
    let percentYouOwn = usersShares.value / totalSharesOfSelectedPolls;
    if (pollRef.betPerWager) percentYouOwn = 1;

    payout += (lostBeans + pollRef.seed! - bookieTax) * percentYouOwn;

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
            <strong
                >{{
                    pollRef.winner
                        ? ''
                        : pollRef.betPerWager
                        ? 'MAX '
                        : 'POTENTIAL '
                }}PAYOUT: </strong
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
