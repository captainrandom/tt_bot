export interface Message {
    text: string;
    pm: boolean;
}

export interface MessageWriter {
    writeMessages(messages: Message[]): Promise<void>;
    writeMessage(msg: Message): Promise<void>;
}
