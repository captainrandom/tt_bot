import { GiphyFetch } from '@giphy/js-fetch-api'
import { CommandAlgo } from '../command-algo'
import { CommandArgs } from '../../command-args'
import { MessageWriter } from '../../../message_writer/message-writer'

const globalAny: any = global
globalAny.fetch = require('node-fetch')

export class GiphySearchAlgo implements CommandAlgo {
    private readonly TOP_N_GIPHS = 50;
    private readonly giphyClient: GiphyFetch;
    private readonly messageWriter: MessageWriter;

    constructor (giphyClient: GiphyFetch, messageWriter: MessageWriter) {
      this.giphyClient = giphyClient
      this.messageWriter = messageWriter
    }

    async executeCommand (options: CommandArgs): Promise<void> {
      if (options.arg) {
        const giphUrl = await this.getGifUrl(options) ?? `no gifs found for ${options.arg}`
        console.log('giphUrl', giphUrl)
        this.messageWriter.writeMessage(giphUrl, options)
      }
    }

    private async getGifUrl (options: CommandArgs): Promise<string | undefined> {
      console.log('getting giphy url with', options.arg)
      const { data: giphs } = await this.giphyClient.search(
        options.arg,
        {
          sort: 'relevant',
          lang: 'en',
          limit: 1,
          offset: this.getRandomNum(this.TOP_N_GIPHS),
          type: 'gifs',
          explore: true
        })
      return giphs.length > 0 ? `https://media.giphy.com/media/${giphs[0].id}/giphy.gif` : undefined
    }

    private getRandomNum (max: number): number {
      return Math.floor(Math.random() * max)
    }

    getHelp (commandName: string): string {
      return `queries a random gif by typing /${commandName}`
    }
}