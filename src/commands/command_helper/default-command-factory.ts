import { CommandFactory, CustomCommand } from '../command-factory'
import { CommandAlgo } from '../command_algos/command-algo'
import { UrbanDictionaryDefinitionLookup } from '../command_algos/definition_lookup/urban-dictionary-search'
import { GiphySearchAlgo } from '../command_algos/meme_search/giphy-search-algo'
import { SameLocationMessageWriter } from '../../message_writer/same-location-message-writer'
import { GiphyFetch } from '@giphy/js-fetch-api'
import fs from 'fs'
import { MessageWriter } from '../../message_writer/message-writer'
import { DadJokeCommand } from '../command_algos/dad_joke/dad-joke-command'

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
      help: commandAlgo.getHelp(),
      acl: false
    }
  }

  static getCommands (giphyKeyFile: string): CommandAlgo[] {
    const messageWriter = new SameLocationMessageWriter()
    return [
      new UrbanDictionaryDefinitionLookup(messageWriter),
      this.createGiphyCommand(giphyKeyFile, messageWriter),
      DadJokeCommand.create(messageWriter)
    ]
  }

  private static createGiphyCommand (giphyKeyFile: string, messageWriter: MessageWriter): GiphySearchAlgo {
    const giphyKey = fs.readFileSync(giphyKeyFile, 'utf8').trim()
    const giphyClient = new GiphyFetch(giphyKey)
    return new GiphySearchAlgo(giphyClient, messageWriter)
  }
}
