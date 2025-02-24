<script lang="ts" setup>
import { PRICE_OF_WAGER, addCommas } from '@/composables/useEconomy';
</script>

<template>
    <div class="notes">
        <h1>BOOKIE AGREEMENT</h1>
        <p>
            If you decide to become a bookie and create wagers, you must agree
            to the rules and guidelines set forth in this agreement.
        </p>
        <hr />
        <h2>BOOKIE RULES & GUIDELINES</h2>
        <p>
            In order to create wagers and maintain wager creation privileges,
            bookies must follow the following rules and guidelines:
        </p>

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
                    claimed by another user as their own.
                </p>
            </li>
            <li>
                <strong>SEED BEANS</strong>
                <p>
                    Bookies must seed their wages with a minimum of
                    {{ addCommas(PRICE_OF_WAGER) }} beans. This is to ensure
                    that bookies are invested in their wagers and are not
                    creating wagers for the sake of creating wagers.
                </p>
            </li>
            <li>
                <strong
                    >NO WAGERS WITH OBVIOUS / CLEAR ANSWERS AT TIME OF
                    CREATION</strong
                >
                <p>
                    Wagers must not have an obvious or clear answer at the time
                    of creation. Wagers must be based on future events or
                    outcomes that are not yet known.
                </p>
            </li>
            <li>
                <strong>NO DOUBLE BETTING WITH MULTIPLE ACCOUNTS</strong>
                <p>
                    Bookies may not create wagers and then bet on them with
                    multiple accounts. One account per person.
                </p>
            </li>
            <li>
                <strong>WINNING OPTION MUST BE THE CORRECT OPTION</strong>
                <p>The winning option must be the correct, factual option.</p>
            </li>
        </ol>
        <hr />
        <h2>BOOKIE BENEFITS</h2>
        <p style="margin-bottom: 1em">
            In return for following these rules, the following benefits are
            promised to bookies by the King Bean:
        </p>
        <ol>
            <li>
                <strong>BOOKIE TIP</strong>
                <p>
                    Bookies will receive 5% of the jackpot for each wager they
                    create. This is to incentivize bookies to create wagers and
                    to reward them for their contributions to the betting
                    ecosystem.
                </p>
            </li>
            <li>
                <strong>RESPECT</strong>
                <p>
                    Bookies will be respected and admired by the community for
                    their contributions to the betting ecosystem.
                </p>
            </li>
        </ol>
        <hr />
        <h2>DISCLAIMER</h2>
        <ol>
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
                    Violation of these rules may result in a bookie being
                    labeled as a racketeer and banned from creating wagers.
                </p>
            </li>
            <li>
                <strong>CHANGES</strong>
                <p>
                    These rules are subject to change at any time. It is the
                    responsibility of the creator to stay up to date on the
                    rules and guidelines.
                </p>
            </li>
            <li>
                <strong>APPLICATION TO NON-BOOKIES</strong>
                <p>
                    While this agreement only applies to bookies, all users are
                    expected to be aware of this sacred agreement and bet within
                    the spirit of it. However, only bookies are held to the
                    letter of the law and are subject to punishment for
                    violations.
                </p>
            </li>
        </ol>
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
    ol {
        list-style: upper-roman;
    }
    strong {
        font-weight: bold;
        text-decoration: underline;
    }
    h2 {
        color: white;
        text-align: left;
    }
    p {
        margin: 0;
        text-align: left;
        font-size: 0.9em;
        margin-bottom: 1em;
    }
    li {
        margin-bottom: 1em;
    }
    hr {
        margin: 2em 0;
    }
}
</style>
