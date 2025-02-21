<script setup lang="ts">
import Poll from '@/components/Polls/PollMain.vue';
import { onMounted, ref } from 'vue';
import { getAllPolls } from '@/composables/usePolls';

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
        <RouterLink class="new" to="/bets/create"
            >$$CREATE NEW WAGER$$</RouterLink
        >
        <template v-if="polls && polls.length">
            <template :key="poll._id" v-for="(poll, i) in polls">
                <hr v-if="showHr(i)" />
                <Poll :poll="poll" /> </template
        ></template>
        <div v-else>No ongoing bets... a shameful day in beandom</div>
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
</style>
