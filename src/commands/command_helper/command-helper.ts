import { CommandAlgo } from '../command_algos/command-algo'
import { Message } from '../../message_writer/message-writer'

export interface CommandHelperOptions {
  pm: boolean;
  userName: string;
}

export class CommandHelper {
  private readonly commandsByName: Map<string, CommandAlgo>

  constructor (commandsByName: Map<string, CommandAlgo>) {
    this.commandsByName = commandsByName
    console.log(this.commandsByName.keys())
  }

  isHelpCommand (words: string[]) {
    return words.length >= 2 && words[0] === '@popsicle' && (words[1] === 'help' || words[1] === 'commands')
  }

  getHelpMessage (words: string[], options: CommandHelperOptions): Message[] {
    if (words.length === 2) {
      return this.listCommands(options)
    } else {
      return this.generateCommandHelpMessage(words, options)
    }
  }

  private generateCommandHelpMessage (words: string[], options: CommandHelperOptions): Message[] {
    const commandWithSlash = `/${words[2]}`
    if (this.commandsByName.has(commandWithSlash)) {
      return [{
        text: this.commandsByName.get(commandWithSlash)!.getHelp(),
        pm: options.pm
      }]
    } else {
      return [{
        text: `${words[2]} is not a valid command`,
        pm: options.pm
      }]
    }
  }

  private listCommands (options: CommandHelperOptions): Message[] {
    const msgItr = Array.from(this.commandsByName.keys())
      .sort()
      .map(commandName => {
        return { text: commandName, pm: options.pm }
      })
    return Array.from(msgItr)
  }
}
