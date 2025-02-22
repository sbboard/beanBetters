<script setup lang="ts">
import Poll from '@/components/Polls/PollMain.vue';
import { computed, onMounted, ref } from 'vue';
import { getAllPolls } from '@/composables/usePolls';
import { useUserStore } from '@/stores/user';
import { addCommas, PRICE_OF_WAGER } from '@/composables/useEconomy';
const userStore = useUserStore();

const beans = computed(() => userStore.user?.beans || 0);

const polls = ref<Poll[] | null>(null);

const showHr = (index: number) => {
    if (index === 0 || !polls.value) return false;
    return !!polls.value[index].winner && !polls.value[index - 1].winner;
};

onMounted(async () => {
    const fetchedPolls = await getAllPolls();
    //move all polls with winner to the bottom
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
            class="new"
            to="/bets/create"
            :title="'Create a new wager'"
            >$$CREATE NEW WAGER$$</RouterLink
        >
        <a v-else class="new disabled" :title="'Not enough beans'"
            >NEED {{ addCommas(PRICE_OF_WAGER) }} BEANS TO CREATE WAGER</a
        >
        <template v-if="polls && polls.length">
            <template :key="poll._id" v-for="(poll, i) in polls">
                <hr v-if="showHr(i)" />
                <Poll :poll="poll" /> </template
        ></template>
        <div v-else>Loading wagers...</div>
    </div>
</template>

<style lang="scss" scoped>
.new {
    margin: 1em auto;
    display: block;
    width: fit-content;
    font-size: 1.5em;
    text-align: center;
}
hr {
    margin: 15px 0;
}
a.disabled {
    opacity: 0.5;
    text-decoration: line-through;
    cursor: not-allowed;
    &:active {
        background-color: unset;
        user-select: none;
    }
}
</style>
