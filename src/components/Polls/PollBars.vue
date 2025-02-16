<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    percent: string;
    option: string;
    voters: string[];
}>();

const calcWidth = computed(() => {
    return props.percent + '%';
});
</script>

<template>
    <div class="bar">
        <span>{{ props.option }}</span>
        <span>{{ props.percent }}%</span>
        <div class="shade" :style="{ width: calcWidth }" />
    </div>
</template>

<style lang="scss" scoped>
.bar {
    text-wrap: nowrap;
    width: 100%;
    color: var(--themeColor);
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
    height: 22px;
    font-size: .9em;
    display: inline-flex;
    position: relative;
    flex: 1;
    box-sizing: border-box;
    .shade {
        background-color: var(--themeColor);
        color: black;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        z-index: 1;
        mix-blend-mode: screen;
    }
}
</style>
