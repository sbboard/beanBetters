/// <reference types="vite/client" />

interface PollOption {
    _id: number;
    text: string;
    betters: string[];
}

interface Poll {
    contentType: 'poll';
    creationDate: Date;
    creatorId: string;
    description: string;
    endDate: Date;
    options: PollOption[];
    title: string;
    winner: null | string;
    _id: number;
}

interface User {
    _id: number;
    name: string;
    password: string;
    wins: number;
    registrationDate: Date;
    contentType: 'user';
}
