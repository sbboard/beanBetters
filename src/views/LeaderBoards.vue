<script setup lang="ts">
import { useApiStore } from '@/stores/api';
import MasterList from '@/components/Leaderboards/MasterList.vue';
import { onMounted, ref, type Ref } from 'vue';
import axios from 'axios';

const apiStore = useApiStore();
const sort: Ref<'beans' | 'wins' | 'donate'> = ref('beans');
const poll: Ref<Poll | null> = ref(null);

const api = import.meta.env.VITE_API;
const fetchPoll = async () => {
    try {
        const response = await axios.get(
            `${api}/polls/680685bfac986a4716b17a69`,
            {
                params: { userId: 'dummy' },
            }
        );
        poll.value = response.data;
    } catch (error) {
        console.error('Error fetching poll:', error);
    }
};

onMounted(async () => {
    apiStore.fetchWinners();
    await fetchPoll();
});
</script>

<template>
    <div class="leaderboards">
        <h1>RANK INFORMATION</h1>

        <p style="font-size: 0.9em">
            Ranks 1-4 are sacred and are considered
            <strong>"The Bean Royal Family"</strong>. They are worthy of your
            respect and admiration. They are the ones who have proven themselves
            to be the best of the best. No bettors in the world are as good at
            betting as them.<br /><br />
            Ranks 5-10 are the <strong>"Bean Elite"</strong>. They are the ones
            who have proven themselves to be worthy of the title of bean. The
            Bean Royal Family sometimes goes to them for counsel.<br /><br />
            All other ranks are just your average bettor. At the moment they are
            destined for a pauper's grave. But with enough wins, they too can
            become something greater.
        </p>
        <div class="menu">
            <span
                :class="{ selected: sort === 'beans' }"
                @click="() => (sort = 'beans')"
                >BEANS</span
            >
            <span
                :class="{ selected: sort === 'wins' }"
                @click="() => (sort = 'wins')"
                >WINS</span
            >
            <span
                :class="{ selected: sort === 'donate' }"
                @click="() => (sort = 'donate')"
                >PHILANTHROPY</span
            >
        </div>
        <!-- <TheChart
            v-if="apiStore.winners.chart.length && sort !== 'donate'"
            :sort
        ></TheChart> -->
        <MasterList :sort :poll></MasterList>
    </div>
</template>

<style lang="scss" scoped>
.leaderboards {
    width: 750px;
    max-width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    p {
        margin-bottom: 1em;
        text-align: left;
    }
}

strong {
    font-weight: bold;
}

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

.subh {
    margin-top: 1rem;
}
</style>
