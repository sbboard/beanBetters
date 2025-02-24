<script setup lang="ts">
import Poll from '@/components/Polls/PollMain.vue';
import { computed, onMounted, ref } from 'vue';
import { getAllPolls } from '@/composables/usePolls';
import { useUserStore } from '@/stores/user';
import { PRICE_OF_WAGER } from '@/composables/useEconomy';
const userStore = useUserStore();
const currentFilter = ref('open');

const changeFilter = (filter: string) => {
    currentFilter.value = filter;
};

const beans = computed(() => userStore.user?.beans || 0);

const polls = ref<Poll[] | null>(null);

const filteredPolls = computed(() => {
    if (!polls.value) return null;
    const now = new Date();
    const filter = polls.value.filter(poll => {
        if (currentFilter.value === 'open')
            return !poll.winner && new Date(poll.endDate) > now;
        if (currentFilter.value === 'unsettled')
            return !poll.winner && new Date(poll.endDate) <= now;
        if (currentFilter.value === 'completed') return poll.winner;
        return false;
    });
    if (currentFilter.value === 'unsettled') {
        //sort by settleDate
        return filter.sort((a, b) => {
            return (
                new Date(a.settleDate || a.endDate).getTime() -
                new Date(b.settleDate || b.endDate).getTime()
            );
        });
    }
    if (currentFilter.value === 'completed') {
        return filter.reverse();
    }
    return filter;
});

onMounted(async () => {
    const fetchedPolls = await getAllPolls();
    polls.value = fetchedPolls.sort((a, b) => {
        if (a.winner && !b.winner) return 1;
        if (!a.winner && b.winner) return -1;
        return 0;
    });
});
</script>

<template>
    <div>
        <RouterLink
            v-if="beans >= PRICE_OF_WAGER"
            to="/bets/create"
            :title="'Create a new wager'"
            >$$CREATE NEW WAGER$$</RouterLink
        >
        <div class="menu">
            <span
                :class="{ selected: currentFilter === 'open' }"
                @click="changeFilter('open')"
                >OPEN</span
            >
            <span
                :class="{ selected: currentFilter === 'unsettled' }"
                @click="changeFilter('unsettled')"
                >UNSETTLED</span
            >
            <span
                :class="{ selected: currentFilter === 'completed' }"
                @click="changeFilter('completed')"
                >COMPLETED</span
            >
        </div>
        <template v-if="polls && polls.length">
            <Poll :key="poll._id" v-for="poll in filteredPolls" :poll="poll"
        /></template>
        <div v-else>No {{ currentFilter }} wagers</div>
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
