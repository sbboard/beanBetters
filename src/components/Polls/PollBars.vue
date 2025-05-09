<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useEconomy } from '@/composables/useEconomy';

const { addCommas } = useEconomy();

const { percent, option, pps, voters, userId, hideBeanCount } = defineProps<{
    percent: number;
    option: string;
    voters: string[];
    pps: number;
    userId: string;
    hideBeanCount?: boolean;
}>();

const darkInnerWidth = ref('0px');
const optionInnerWidths = ref('0px');
const baseLayer = ref<HTMLDivElement | null>(null);

const percentOwned = computed(() => {
    if (voters.length === 0) return '0%';
    const userVotes = voters.filter(voter => voter === userId);
    if (userVotes.length === 0) return '0%';
    return (userVotes.length / voters.length) * 100 + '%';
});

const shadedBg = computed(() => {
    return `background: linear-gradient(90deg, rgb(255 188 0) ${percentOwned.value}, #daff3c ${percentOwned.value});`;
});

function calculateBars() {
    if (!baseLayer.value) return;
    let changed = false;
    const width = baseLayer.value.getBoundingClientRect().width;
    if (width + 'px' !== darkInnerWidth.value) changed = true;
    darkInnerWidth.value = width + 'px';
    optionInnerWidths.value = width * (percent / 100) + 'px';
    if (changed) requestAnimationFrame(() => calculateBars());
}

const beanCopy = () => {
    return `BEANS: ${addCommas(Math.floor(voters.length * pps))}`;
};

onMounted(() => {
    addEventListener('resize', calculateBars);
    requestAnimationFrame(() => calculateBars());
});

onUnmounted(() => {
    removeEventListener('resize', calculateBars);
});
</script>

<template>
    <div class="barWrap" :class="{ hideBeanCount }">
        <div class="light-layer" ref="baseLayer">
            <div class="title">{{ option }}</div>
            <div class="percentage" v-if="!hideBeanCount">{{ beanCopy() }}</div>
        </div>
        <div class="dark-layer" :style="shadedBg">
            <div class="inner">
                <div class="title">{{ option }}</div>
                <div class="percentage" v-if="!hideBeanCount">
                    {{ beanCopy() }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.barWrap {
    width: 100%;
    position: relative;
    font-size: 0.9em;
    margin-left: 0.5em;
    color: var(--themeColor);
    &.hideBeanCount {
        margin-left: 0;
        .title {
            width: 100%;
        }
    }
    .light-layer {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        background-color: transparent;
        justify-content: space-between;
        .title {
            margin-left: 6px;
        }
        > * {
            font-weight: 600;
        }
    }
    .dark-layer {
        height: 100%;
        position: absolute;
        top: 0;
        overflow: hidden;
        width: v-bind(optionInnerWidths);
        .inner {
            height: 100%;
            display: flex;
            align-items: center;
            position: relative;
            color: black;
            width: v-bind(darkInnerWidth);
            > * {
                position: absolute;
                font-weight: 600;
            }
        }
        .title {
            left: 6px;
        }
    }
    .percentage {
        right: 0px;
    }
}

@media (max-width: 700px) {
    .percentage {
        display: none;
    }
}
</style>
