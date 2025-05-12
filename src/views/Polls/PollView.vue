<script setup lang="ts">
import Poll from '@/components/Polls/PollMain.vue';
import { computed, onMounted, ref, type Ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { PRICE_OF_WAGER } from '@/composables/useEconomy';
import { useApiStore } from '@/stores/api';
const userStore = useUserStore();
const currentFilter: Ref<'open' | 'unsettled' | 'completed'> = ref('open');

const apiStore = useApiStore();

const changeFilter = (filter: 'open' | 'unsettled' | 'completed') => {
    apiStore.fetchPolls(filter);
    currentFilter.value = filter;
};

const beans = computed(() => userStore.user?.beans || 0);
const openPolls = computed(() => apiStore.polls.open);
const unsettledPolls = computed(() => apiStore.polls.unsettled);
const completedPolls = computed(() => apiStore.polls.completed);

const filteredPolls = computed(() => {
    let filter: Poll[] = [];
    switch (currentFilter.value) {
        case 'open':
            filter = openPolls.value.data;
            break;
        case 'unsettled':
            filter = unsettledPolls.value.data;
            break;
        case 'completed':
            filter = completedPolls.value.data;
            break;
        default:
            filter = [];
    }
    if (currentFilter.value === 'unsettled') {
        return filter.sort((a, b) => {
            return (
                new Date(a.settleDate || a.endDate).getTime() -
                new Date(b.settleDate || b.endDate).getTime()
            );
        });
    }
    if (currentFilter.value === 'completed') {
        return filter.sort((a, b) => {
            return (
                new Date(b.settleDate || b.endDate).getTime() -
                new Date(a.settleDate || a.endDate).getTime()
            );
        });
    }
    return filter.sort((a, b) => {
        if (a.winners.length && !b.winners.length) return 1;
        if (!a.winners.length && b.winners.length) return -1;
        return 0;
    });
});

onMounted(() => apiStore.fetchPolls('open'));
</script>

<template>
    <div>
        <RouterLink
            v-if="
                beans >= PRICE_OF_WAGER && userStore.checkItem('bookie license')
            "
            to="/bets/create"
            :title="'Create a new wager'"
            >$$CREATE NEW WAGER$$</RouterLink
        >
        <div class="menu">
            <span
                :class="{ selected: currentFilter === 'open' }"
                @click="changeFilter('open')"
                @mouseover="() => apiStore.fetchPolls('open')"
                >OPEN</span
            >
            <span
                :class="{ selected: currentFilter === 'unsettled' }"
                @click="changeFilter('unsettled')"
                @mouseover="() => apiStore.fetchPolls('unsettled')"
                >UNSETTLED</span
            >
            <span
                :class="{ selected: currentFilter === 'completed' }"
                @click="changeFilter('completed')"
                @mouseover="() => apiStore.fetchPolls('completed')"
                >COMPLETED</span
            >
        </div>
        <template v-if="filteredPolls && filteredPolls.length">
            <Poll
                :key="poll._id"
                v-for="poll in filteredPolls"
                :pollId="poll._id"
                :currentFilter
        /></template>
        <div v-else>Loading {{ currentFilter }} wagers</div>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    border: 1px solid var(--themeColor);
    margin-bottom: 0.5em;
    display: flex;
    span {
        display: block;
        flex: 1;
        text-align: center;
        padding: 0.5em;
        cursor: pointer;
        border-right: 1px solid var(--themeColor);
        font-weight: bold;
        color: var(--themeColor);
        &.selected {
            background-color: var(--themeColor);
            color: black;
        }
        &:last-child {
            border-right: none;
        }
    }
}
a {
    margin: 0 auto 20px auto;
    display: block;
    width: fit-content;
    font-size: 1.5em;
}
</style>
