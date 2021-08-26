import { CommandAlgo } from '../command-algo'
import { MessageWriter } from '../../../message_writer/message-writer'
import { CommandArgs } from '../../command-args'
import { ChuckNorrisClient } from './chuck-norris-client'

export class ChuckNorisApiAlgo implements CommandAlgo {
    readonly commandName: string = 'chuckfacts'

    private readonly chuckNorrisClient: ChuckNorrisClient;
    private readonly messageWriter: MessageWriter;

    static async create (messageWriter: MessageWriter): Promise<ChuckNorisApiAlgo> {
      const chuckNorisClient = new ChuckNorrisClient()
      return new ChuckNorisApiAlgo(chuckNorisClient, messageWriter)
    }

    constructor (chuckNorrisClient: ChuckNorrisClient, messageWriter: MessageWriter) {
      this.chuckNorrisClient = chuckNorrisClient
      this.messageWriter = messageWriter
    }

    async executeCommand (options: CommandArgs): Promise<void> {
      const msg = await this.getMessage(options.arg)
      await this.messageWriter.writeMessage(msg, options)
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

    getHelp (commandName: string): string {
      return `/${commandName} returns chuck norris facts`
    }
}
