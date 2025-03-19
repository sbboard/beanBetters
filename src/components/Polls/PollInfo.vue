<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useEconomy } from '@/composables/useEconomy';

const { poll } = defineProps<{ poll: Poll }>();
const { addCommas } = useEconomy();

const selectedOption = ref<string | null>(null);
const userStore = useUserStore();
const userId = userStore.user?._id;

const isPastExpiration = computed(() => {
    if (!poll) return false;
    return new Date() > new Date(poll.endDate);
});

const timeLeft = computed(() => {
    if (!poll) return '';
    const now = new Date();
    const end = new Date(poll.endDate);
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

const settleCopy = computed(() => {
    if (!poll) return '';
    if (poll.legalStatus?.isLegal === false) return 'SHUT DOWN';
    if (!isPastExpiration.value) return 'BET DEADLINE';
    if (!poll.winner) return 'SETTLE DATE';
    return 'SETTLED';
});

onMounted(async () => {
    if (!userId) return;
    poll.options.forEach(option => {
        if (option.bettors.includes(userId)) {
            selectedOption.value = option._id;
        }
    });
});
</script>

<template>
    <div class="pollInfo">
        <div>
            <span><strong>BOOKIE:</strong> {{ poll.creatorName }}</span>
            <span
                ><strong>{{
                    !poll.betPerWager || poll.betPerWager < 2
                        ? 'Single Bet'
                        : 'Multi-Bet: ' + poll.betPerWager
                }}</strong></span
            >
        </div>
        <div class="right">
            <span
                ><strong>{{ settleCopy }}</strong>
                {{
                    !isPastExpiration
                        ? timeLeft
                        : formatDate(
                              poll.settleDate
                                  ? poll.settleDate.toString()
                                  : poll.endDate.toString()
                          )
                }}
            </span>
            <span
                ><strong>PPS:</strong>
                {{ addCommas(poll.pricePerShare) }} BEANS</span
            >
        </div>
    </div>
</template>

<style lang="scss" scoped>
.pollInfo {
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
</style>
