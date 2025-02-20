<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const users = ref<User[]>([]);

function getRank(rank: number) {
    let rankString = '';
    switch (rank) {
        case 1:
            rankString = 'King Bean 🫅';
            break;
        case 2:
            rankString = 'Queen Bean 👸';
            break;
        case 3:
            rankString = 'Kidney Bean 👶';
            break;
        case 4:
            rankString = 'Mr Bean 🤥';
            break;
        case 5:
            rankString = 'Human Bean 🚶';
            break;
        case 6:
            rankString = 'Jelly Bean 👻';
            break;
        case 7:
            rankString = 'Garbanzo Bean 🧑‍🍳';
            break;
        case 8:
            rankString = 'Baked Bean 😮‍💨';
            break;
        case 9:
            rankString = 'Refried Bean 🧟‍♂️';
            break;
        case 10:
            rankString = 'Soy Bean 😱';
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
        <h1>LEADERBOARD</h1>
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
        <div v-if="users.length === 0" style="margin-bottom: 1em">
            Loading...
        </div>
        <template v-else>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Rank</th>
                        <th style="width: 60%">Bettor</th>
                        <th>Wins</th>
                    </tr>
                </thead>
                <tbody class="ranks">
                    <tr v-for="(user, index) in users" :key="index">
                        <td>{{ index + 1 }}</td>
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
            <br />
            <br />
            Unclaimed bets will be <strong>ERASED</strong> if not claimed by
            March 1st, 2025.
        </p>
        <table>
            <thead>
                <tr>
                    <th>PSHM User</th>
                    <th>Wins</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>lack</td>
                    <td class="wins">2</td>
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
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.leaderboards {
    width: 750px;
    margin: 0 auto;
    p {
        margin-bottom: 1em;
        text-align: left;
    }
    table {
        margin-bottom: 1em;
        .wins {
            text-align: right;
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
</style>
