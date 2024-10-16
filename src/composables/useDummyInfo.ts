export default function () {
    const userExamples: User[] = [
        {
            _id: 55,
            name: 'John Doe',
            password: '123',
            beans: 100,
            wins: 0,
            email: 'example@example.com',
            reputation: 50,
        },
        {
            _id: 66,
            name: 'Jane Doe',
            password: '123',
            beans: 100,
            wins: 0,
            email: 'example@example.com',
            reputation: 50,
        },
        {
            _id: 11,
            name: 'John Smith',
            password: '123',
            beans: 100,
            wins: 0,
            email: 'example@example.com',
            reputation: 50,
        },
    ];

    const pollExamples: Poll[] = [
        {
            _id: 1,
            creator: 'John Doe',
            creatorId: '55',
            title: 'Who will win the election?',
            description: 'Bet on the next president of the United States',
            endDate: new Date('2024-11-03'),
            options: [
                {
                    _id: 1,
                    text: 'Joe Biden',
                    amount: 100,
                    betters: ['55', '66'],
                },
                {
                    _id: 2,
                    text: 'Donald Trump',
                    amount: 200,
                    betters: ['11'],
                },
            ],
            status: 'open',
        },
        {
            _id: 2,
            creator: 'John Doe',
            creatorId: '55',
            title: 'Who will win the Super Bowl?',
            description: 'Bet on the winner of the next Super Bowl',
            endDate: new Date('2024-02-04'),
            options: [
                {
                    _id: 1,
                    text: 'New England Patriots',
                    amount: 100,
                    betters: ['55', '66'],
                },
                {
                    _id: 2,
                    text: 'Dallas Cowboys',
                    amount: 200,
                    betters: ['11'],
                },
            ],
            status: 'open',
        },
    ];

    return { userExamples, pollExamples };
}
