import { CommandFactory, CustomCommand } from '../command-factory'
import { CommandAlgo } from '../command_algos/command-algo'

export class DefaultCommandFactory implements CommandFactory {
  getCustomCommands (commandName: string, commandAlgo: CommandAlgo): CustomCommand {
    return {
      name: commandName,
      command: async function (options) {
        await commandAlgo.executeCommand(options)
      },
      modonly: false,
      pmonly: false,
      hide: false,
      help: commandAlgo.getHelp(commandName),
      acl: false
    }
  }
}
