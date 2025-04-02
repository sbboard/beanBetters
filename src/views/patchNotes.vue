<script lang="ts" setup></script>

<template>
    <div class="notes">
        <h1>PATCH NOTES</h1>
        <h2>4/2/25</h2>
        <ul>
            <li>
                Fixed issue where numbers with more than one comma weren't being
                ordered properly in winners list
            </li>
            <li>
                Prevented test account from being taxed / appearing in winners
                list
            </li>
            <li>
                House claims 20% of tax before wealth re-distribution in an
                attempt to curb hyper-inflation.
            </li>
            <li>Fixed bug where two wager options could share the same id</li>
            <li>
                Added ability to make more bets if you haven't for max of
                multi-bet
            </li>
            <li>
                Added ability to buy more shares of specific bets in multi-bets,
                rather than all at once
            </li>
        </ul>
        <h2>4/1/25</h2>
        <ul>
            <li>Fixed copy in bean win notification</li>
            <li>Removed cost of creating wagers for admins</li>
            <li>Added 500k bean step to bean transfer</li>
            <li>Added wealth re-distribution</li>
        </ul>
        <h2>3/27/25</h2>
        <ul>
            <li>Fixed leaderboard graph displaying backwards</li>
            <li>Added rule 14 to bookie agreement</li>
            <li>
                Changed numbers on wager creation page to increment in steps of
                500k
            </li>
            <li>
                Added padding to rules so anchorlinks have some room when
                scrolled to
            </li>
            <li>
                Change display of bars so the most popular is 100%, then
                subsequent bars are a percentage proportional to leader
            </li>
            <li>Add total bettors count</li>
            <li>Display winners at the bottom of poll</li>
            <li>Move Wager identification Code</li>
            <li>
                Added rule 15 after having to debate what "furry adjacent" meant
                while settling 67e44828879906dbe7629e53
            </li>
            <li>Revise how multi-bets are paid out</li>
        </ul>
        <h2>3/24/25</h2>
        <ul>
            <li>
                When settling a bet replace the scheduled settle date with the
                date of settlement
            </li>
            <li>
                Include bookie tip in payout notification if you're a bookie
            </li>
            <li>Added a way to clear notifications</li>
            <li>Fixed bug where win cleaner routine wasn't saving</li>
            <li>Added chart to leaderboard</li>
        </ul>
        <h2>3/24/25</h2>
        <ul>
            <li>Added routines for logging top 10 users every night</li>
            <li>
                Added routines for cleaning out duplicate / invalid wins every
                night
            </li>
            <li>Split old/new notifications</li>
            <li>Change notification time display</li>
            <li>Fix spacing on home icons</li>
        </ul>
        <h2>3/23/25</h2>
        <ul>
            <li>Increases max amount of options to 20</li>
            <li>
                Fixed issue where bet deadline was right aligned on certain
                screen sizes
            </li>
            <li>
                Fixed issue where multi-bets were never declared unaffordable
            </li>
            <li>
                Fixed issue where descriptions weren't formatting correctly on
                wager settlement page
            </li>
            <li>
                Changed h1 on settlement page from "SETTLE THIS BET" to "SETTLE
                THIS WAGER"
            </li>
        </ul>
        <h2>3/22/25</h2>
        <ul>
            <li>
                Fixed bug where bookie's payout wouldnt display correctly if
                they hadn't bet on their own wager
            </li>
            <li>
                Shortened min time between API calls from 30 seconds to 10
                seconds
            </li>
            <li>
                Fixed issue with default values adjusting and not adjusting when
                editing a multi-bet
            </li>
            <li>Fixed potential payout math for multi-bets (I think)</li>
        </ul>
        <h2>3/21/25</h2>
        <ul>
            <li>
                Added multi-bet wagers (this is really complicated actually but
                it works I hope)
            </li>
        </ul>
        <h2>3/17/25</h2>
        <ul>
            <li>
                Fixed styling issue where notification would appear large on
                small width displays
            </li>
            <li>Added 10 Day Rule</li>
            <li>Fixed mobile styling for notifications</li>
        </ul>
        <h2>3/16/25</h2>
        <ul>
            <li>
                Change 'BOOKIE RULES & GUIDELINES' to 'WAGER RULES & GUIDELINES'
            </li>
            <li>Adjust styling for shut down wagers</li>
            <li>increase maximum option amount to 15</li>
            <li>Add wager identification code to wagers</li>
            <li>Add notification for being taxed</li>
            <li>
                Fix new user notification not working due to default
                notification settings
            </li>
            <li>
                Fixed bug where users weren't being logged out when localstorage
                was incorrect
            </li>
        </ul>
        <h2>3/15/25</h2>
        <ul>
            <li>
                Fixed bug where stored API responses weren't clearing after
                logout
            </li>
            <li>Added formal penalties for illegal wagers</li>
            <li>Added admin tool for banning wagers</li>
            <li>Added styling for banned wagers</li>
        </ul>
        <h2>3/14/25</h2>
        <ul>
            <li>
                I added notifications I think yesterday but I forgot to add it
                to patch notes
            </li>
            <li>Added mass notification tool</li>
            <li>Added tool for generating "house" invites</li>
            <li>Prevent racketeers from buying bookie license</li>
            <li>Added notifications for certain events</li>
            <li>Added rule about private wagers</li>
        </ul>
        <h2>3/12/25</h2>
        <ul>
            <li>
                Updated bookie agreement in response to rampant rule breaking
            </li>
            <li>Added id's to rules in anticipation of future update</li>
            <li>Check bookie license on backend when creating a wager</li>
        </ul>
        <h2>3/9/25</h2>
        <ul>
            <li>
                Renamed "Rules" field to "Additional Information" on wager
                creation page
            </li>
        </ul>
        <h2>3/7/25</h2>
        <ul>
            <li>Fixed settle bet error</li>
            <li>Added hyperlink parsing in poll descriptions</li>
            <li>Updated bookie agreement</li>
        </ul>
        <h2>3/5/25</h2>
        <ul>
            <li>
                Add indicator when you have unclaimed bean bags in your
                inventory
            </li>
            <li>Add a max length of 50 to wager options</li>
            <li>
                Fixed bug where multi-line poll options wouldn't be fully filled
                vertically
            </li>
            <li>Changed olive oil ad to be about bean oil</li>
        </ul>
        <h2>3/3/25</h2>
        <ul>
            <li>Added ability to send Bean Bags</li>
        </ul>
        <h2>3/2/25</h2>
        <ul>
            <li>Added taxes</li>
            <li>Added rare artifacts to bean exchange</li>
        </ul>
        <h2>3/1/25</h2>
        <ul>
            <li>
                Fixed bug where if you bet on a wager and left the bets page
                then returned your bet wouldnt be included in the totals
            </li>
            <li>Decrease odds of winning lotto</li>
            <li>Secure user ids</li>
        </ul>
        <h2>2/28/25</h2>
        <ul>
            <li>mobile styles</li>
            <li>final pass at bookie agreement</li>
            <li>Allow lotto to be played even with debt (not advised)</li>
            <li>Revised Loan Terms & Services</li>
            <li>Removed unclaimed wins portion of leaderboard</li>
        </ul>
        <h2>2/27/25</h2>
        <ul>
            <li>
                Removed dealer image from "Create New Wager" page (I forgot she
                was there)
            </li>
            <li>
                Purchased items no longer contribute to lottery, to avoid
                hitting max int cap
            </li>
            <li>fixed bug where users could attempt to buy partial shares</li>
            <li>Added lotto item to shop</li>
            <li>
                fixed bug where bookie tax wasn't showing up on completed wager
                payouts
            </li>
            <li>Added confirmation dialogue to buying/selling items</li>
            <li>Added item descriptions to inventory page</li>
            <li>Paid lack nacknoodle wins</li>
            <li>changed item glow to use theme color</li>
            <li>
                Added personal loans (only viewable if you have less than 2mill
                beans)
            </li>
        </ul>
        <h2>2/26/25</h2>
        <ul>
            <li>Gifted top 5 winning users an invite</li>
            <li>Gifted all existing bookies a bookie license</li>
            <li>Re-purposed pop-ups as ads on login page</li>
            <li>Added Bookie License and Invites to Bean Exchange</li>
            <li>Added Bean Cashier to Bean Exchange</li>
        </ul>
        <h2>2/25/25</h2>
        <ul>
            <li>created ad block item</li>
            <li>created store / inventory</li>
            <li>
                fixed bug where poll list wasn't updating after wager settlement
            </li>
            <li>fixed issue where polls/leaderboards weren't updating</li>
            <li>hide unsettled tab if no unsettled bets</li>
            <li>Reversed order of completed polls</li>
            <li>turned off pop-ups bc they were too annoying</li>
        </ul>
        <h2>2/24/25</h2>
        <ul>
            <li>optimized API fetches</li>
            <li>Added user info to the top of every page</li>
            <li>add fallbacks for mobile detection</li>
            <li>increase pop-up size</li>
            <li>Seperate wager end date and settle date</li>
            <li>Lowered bookie tip from 15% to 5%</li>
            <li>Allow linebreaks in wager descriptions</li>
            <li>Changed sorting algorithms for different wager states</li>
            <li>Lowered price of bean seed</li>
            <li>
                show actual payout instead of potential payout for completed
                wagers
            </li>
            <li>Lowered minimum price per share to 500,000</li>
            <li>Added ability to sort leaderboard by wins</li>
            <li>Lowered frequency of pop-ups</li>
            <li>Disabled pop-ups on mobile</li>
            <li>Added more pop-ups</li>
        </ul>
        <h2>2/23/25</h2>
        <ul>
            <li>Added position information</li>
            <li>Added bet filters</li>
            <li>Added pop-ups</li>
            <li>disabled inputs if you cant afford the bet</li>
            <li>Created Soda Enjoyer Seed Grant</li>
            <li>Increased maxmimum amount of poll options to 10</li>
        </ul>
        <h2>2/22/25</h2>
        <ul>
            <li>Added ability to buy multiple shares of a bet</li>
            <li>Added ability to increase PPS / bean seed</li>
            <li>Added seed beans to poll view</li>
            <li>Renamed "Wager Creation Fee" to "Seed Beans"</li>
            <li>Renamed "Jackpot Tax" to "Bookie Tip"</li>
            <li>swapped out some of the banner ads</li>
            <li>
                fixed issue where bets couldn't be set "tomorrow" and always
                ended at midnight
            </li>
            <li>
                fixed bug where not all bet information was updating after
                betting
            </li>
            <li>Added role to leaderboard</li>
            <li>Add commas to bean amounts</li>
            <li>
                Added wager creation fee disclaimer below create wager button
            </li>
            <li>Multiply all bean values by 1,000,000</li>
        </ul>
        <h2>2/21/25</h2>
        <ul>
            <li>add bookie benefits to bookie agreement</li>
            <li>implement bean currency</li>
            <li>begin logging ip addresses</li>
            <li>
                added temporary HR element splitting ended wagers from the rest
            </li>
            <li>Fixed bug where leaderboards weren't in order</li>
            <li>Removed bean judge image from Bookie Agreement</li>
        </ul>
        <h2>2/20/25</h2>
        <ul>
            <li>Removed "crazy eyed king" from the betting page</li>
            <li>Removed gamblers from login page</li>
            <li>
                Fixed bug where closed dates weren't showing up on closed wagers
            </li>
            <li>Add Bookie Agreement link to homepage</li>
            <li>Change all instances of "manager" to "bookie"</li>
            <li>Rename Wager Rules & Guidelines to bookie agreement</li>
            <li>Wager rules & guidelines created</li>
            <li>Paid lack PSHM wins</li>
            <li>fixed bug where poll creators could settle bets early</li>
            <li>Change king emoji on leaderboard</li>
            <li>mobile styles</li>
            <li>style 'settle' page better</li>
            <li>adjust scroll behavior on site</li>
            <li>Change "GAMBLE!!" to "BET!"</li>
            <li>Convert all 'betters' to 'bettors' in API</li>
        </ul>
        <h2>2/19/25</h2>
        <ul>
            <li>Added rank descriptions to leaderboard</li>
            <li>Added disclaimer unclaimed bets will be erased on 3/1/25</li>
            <li>Increased with of leaderboard</li>
            <li>Added more bean ranks</li>
            <li>Paid GreenGus PSHM wins</li>
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
    max-width: 100%;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;
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
