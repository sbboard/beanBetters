<script setup lang="ts">
import { computed } from 'vue';
import { useEconomy } from '@/composables/useEconomy';
import { useApiStore } from '@/stores/api';
import ranks from '@/utils/rankInfo';

const apiStore = useApiStore();
const { addCommas } = useEconomy();
const { sort } = defineProps<{ sort: 'beans' | 'wins' }>();

const sortedUsers = computed(() => {
    if (!apiStore.winners.data) return [];
    const virtualUsers = [...apiStore.winners.data];
    if (sort === 'wins') {
        return virtualUsers
            .filter(user => user.wins.length > 0)
            .sort((a, b) => {
                return b.wins.length - a.wins.length;
            });
    }
    return virtualUsers.sort((a, b) => {
        if (sort === 'beans') {
            return b.beans - (b.debt || 0) - (a.beans - (a.debt || 0));
        } else {
            return b.wins.length - a.wins.length;
        }
    });
});
</script>

<template>
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
</template>

<style lang="scss" scoped>
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

.ranks {
    tr:nth-of-type(4) {
        border-bottom: 5px solid var(--themeColor);
    }
    tr:nth-of-type(10) {
        border-bottom: 5px solid var(--themeColor);
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
