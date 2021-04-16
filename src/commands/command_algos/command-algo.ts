import { CommandArgs } from '../command-args'

export interface CommandAlgo {
    executeCommand(options: CommandArgs): Promise<void>;
    getHelp(commandName: string): string;
}
