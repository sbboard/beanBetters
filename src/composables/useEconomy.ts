export const PRICE_OF_WAGER = 500000;
export const MIN_DEBT = 2000000;

export function useEconomy() {
    const ITEMS: Record<string, ShopItem> = {
        lotto: {
            price: 10000,
            displayName: 'Lotto Ticket',
            icon: 'lotto.png',
            description:
                'Enter the lottery for a chance to win big! Current jackpot:',
            maintainsValue: false,
            hideFromStore: false,
        },
        'bean bag': {
            displayName: 'Bean Bag',
            icon: 'bag.png',
            hideFromStore: true,
            description: '',
            price: 0,
            maintainsValue: true,
        },
        adblock: {
            displayName: 'Ad Block',
            price: 1000000,
            icon: 'adblock.png',
            description:
                'Removes the ads brought to you by the Soda Enjoyer Seed Grant',
            maintainsValue: false,
            hideFromStore: false,
        },
        'bookie license': {
            price: 11000000,
            displayName: 'Bookie License',
            icon: 'license.png',
            description: 'Allows you to become a bookie and create wagers',
            maintainsValue: false,
            hideFromStore: false,
        },
        invite: {
            icon: 'invite.png',
            price: 20000000,
            displayName: 'Invite',
            description:
                'Get an invite code (seen in inventory) to share the gift of betting with a friend',
            maintainsValue: false,
            hideFromStore: false,
        },
        'magic beans': {
            icon: 'beans.png',
            price: 100000000,
            displayName: 'Magic Beans',
            description: 'The famous magic beans. Maintains their value.',
            maintainsValue: true,
            hideFromStore: false,
        },
        'shield of turin': {
            icon: 'turin.png',
            price: 250000000,
            displayName: 'Plate of Turin',
            description:
                'A plate with a familiar face on it. Maintains its value.',
            maintainsValue: true,
            hideFromStore: false,
        },
        head: {
            icon: 'head.png',
            price: 500000000,
            displayName: "Amenhotep's Head",
            description: 'The head of Amenhotep III. Maintains its value.',
            maintainsValue: true,
            hideFromStore: false,
        },
        demon: {
            icon: 'demon.png',
            price: 1000000000,
            displayName: 'Bottled Demon',
            description: 'A real life actual demon. Maintains its value.',
            maintainsValue: true,
            hideFromStore: false,
        },
    };

    function addCommas(num: number | string) {
        if (typeof num === 'string') num = parseInt(num);
        return num.toLocaleString();
    }

    return {
        PRICE_OF_WAGER,
        MIN_DEBT,
        ITEMS,
        addCommas,
    };
}
