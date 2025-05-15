<script setup lang="ts">
import { useApiStore } from '@/stores/api';
import { computed, onMounted } from 'vue';

const apiStore = useApiStore();

//add 0s to single digit numbers
const formatDate = (date: string) => {
    const d = new Date(date);
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(
        d.getDate()
    ).padStart(2, '0')}/${d.getFullYear()}`;
};

const polls = computed(() => {
    const clone = [...apiStore.polls.unsettled.data];
    return clone
        .sort((a, b) => {
            return (
                new Date(a.settleDate || a.endDate).getTime() -
                new Date(b.settleDate || b.endDate).getTime()
            );
        })
        .slice(0, 3);
});

onMounted(() => apiStore.fetchPolls('unsettled', true));
</script>

<template>
    <div class="settling">
        <div class="info">
            <h1>$$$ WAGERS SETTLING SOON $$$</h1>
            <div>
                <template v-if="polls.length">
                    <template v-for="poll in polls" :key="poll._id">
                        <strong>{{ poll.title.trim().toUpperCase() }}:</strong>
                        {{ formatDate(poll.settleDate?.toString() || '') }}
                        ||
                    </template>
                    <template v-for="poll in polls" :key="poll._id">
                        <strong>{{ poll.title.trim().toUpperCase() }}:</strong>
                        {{ formatDate(poll.settleDate?.toString() || '') }}
                        ||
                    </template>
                </template>
                <template v-else>{{ 'loading || '.repeat(20) }}</template>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.settling {
    margin: 0 0 1em 0;
    background-color: var(--themeColor);
    color: black !important;
    overflow: hidden;
    box-sizing: border-box;
    * {
        box-sizing: border-box;
    }
    .info {
        width: 100%;
        h1 {
            margin-bottom: 0em;
            text-align: left;
            font-size: 0.8rem;
            color: black !important;
            padding-top: 0.25em;
            padding-left: 0.25em;
            border-bottom: 2px solid black;
        }
        div {
            padding: 0.25em 0;
            white-space: nowrap;
            animation: scroll 15s linear infinite;
            width: fit-content;
            min-width: 200%;
        }
    }
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
</style>
