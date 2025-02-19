<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const users = ref<User[]>([]);

function getRank(rank: number) {
    let rankString = '';
    switch (rank) {
        case 1:
            rankString = 'King Bean 🫅🏾';
            break;
        case 2:
            rankString = 'Queen Bean 👸';
            break;
        case 3:
            rankString = 'Kidney Bean 👶';
            break;
        default:
            rankString = '';
            break;
    }
    return rankString;
}

onMounted(async () => {
    try {
        const response = await axios.get(
            `https://www.gang-fight.com/api/beans/user/winners`
        );
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching polls:', error);
        throw error;
    }
});
</script>

<template>
    <div class="leaderboards">
        <h1>BEAN RANKS</h1>
        <div v-if="users.length === 0" style="margin-bottom: 1em">
            Loading...
        </div>
        <template v-else>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Better</th>
                        <th>Wins</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="index">
                        <td>{{ getRank(index + 1) }}</td>
                        <td>{{ user.name }}</td>
                        <td class="wins">{{ user.wins.length }}</td>
                    </tr>
                </tbody>
            </table></template
        >

        <h2>UNCLAIMED WINS</h2>
        <p style="font-size: 0.9em">
            Below is a list of unclaimed wins from previous betting pools. If
            you are one of the people listed below contact admin to have your
            wins retroactively added to your profile. Liars will be BANNED.
        </p>
        <table>
            <thead>
                <tr>
                    <th>Better</th>
                    <th>Wins</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Dr Meow</td>
                    <td class="wins">CLAIMED</td>
                </tr>
                <tr>
                    <td>lack</td>
                    <td class="wins">2</td>
                </tr>
                <tr>
                    <td>darkthankful 2</td>
                    <td class="wins">CLAIMED</td>
                </tr>
                <tr>
                    <td>Nick</td>
                    <td class="wins">2</td>
                </tr>
                <tr>
                    <td>Itsmekidney</td>
                    <td class="wins">1</td>
                </tr>
                <tr>
                    <td>chibiGodzilla</td>
                    <td class="wins">1</td>
                </tr>
                <tr>
                    <td>Brian</td>
                    <td class="wins">1</td>
                </tr>
                <tr>
                    <td>Rockel</td>
                    <td class="wins">1</td>
                </tr>
                <tr>
                    <td>bigdrog</td>
                    <td class="wins">CLAIMED</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.leaderboards {
    width: 400px;
    margin: 0 auto;
    p {
        margin-bottom: 1em;
    }
    table {
        margin-bottom: 1em;
        .wins {
            text-align: right;
        }
    }
}
</style>
