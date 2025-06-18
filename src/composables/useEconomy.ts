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
        },
        'bean bag': {
            displayName: 'Bean Bag',
            icon: 'bag.png',
            description: '',
            price: 0,
            hideFromStore: true,
            maintainsValue: true,
        },
        'bookie license': {
            price: 11000000,
            displayName: 'Bookie License',
            icon: 'license.png',
            description: 'Allows you to become a bookie and create wagers.',
        },
        invite: {
            icon: 'invite.png',
            price: 20000000,
            displayName: 'Invite',
            description:
                'Get an invite code (seen in inventory) to share the gift of betting with a friend.',
        },
        'club membership': {
            icon: '100M.png',
            price: 100000000,
            displayName: '100M Club Membership',
            description: 'Membership to the exclusive 100M Club.',
            disabled: true,
        },
        'joes eye': {
            displayName: "Joey's Left Eye",
            price: 10000,
            icon: 'eye.png',
            description:
                'Allows you to see the art on the site how its creator saw it.',
        },
        adblock: {
            displayName: 'Ad Block',
            price: 1000000,
            icon: 'adblock.png',
            description:
                'Removes the ads provided by the Soda Enjoyer Seed Grant.',
        },
        // 'memory gem': {
        //     icon: 'time.png',
        //     price: 1000000,
        //     displayName: 'Memory Wipe Gem',
        //     description: 'A gem that allows you to undo a bet. Use wisely.',
        //     disabled: true,
        // },
        cigs: {
            icon: 'camel2.png',
            price: 20000000,
            displayName: 'Camel Blues',
            description: 'A delicious pack of 20 cigarettes.',
            disabled: true,
        },
        lighter: {
            icon: 'lighter4.png',
            price: 50000000,
            displayName: 'Lighter',
            description: 'A lighter used for lighting cigarettes.',
            disabled: true,
        },
        'magic beans': {
            icon: 'beans.png',
            price: 100000000,
            displayName: 'Magic Beans',
            description: 'The famous magic beans. Maintains their value.',
            maintainsValue: true,
        },
        'shield of turin': {
            icon: 'turin.png',
            price: 250000000,
            displayName: 'Plate of Turin',
            description:
                'A plate with a familiar face on it. Maintains its value.',
            maintainsValue: true,
        },
        head: {
            icon: 'head.png',
            price: 500000000,
            displayName: "Amenhotep's Head",
            description: 'The head of Amenhotep III. Maintains its value.',
            maintainsValue: true,
        },
        demon: {
            icon: 'demon.png',
            price: 1000000000,
            displayName: 'Bottled Demon',
            description: 'A real life actual demon. Maintains its value.',
            maintainsValue: true,
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
