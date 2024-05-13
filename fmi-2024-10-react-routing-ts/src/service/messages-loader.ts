export interface MessageData {
    messages: string[];
}


export async function dashboardMessagesLoader() {
    await new Promise(r => setTimeout(r, 500));
    return {
        messages: [
            'Message 1 from Dashboard loader',
            'Message 2 from Dashboard loader',
            'Message 3 from Dashboard loader',
            'Message 4 from Dashboard loader',
            'Message 5 from Dashboard loader',
        ]
    } as MessageData;
}