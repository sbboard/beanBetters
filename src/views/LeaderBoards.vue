<script setup lang="ts"></script>

<template>
    <div class="leaderboards">
        <h1>BEAN RANKS</h1>
        <h2>UNCLAIMED WINS</h2>
        <p>
            Below is a list of unclaimed wins from previous betting pools. If
            you are one of the people listed below contact admin to have your
            wins retroactively added to your profile. Liars will be BANNED.
        </p>
        <table>
            <tr>
                <th>Better</th>
                <th>Wins</th>
            </tr>
            <tr>
                <td>Dr Meow</td>
                <td class="wins">3</td>
            </tr>
            <tr>
                <td>lack</td>
                <td class="wins">2</td>
            </tr>
            <tr>
                <td>darkthankful 2</td>
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
                <td class="wins">1</td>
            </tr>
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
    .wins {
        text-align: right;
    }
}
</style>
