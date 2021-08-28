import { CommandAlgo } from '../command-algo'
import { SameLocationMessageWriter } from '../../../message_writer/same-location-message-writer'
import { DadJokeApiClient } from './dad-joke-api-client'
import { CommandArgs } from '../../command-args'
import { Message } from '../../../message_writer/message-writer'

export class DadJokeCommand implements CommandAlgo {
  readonly commandName: string = 'dadjoke'

  private readonly dadJokeClient: DadJokeApiClient

  static create (): DadJokeCommand {
    return new DadJokeCommand(new DadJokeApiClient())
  }

  constructor (dadJokeClient: DadJokeApiClient) {
    this.dadJokeClient = dadJokeClient
  }

  async executeCommand (options: CommandArgs): Promise<Message[]> {
    if (!options.pm) {
      const joke = await this.dadJokeClient.getRandomJoke()
      return [{
        text: joke,
        pm: options.pm
      }]
    } else {
      return []
    }
  }

  getHelp (): string {
    return `/${this.commandName} returns a random dad joke`
  }
}
