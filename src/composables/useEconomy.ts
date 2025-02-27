export const PRICE_OF_WAGER = 500000;

export function addCommas(num: number) {
    return num.toLocaleString();
}

export const ITEMS = {
    lotto: {
        price: 10000,
        displayName: 'Lotto Ticket',
        icon: 'lotto.png',
        description:
            'Enter the lottery for a chance to win big! Current jackpot:',
    },
    adblock: {
        displayName: 'Ad Block',
        price: 1000000,
        icon: 'adblock.png',
        description:
            'Removes the ads brought to you by the Soda Enjoyer Seed Grant',
    },
    'bookie license': {
        price: 11000000,
        displayName: 'Bookie License',
        icon: 'license.png',
        description: 'Allows you to become a bookie and create wagers',
    },
    invite: {
        icon: 'invite.png',
        price: 20000000,
        displayName: 'Invite',
        description:
            'Get an invite code (seen in inventory) to share the gift of betting with a friend',
    },
};
