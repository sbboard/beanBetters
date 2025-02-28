<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useEconomy } from '@/composables/useEconomy';
import { useApiStore } from '@/stores/api';

const apiStore = useApiStore();
const sort = ref('beans');
const { addCommas } = useEconomy();

const sortedUsers = computed(() => {
    if (!apiStore.winners.data) return [];
    const virtualUsers = [...apiStore.winners.data];
    if (sort.value === 'wins') {
        return virtualUsers
            .filter(user => user.wins.length > 0)
            .sort((a, b) => {
                return b.wins.length - a.wins.length;
            });
    }
    return virtualUsers.sort((a, b) => {
        if (sort.value === 'beans') {
            return b.beans - (b.debt || 0) - (a.beans - (a.debt || 0));
        } else {
            return b.wins.length - a.wins.length;
        }
    });
});

const ranks = [
    { title: 'King Bean', emoji: '🫅' },
    { title: 'Queen Bean', emoji: '👸' },
    { title: 'Kidney Bean', emoji: '👶' },
    { title: 'Mr Bean', emoji: '🤥' },
    { title: 'Human Bean', emoji: '🚶' },
    { title: 'Jelly Bean', emoji: '👻' },
    { title: 'Garbanzo Bean', emoji: '🧑‍🍳' },
    { title: 'Baked Bean', emoji: '😮‍💨' },
    { title: 'Refried Bean', emoji: '🧟‍♂️' },
    { title: 'Soy Bean', emoji: '😱' },
];

onMounted(() => apiStore.fetchWinners());
</script>

<template>
    <div class="leaderboards">
        <h1>LEADERBOARD</h1>
        <div class="menu">
            <span
                :class="{ selected: sort === 'beans' }"
                @click="() => (sort = 'beans')"
                >SORT BY BEANS</span
            >
            <span
                :class="{ selected: sort === 'wins' }"
                @click="() => (sort = 'wins')"
                >SORT BY WINS</span
            >
        </div>
        <div v-if="sortedUsers.length === 0" style="margin-bottom: 1em">
            Loading...
        </div>
        <template v-else>
            <table :class="[sort]">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th v-if="sort === 'beans'">Rank</th>
                        <th>Bettor</th>
                        <th v-if="sort === 'wins'">Wins</th>
                        <th v-if="sort === 'beans'">Beans</th>
                    </tr>
                </thead>
                <tbody class="ranks">
                    <tr v-for="(user, index) in sortedUsers" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td v-if="sort === 'beans'">
                            <template v-if="ranks[index]"
                                ><span>{{ ranks[index].title }}</span>
                                {{ ranks[index].emoji }}</template
                            >
                        </td>
                        <td>{{ user.name }}</td>
                        <td class="wins" v-if="sort === 'wins'">
                            {{ user.wins.length }}
                        </td>
                        <td class="wins" v-if="sort === 'beans'">
                            {{ addCommas(user.beans - (user.debt || 0) || 0) }}
                        </td>
                    </tr>
                </tbody>
            </table></template
        >
        <template v-if="sort === 'beans'">
            <h2>RANK INFORMATION</h2>

            <p style="font-size: 0.9em">
                Ranks 1-4 are sacred and are considered
                <strong>"The Bean Royal Family"</strong>. They are worthy of
                your respect and admiration. They are the ones who have proven
                themselves to be the best of the best. No bettors in the world
                are as good at betting as them.<br /><br />
                Ranks 5-10 are the <strong>"Bean Elite"</strong>. They are the
                ones who have proven themselves to be worthy of the title of
                bean. The Bean Royal Family sometimes goes to them for
                counsel.<br /><br />
                All other ranks are just your average bettor. At the moment they
                are destined for a pauper's grave. But with enough wins, they
                too can become something greater.
            </p>
        </template>
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
    table {
        margin-bottom: 1em;
        .wins {
            text-align: right;
            overflow-wrap: anywhere;
        }
        &.wins {
            tr {
                border-bottom: 1px solid var(--themeColor) !important;
            }
        }
    }
}

strong {
    font-weight: bold;
}

.ranks {
    tr:nth-of-type(4) {
        border-bottom: 5px solid var(--themeColor);
    }
    tr:nth-of-type(10) {
        border-bottom: 5px solid var(--themeColor);
    }
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

@media (max-width: 700px) {
    td {
        font-size: 0.9em;
        span {
            display: none;
        }
    }
}
</style>
