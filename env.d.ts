/// <reference types="vite/client" />

interface PollOption {
    _id: string;
    text: string;
    bettors: string[];
}

interface Poll {
    abstained: string[];
    contentType: 'poll';
    creationDate: Date;
    creatorId: string;
    description: string;
    endDate: Date;
    options: PollOption[];
    pollType: 'bet';
    pot: number;
    pricePerShare: number;
    settleDate?: Date;
    seed: number;
    title: string;
    winner: null | string;
    _id: string;
}

interface User {
    _id: string;
    name: string;
    password: string;
    role?: string;
    wins: string[];
    registrationDate: Date;
    contentType: 'user';
    lastIP?: string;
    beans: number;
}
