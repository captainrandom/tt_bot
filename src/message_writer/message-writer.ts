import { CommandArgs } from '../commands/command-args'

export interface MessageWriter {
    writeMessage(msg: string, options: CommandArgs): void;
}
