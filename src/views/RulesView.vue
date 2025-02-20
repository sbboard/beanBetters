<script lang="ts" setup>
import CharacterPortraits from '@/components/CharacterPortraits.vue';
</script>

<template>
    <div class="notes">
        <CharacterPortraits class="char" character="judge" />
        <h1>WAGER RULES & GUIDELINES</h1>
        <ol>
            <li>
                <strong>NO NONSENSICAL WAGERS.</strong>
                <p>
                    Wagers must be clear and concise. No wagers that are
                    nonsensical or impossible to settle. No wagers where the
                    betting options are not clear or cannot be determined.
                </p>
            </li>
            <li>
                <strong>NO BET MANIPULATION.</strong>
                <p>
                    Wagers must be honest and fair. No wagers that are intended
                    to manipulate the outcome or deceive bettors. No wagers may
                    direct bettors to vote in a certain way or to manipulate the
                    outcome.
                </p>
            </li>
            <li>
                <strong>WAGER SETTLEMENT</strong>
                <p>
                    Wagers must be settled within 10 days of the end date. No
                    wagers may be left open indefinitely. Wagers must be settled
                    in a timely manner. If a wager is left abandoned it can be
                    claimed by another user as their own, and the original
                    creator will may be put on probation from creating wagers.
                </p>
            </li>
        </ol>
        <hr />
        <ul>
            <li>
                <strong>RULES & GUIDELINES ARE NOT RETROACTIVE.</strong>
                <p>
                    Wagers are subject to the rules in place at the time the
                    wager is created. No changes to the rules will be made
                    retroactively.
                </p>
            </li>
            <li>
                <strong>PUNISHMENT</strong>
                <p>
                    Violation of these rules may result in the wager being
                    removed and the creator being put on probation from creating
                    wagers.
                </p>
            </li>
            <li>
                <strong>DISCLAIMER</strong>
                <p>
                    These rules are subject to change at any time. It is the
                    responsibility of the creator to stay up to date on the
                    rules and guidelines.
                </p>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.notes {
    .char {
        width: 400px;
        margin: 0 auto;
        max-width: 100%;
        margin-bottom: 1em;
    }
    width: 700px;
    max-width: 100%;
    margin: 0 auto;
    padding: 10px;
    h2 {
        margin-bottom: 0.5em;
    }
    ol {
        list-style: auto;
    }
    strong {
        font-weight: bold;
        text-decoration: underline;
    }
    p {
        margin: 0;
        text-align: left;
        font-size: 0.9em;
    }
    li {
        margin-bottom: 1em;
    }
}
</style>
