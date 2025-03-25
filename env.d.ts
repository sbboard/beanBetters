/// <reference types="vite/client" />

interface PollOption {
    _id: string;
    text: string;
    bettors: string[];
}

interface Poll {
    contentType: 'poll';
    creationDate: Date;
    creatorName: string;
    description: string;
    endDate: Date;
    options: PollOption[];
    pot: number;
    pricePerShare: number;
    seed?: number;
    settleDate?: Date;
    title: string;
    winner: null | string;
    legalStatus?: {
        isLegal?: boolean;
        lawsBroken?: string[];
    };
    _id: string;
    betPerWager?: number;
}

interface ShopItem {
    price: number;
    displayName: string;
    icon: string;
    description: string;
    maintainsValue: boolean;
    hideFromStore: boolean;
}

interface InventoryItem {
    _id: string;
    meta: string;
    name: string;
    specialDescription?: string;
    specialPrice?: number;
}

interface Notification {
    text: string;
    date: Date;
    _id: string;
}

interface User {
    _id: string;
    beans: number;
    contentType: 'user';
    debt?: number;
    inventory?: InventoryItem[];
    name: string;
    role?: string;
    wins: string[];
    registrationDate?: Date;
    lastIP?: string;
    notifications?: Notification[];
    notificationsLastChecked?: Date;
}

type BeanEntry = {
    name: string;
    beans: number;
};

type WinEntry = {
    name: string;
    wins: number;
};

type ChartEntry = {
    date: string;
    beans: BeanEntry[];
    wins: WinEntry[];
};

type Chart = ChartEntry[];
