<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    percent: string;
    option: string;
    voters: User[];
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
    background-color: var(--black);
    text-wrap: nowrap;
    width: 100%;
    color: var(--black);
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
    height: 20px;
    display: inline-flex;
    position: relative;
    flex: 1;
    .shade {
        background-color: var(--themeColor);
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        z-index: 1;
        mix-blend-mode: screen;
    }
}
</style>
