import { CommandArgs } from '../command-args'
import { Message } from '../../message_writer/message-writer'

export interface CommandAlgo {
    readonly commandName: string

    executeCommand(options: CommandArgs): Promise<Message[]>;
    getHelp(): string;
}
