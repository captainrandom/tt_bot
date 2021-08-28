import { CommandArgs } from './command-args'

export interface CustomCommand {
    name: string;
    command: (args: CommandArgs) => Promise<void>;
    modonly: boolean;
    pmonly: boolean;
    hide: boolean;
    help: string;
    acl: boolean;
}
