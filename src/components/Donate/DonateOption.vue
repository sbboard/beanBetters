<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import Bars from '../../components/Polls/PollBars.vue';
import { computed } from 'vue';
import { useEconomy } from '@/composables/useEconomy';

const userStore = useUserStore();

const { option, poll, betFunction } = defineProps<{
    option: PollOption;
    poll: Poll;
    betFunction: (optionId: string) => void;
}>();

const { addCommas } = useEconomy();

const disableDonating = computed(() => {
    const sharesNeeded = poll.seed! / poll.pricePerShare;
    const userShares = option.bettors.filter(
        bettor => bettor === userStore.user?._id
    ).length;
    if (userShares >= sharesNeeded / 2) return 'DONATION LIMIT REACHED';
    if (option.bettors.length * poll.pricePerShare >= poll.seed!) {
        return 'FUNDED!';
    }
    if ((userStore.user?.beans || 0) < poll.pricePerShare) {
        return 'TOO POOR TO DONATE';
    }
    if ((userStore.user?.debt || 0) > 0) return 'CANNOT DONATE WITH DEBT';
    return '';
});

const fundedAmt = computed(() => {
    return option.bettors.length * poll.pricePerShare;
});
</script>

<template>
    <div class="singleOption">
        <div class="imgWrap">
            <img :src="`/assets/features/${option._id}.jpg`" />
        </div>
        <h1>{{ option.text }}</h1>
        <Bars
            v-if="userStore.user"
            style="
                border: 1px solid var(--themeColor);
                padding: 0.25em 0;
                margin-top: auto;
            "
            :key="fundedAmt"
            :percent="(fundedAmt / poll.seed!) * 100"
            :option="`
                ${addCommas(option.bettors.length * poll.pricePerShare)}
                BEANS RAISED`"
            :voters="[]"
            :pps="poll.pricePerShare || 0"
            :userId="userStore.user._id"
            :hideBeanCount="true"
        />
        <div
            class="betButton"
            @click="betFunction(option._id)"
            :class="{ disabled: disableDonating }"
        >
            {{
                disableDonating ||
                `DONATE ${addCommas(poll.pricePerShare)} BEANS`
            }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.singleOption {
    padding: 0 1em;
    display: flex;
    flex-direction: column;
    .imgWrap {
        border: 2px solid var(--themeColor);
        border-radius: 50%;
        max-width: 80%;
        overflow: hidden;
        margin: 0 auto;
        margin-bottom: 1rem;
        img {
            width: 100%;
            display: block;
            filter: sepia(1) hue-rotate(33deg) saturate(2) contrast(1.25);
        }
    }
}
h1 {
    font-size: 1em;
    margin-bottom: 0.5em;
}
.betButton {
    margin-top: .5em;
    cursor: pointer;
    display: block;
    background-color: var(--themeColor);
    color: black;
    padding: 0.5em;
    text-align: center;
    font-weight: bold;
    width: 100%;
    box-sizing: border-box;
    user-select: none;
    &.disabled {
        animation: none;
        opacity: 0.5;
        cursor: not-allowed;
        border: 1px solid var(--themeColor);
        background-color: transparent;
        color: var(--themeColor);
        pointer-events: none;
    }
}

.shares {
    color: white;
    width: 100%;
    text-align: center;
    input {
        background: none;
        outline: none;
        border: 0;
        color: var(--themeColor);
        border-bottom: 2px solid var(--themeColor);
        width: 4em;
        text-align: center;
        font-size: 1.125em;
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }
}
</style>
