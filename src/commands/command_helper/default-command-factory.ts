import { CommandAlgo } from '../command_algos/command-algo'
import { UrbanDictionaryDefinitionLookup } from '../command_algos/definition_lookup/urban-dictionary-search'
import { GiphySearchAlgo } from '../command_algos/meme_search/giphy-search-algo'
import { GiphyFetch } from '@giphy/js-fetch-api'
import fs from 'fs'
import { DadJokeCommand } from '../command_algos/dad_joke/dad-joke-command'

export class DefaultCommandFactory {
  // TODO make this not static!!
  // TODO: Need to test this
  static getCommands (giphyKeyFile: string): Map<string, CommandAlgo> {
    return this.commandsToMap([
      new UrbanDictionaryDefinitionLookup(),
      this.createGiphyCommand(giphyKeyFile),
      DadJokeCommand.create()
    ])
  }

  private static createGiphyCommand (giphyKeyFile: string): GiphySearchAlgo {
    const giphyKey = fs.readFileSync(giphyKeyFile, 'utf8').trim()
    const giphyClient = new GiphyFetch(giphyKey)
    return new GiphySearchAlgo(giphyClient)
  }

  private static commandsToMap (commands: CommandAlgo[]): Map<string, CommandAlgo> {
    const commandsByName = new Map<string, CommandAlgo>()
    for (const cmd of commands) {
      const wakeCmd = `/${cmd.commandName}`
      if (commandsByName.has(wakeCmd)) {
        throw new Error(`already have ${wakeCmd}`)
      }
      commandsByName.set(wakeCmd, cmd)
    }
    return commandsByName
  }
}
