<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const { percent, option, isWinner } = defineProps<{
    percent: number;
    option: string;
    voters: string[];
    isWinner?: boolean;
}>();

const darkInnerWidth = ref(0);
const optionInnerWidths = ref<number>(0);
const baseLayer = ref<HTMLDivElement | null>(null);

function calculateBars() {
    if (!baseLayer.value) return;
    const width = baseLayer.value.getBoundingClientRect().width;
    darkInnerWidth.value = width;
    optionInnerWidths.value = width * (percent / 100);
}

onMounted(() => {
    calculateBars();
    addEventListener('resize', calculateBars);
});

onUnmounted(() => {
    removeEventListener('resize', calculateBars);
});
</script>

<template>
    <div class="barWrap">
        <div class="light-layer" ref="baseLayer">
            <div class="title">{{ option }} {{ isWinner ? '★' : null }}</div>
            <div class="percentage">{{ parseFloat(percent.toFixed(2)) }}%</div>
        </div>
        <div class="dark-layer" :style="{ width: `${optionInnerWidths}px` }">
            <div class="inner" :style="{ width: `${darkInnerWidth}px` }">
                <div class="title">
                    {{ option }} {{ isWinner ? '★' : null }}
                </div>
                <div class="percentage">
                    {{ parseFloat(percent.toFixed(2)) }}%
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
    .light-layer {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        background-color: transparent;
        > * {
            position: absolute;
            font-weight: 600;
        }
        .title {
            left: 6px;
        }
        .percentage {
            right: 6px;
        }
    }
    .dark-layer {
        height: 100%;
        position: absolute;
        top: 0;
        overflow: hidden;
        .inner {
            height: 100%;
            display: flex;
            align-items: center;
            position: relative;
            background-color: var(--themeColor);
            color: black;
            > * {
                position: absolute;
                font-weight: 600;
            }
            .title {
                left: 6px;
            }
            .percentage {
                right: 6px;
            }
        }
    }
}
</style>
