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