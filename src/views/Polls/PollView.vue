<script setup lang="ts">
import Poll from '@/components/Polls/PollMain.vue';
import { computed, onMounted, ref } from 'vue';
import { getAllPolls } from '@/composables/usePolls';
import { useUserStore } from '@/stores/user';
import { PRICE_OF_WAGER } from '@/composables/useEconomy';
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
            to="/bets/create"
            :title="'Create a new wager'"
            >$$CREATE NEW WAGER$$</RouterLink
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
a {
    margin: 0 auto 20px auto;
    display: block;
    width: fit-content;
    font-size: 1.5em;
}
hr {
    margin: 50px 0;
}
</style>
