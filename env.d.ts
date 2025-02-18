/// <reference types="vite/client" />

interface PollOption {
    _id: string;
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
    _id: string;
}

interface User {
    _id: string;
    name: string;
    password: string;
    wins: number;
    registrationDate: Date;
    contentType: 'user';
}
