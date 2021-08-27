export interface Message {
    msg: string;
    pm: boolean;
}

export interface MessageWriter {
    writeMessages(messages: Message[]): Promise<void>;
    writeMessage(msg: Message): Promise<void>;
}
