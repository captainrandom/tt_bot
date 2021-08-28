import { CommandAlgo } from '../command-algo'
import { CommandArgs } from '../../command-args'
import { Message, MessageWriter } from '../../../message_writer/message-writer'
import axios from 'axios'

export class UrbanDictionaryDefinitionLookup implements CommandAlgo {
  readonly commandName: string = 'urbandict'

  async executeCommand (options: CommandArgs): Promise<Message[]> {
    const messages = await this.getMessage(options.arg)
    return messages.map(msg => {
      return { text: msg, pm: options.pm }
    })
  }

  async getMessage (term: string): Promise<Array<string>> {
    if (term) {
      try {
        const response = await axios.get(
          'http://api.urbandictionary.com/v0/define',
          { params: { term: term } }
        )

        if (response.data.list.length > 0) {
          const firstResult = response.data.list[0]
          const regex = /\[|\]/g
          return Promise.resolve([
            `Definition: ${firstResult.definition.replace(regex, '')}`,
            `Example: ${firstResult.example.replace(regex, '')}`,
            firstResult.permalink
          ])
        } else {
          return Promise.resolve([`could not find any definitions for ${term}`])
        }
      } catch (err) {
        console.log(err)
        return Promise.resolve([`caught error while calling ${term}`])
      }
    } else {
      return Promise.resolve([this.getHelp()])
    }
  }

  getHelp (): string {
    return `looks up first definition on urban dictionary using /${this.commandName} <search terms>`
  }
}
