<script lang="ts" setup></script>

<template>
    <div class="notes">
        <h1>PATCH NOTES</h1>
        <h2>2/19/25</h2>
        <ul>
            <li>Increased with of leaderboard</li>
            <li>Added more bean ranks</li>
            <li>Paid GreenGun PSHM wins</li>
            <li>Paid rockel PSHM wins</li>
            <li>changed bet description to bet rules</li>
            <li>Moved expiration date to top of poll</li>
            <li>Added poll attribution</li>
            <li>increase footer font size</li>
            <li>improve login security</li>
            <li>
                Replace link gifs with more readable / unwatermarked versions
            </li>
            <li>Change "MAKE BETS" copy to "GAMBLE!!"</li>
            <li>Add welcome bar with logout button</li>
        </ul>
        <h2>2/18/25</h2>
        <ul>
            <li>
                Clicking option selects option, not just specific to checkbox
            </li>
            <li>Fix all instances of "bettor" mispelled as "better"</li>
            <li>remove claimed bets from unclaimed wins table</li>
            <li>Shorten farthest poll expiration date from 12 to 6 months</li>
            <li>Limit username length to 15 characters.</li>
            <li>
                Changed username placeholder from Name to Username on
                registration page
            </li>
            <li>Added password tip on registration page</li>
            <li>Max decimal point to 2 in vote percentage</li>
            <li>
                fixed issue where beans were getting cut off in the selector
            </li>
            <li>Added timezone disclaimer to end date</li>
            <li>User 'Bigfrog' claimed wins from PSHM</li>
            <li>Added patch notes</li>
            <li>Fixed copy on bet CTA</li>
            <li>Launched Site</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.notes {
    width: 400px;
    margin: 0 auto;
    h2 {
        margin-bottom: 0.5em;
    }
    ul {
        font-size: 0.9em;
        list-style-type: disc;
        margin-bottom: 1rem;
    }
}
</style>
