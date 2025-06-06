<script lang="ts" setup>
import { useEconomy } from '@/composables/useEconomy';
import { nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { addCommas } = useEconomy();

const scrollToHash = async () => {
    await nextTick(); // Wait for DOM to render before scrolling
    if (route.hash) {
        const targetElement = document.getElementById(route.hash.substring(1)); // Remove #
        if (targetElement) {
            targetElement.scrollIntoView({
                block: 'start',
            });
        }
    }
};

onMounted(scrollToHash);
</script>

<template>
    <div class="notes">
        <h1>BOOKIE AGREEMENT</h1>
        <p>
            If you decide to become a bookie and create wagers, you must agree
            to the rules and guidelines set forth in this agreement.
        </p>
        <hr />
        <h2>WAGER RULES & GUIDELINES</h2>
        <p>
            In order to create wagers and maintain wager creation privileges,
            bookies must follow the following rules and guidelines:
        </p>

        <ol>
            <li>
                <strong id="1">LICENSE REQUIREMENT</strong>
                <p>
                    Bookies must have a valid Bookie License in order to create
                    wagers. Bookie Licenses can be purchased from the Bean
                    Exchange. Bookie Licenses are non-transferable and can only
                    be used by the person who purchased them.
                </p>
            </li>
            <li>
                <strong id="2">NO NONSENSICAL WAGERS</strong>
                <p>
                    Wagers must be clear and concise. No wagers that are
                    nonsensical or impossible to settle. No wagers where the
                    betting options are not clear or cannot be determined. No
                    wagers that are impossible to settle.
                </p>
            </li>
            <li>
                <strong id="3">NO BET MANIPULATION</strong>
                <p>
                    Wagers must be honest and fair. No wagers that are intended
                    to manipulate the outcome or deceive bettors. No wagers may
                    direct bettors to vote in a certain way or to manipulate the
                    outcome.
                </p>
            </li>
            <li>
                <strong id="4"
                    >NO WAGERS WITH CLEAR ANSWERS AT TIME OF CREATION</strong
                >
                <p>
                    Wagers must not have an obvious or clear answer at the time
                    of creation. Wagers must be based on future events or
                    outcomes that are not yet known. Wagers must be based on
                    events that are not yet determined.
                </p>
            </li>
            <li>
                <strong id="5">NO FALSE WITNESS</strong>
                <p>
                    The winning option chosen at time of wager settlement must
                    be the correct, factual option. Bookies may not settle
                    wagers with false information. If a wager's outcome is
                    disputed the bookie must provide evidence to support their
                    claim.
                </p>
            </li>
            <li>
                <strong id="6">NO ATTEMPTING TO INFLUENCE OUTCOMES</strong>
                <p>
                    Bookies may not attempt to influence the outcome of a wager
                    in any way. Bookies must remain neutral and unbiased. This
                    rule extends to all bettors, not just bookies. While
                    non-bookies cannot legally be penalized for breaking the
                    Bookie Agreement there is great shame in doing so.
                </p>
            </li>
            <li>
                <strong id="7">NO META WAGERS</strong>
                <p>
                    Wagers may NOT be made about the outcome of other wagers.
                    This is to avoid the creation a game within a game, which is
                    hedonistic. No wagers about the site itself. This is to
                    avoid the creation of a game about a game, which is also
                    hedonistic.
                </p>
            </li>
            <li>
                <strong id="8"
                    >NO WAGERS WHERE OUTCOME IS DETERMINED BY BETTORS</strong
                >
                <p>
                    Wagers can not be about the actions of bettors or bookies.
                    Wagers must be about factors outside of the control of
                    bettors and bookies. If the outcome cannot be guarenteed to
                    be completely out of the control of bettors and bookies, it
                    is not a valid wager. The only exception to this rule is if
                    at least 4 bettors have equal, opposing influence over the
                    outcome of the wager. For example, in the case of betting on
                    a mahjong tournament that 4 of the bettors are a part of.
                </p>
            </li>
            <li>
                <strong id="9">BURDEN OF ASSURING A PURE OUTCOME</strong>
                <p>
                    Bookies are responsible for assuring the outcome of a wager
                    is as pure as possible. This means that bookies must take
                    all necessary steps to ensure the outcome of a wager is not
                    influenced by outside forces.
                </p>
            </li>
            <li>
                <strong id="10">NO "BLACK MARKET" BETTING</strong>
                <p>
                    All wagers on this site are subject to the rules set forth
                    in this agreement. NO EXCEPTIONS.
                </p>
            </li>
            <li>
                <strong id="11">BURDEN OF PROOF</strong>
                <p>
                    All wager's outcomes must be provable at any time to any
                    user of the site. If a wager's outcome can not be checked by
                    a simple Google search or a record of the outcome, it is not
                    a valid wager. The only exception to this rule is if the
                    bookie livestreams the event in question to a group of at
                    least 5 bettors. The livestream must be announced and
                    scheduled in the additional information section of the
                    wager.
                </p>
            </li>
            <li>
                <strong id="12">ALLOWANCE OF PRIVATE WAGERS</strong>
                <p>
                    Bookies are allowed to create private wagers where the rules
                    / options are not public. However, bettors should be aware
                    of the risks of participating in private wagers. These
                    wagers are technically still subject to the rules of the
                    Bookie Agreement, but enforcement is difficult due to their
                    private nature. If a bookie is rumored to have created an
                    unfair, rug pulling, or rule breaking private wager they may
                    be subject to an investigation and possible punishment if
                    enough evidence against them is found.
                </p>
            </li>
            <li>
                <strong id="13">10 DAY RULE</strong>
                <p>
                    Bookies must settle wagers within the first 10 days of the
                    wager's outcome coming to fruition. If a bookie fails to
                    settle a wager within 10 days of the outcome being
                    determined, they wager will either be claimed by The House
                    if the outcome can be decided, or shut down if the outcome
                    can not be determined.
                </p>
            </li>
            <li>
                <strong id="14">NO WAGERS ABOUT OTHER BETTING MARKETS</strong>
                <p>
                    Similar to rule 7, wagers may not be made about the outcome
                    of other betting markets. This includes but is not limited
                    to: sports betting, stock market betting and cryptocurrency
                    betting.
                </p>
            </li>
            <li>
                <strong id="15">BURDEN OF DEFINITION</strong>
                <p>
                    It is the bookie's responsibility to ensure each wager's
                    bets are as clear and universally agreeable as possible. If
                    a bet is unclear on its own, the bookie should provide mor
                    information within a wager's additional information field.
                    However, if a bettor is confused about a bet or does not
                    trust the bookie's assumed definition, it is their
                    responsibility to ask the bookie for clarification before
                    placing a bet. Bookies may ask The House to append
                    clarifying information into a wager's information after
                    creation. Definition disputes must be argued before a wager
                    has ended.
                </p>
            </li>
            <li>
                <strong id="16">UNUS ANNUS AGREEMENT</strong>
                <p>
                    Wagers must be about something that can be determined in
                    less than 12 months.
                </p>
            </li>
            <li>
                <strong id="17">NO UNPOPULAR REPEAT WAGERS</strong>
                <p>
                    Making multiple iterations of the same wager is allowed, but
                    only if the last iteration of the wager recieved at least 10
                    bets. If the last iteration of the wager did not receive at
                    least 10 bets, the bookie must wait at least 6 weeks before
                    creating a new iteration of the wager.
                </p>
            </li>
        </ol>
        <hr />
        <h2>BET TYPE RULES</h2>
        <p>Bookies should be aware how winners of each bet type are decided.</p>
        <ol>
            <li>
                <strong id="single">SINGLES</strong>
                <p>
                    Whoever bets on the winning option wins a share of the pot.
                    Percentage of the pot won is determined by the amount of
                    shares they own.
                </p>
            </li>
            <li>
                <strong id="multi">MULTI-BET</strong>
                <p>
                    If a bettor makes at least one correct bet they are marked a
                    winner. Each winning bet with at least one bettor is given
                    an equal share of the pot. Each individual bet is paid out
                    depending on the number of shares a bettor holds on that
                    individual bet. There is no penalty for incorrect bets.
                </p>
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
            <li>
                <strong>SODA ENJOYER SEED GRANT</strong>
                <p>
                    Thanks to the funding from the United Nations of Soda
                    Enjoyers, in exchange for displaying their non-intrusive
                    ads, the Bean Seeds bookies contribute to their wagers will
                    be matched by the United Nations of Soda Enjoyers.
                </p>
            </li>
            <li>
                <strong>TAX EVASION</strong>
                <p>
                    Bookies don't get taxed on weeks when they create wagers. By
                    maintaining a healthy habit of creating weekly wagers a
                    smart bookie could evade taxes their entire life. As a side
                    note, people who donate beans to sanctioned good causes are
                    also exempt from taxes the week they donate.
                </p>
                <p>For those curious, here are the current tax rates:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Wealth</th>
                            <th>Tax Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ addCommas(100000000) }} Beans</td>
                            <td>15%</td>
                        </tr>
                        <tr>
                            <td>{{ addCommas(150000000) }} Beans</td>
                            <td>25%</td>
                        </tr>
                        <tr>
                            <td>{{ addCommas(200000000) }} Beans</td>
                            <td>30%</td>
                        </tr>
                        <tr>
                            <td>{{ addCommas(500000000) }} Beans</td>
                            <td>50%</td>
                        </tr>
                    </tbody>
                </table>
                <p style="margin-top: 1em">
                    Taxes are collected every Sunday night at 8PM EST and are
                    redistributed to bettors with less than
                    {{ addCommas(100000000) }} beans who participated in wagers
                    created in the last 7 days.
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
                    Bookies who violate these rules may have their Bookie
                    License revoked. Continued violation of these rules may
                    result in a bookie being labeled as a racketeer and banned
                    from getting a Bookie License in the future.
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
                <strong>DEFINITION OF A BOOKIE</strong>
                <p>
                    A bookie is defined as a person who has created a wager.
                    Regardless of whether the bookie currently has a Bookie
                    License, if they have ever created a wager they are forever
                    considered a bookie. Bookies are still considered bettors.
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

            <li>
                <strong>ACCOMPLICE LIABILITY</strong>
                <p>
                    Bookies found to be accomplices in helping someone else
                    break the Bookie Agreement are subject to equal punishment.
                </p>
            </li>
        </ol>
    </div>
</template>

<style lang="scss" scoped>
.notes {
    width: 700px;
    max-width: calc(100% - 50px);
    margin: 0 auto;
    padding: 25px;
    .char {
        width: 400px;
        margin: 0 auto;
        max-width: 100%;
        margin-bottom: 1em;
    }
    ol {
        list-style: upper-roman;
    }
    strong {
        font-weight: bold;
        text-decoration: underline;
        margin-bottom: 0.25em;
        display: block;
        padding-top: 1rem;
    }
    h2 {
        color: white;
        text-align: left;
    }
    p {
        margin: 0;
        text-align: left;
        font-size: 0.9em;
    }
    hr {
        margin: 2em 0;
    }
    table {
        margin-top: 1rem;
    }
}
</style>
