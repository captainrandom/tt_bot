import { CommandAlgo } from '../command_algos/command-algo'

export class CommandHelper {
  private readonly commands: CommandAlgo[]

  constructor (commands: CommandAlgo[]) {
    this.commands = commands
  }

  listCommands () {

  }
}
