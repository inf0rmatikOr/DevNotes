export type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Message = {
    content: string;
    role: 'user' | 'assistant';
};

export type Settings = {
    apiKey: string;
    textColor: string;
    backgroundColor: string;
    rounded: boolean;
    showNumbers: boolean;
}

export type CalenderEntry = {
    date: Date;
    content: string;
    time: string;
}