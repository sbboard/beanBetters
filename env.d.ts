/// <reference types="vite/client" />

interface PollOption {
    _id: number;
    text: string;
    betters: string[];
}

interface Poll {
    _id: number;
    creatorId: string;
    title: string;
    description: string;
    creationDate: Date;
    endDate: Date;
    options: PollOption[];
}

interface User {
    _id: number;
    name: string;
    password: string;
    wins: number;
    registrationDate: Date;
}
