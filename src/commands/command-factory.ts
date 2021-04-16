import { CommandArgs } from './command-args'
import { CommandAlgo } from './command_algos/command-algo'

export interface CustomCommand {
    name: string;
    command: (args: CommandArgs) => Promise<void>;
    modonly: boolean;
    pmonly: boolean;
    hide: boolean;
    help: string;
    acl: boolean;
}

export interface CommandFactory {
    getCustomCommands(commandName: string, commandAlgo: CommandAlgo): CustomCommand;
}
