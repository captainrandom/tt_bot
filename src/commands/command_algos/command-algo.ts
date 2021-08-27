import { CommandArgs } from '../command-args'

export interface CommandAlgo {
    readonly commandName: string

    executeCommand(options: CommandArgs): Promise<void>;
    getHelp(): string;
}
