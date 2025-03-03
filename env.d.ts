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
    _id: string;
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
    meta: string;
    name: string;
    specialDescription?: string;
    specialPrice?: number;
}

interface User {
    _id: string;
    beans: number;
    contentType: 'user';
    debt?: number;
    displayName?: string;
    inventory?: InventoryItem[];
    name: string;
    role?: string;
    wins: string[];
    registrationDate?: Date;
    lastIP?: string;
}
