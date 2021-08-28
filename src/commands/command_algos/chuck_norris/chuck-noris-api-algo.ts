import { CommandAlgo } from '../command-algo'
import { Message, MessageWriter } from '../../../message_writer/message-writer'
import { CommandArgs } from '../../command-args'
import { ChuckNorrisClient } from './chuck-norris-client'

export class ChuckNorisApiAlgo implements CommandAlgo {
    readonly commandName: string = 'chuckfacts'

    private readonly chuckNorrisClient: ChuckNorrisClient;

    static async create (): Promise<ChuckNorisApiAlgo> {
      const chuckNorisClient = new ChuckNorrisClient()
      return new ChuckNorisApiAlgo(chuckNorisClient)
    }

    constructor (chuckNorrisClient: ChuckNorrisClient) {
      this.chuckNorrisClient = chuckNorrisClient
    }

    async executeCommand (options: CommandArgs): Promise<Message[]> {
      const msg = await this.getMessage(options.arg)
      return [{
        text: msg,
        pm: options.pm
      }]
    }

    private async getMessage (arg: string): Promise<string> {
      if (arg && !this.chuckNorrisClient.categories.has(arg)) {
        // TODO: come back to this as it is a bit weird!!
        const sortedCategories = Array.from(this.chuckNorrisClient.categories).sort().join(', ')
        const usageDescription = 'usage\n /<command> <category>\n\ncategories:\n'
        return Promise.resolve(usageDescription + sortedCategories)
      } else {
        return await this.chuckNorrisClient.getFact(arg)
      }
    }

    getHelp (): string {
      return `/${this.commandName} returns chuck norris facts`
    }
}
