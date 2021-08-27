import { CommandAlgo } from '../command-algo'
import { SameLocationMessageWriter } from '../../../message_writer/same-location-message-writer'
import { DadJokeApiClient } from './dad-joke-api-client'
import { CommandArgs } from '../../command-args'

export class DadJokeCommand implements CommandAlgo {
  readonly commandName: string = 'dadjoke'

  private readonly sameLocationMessageWriter: SameLocationMessageWriter
  private readonly dadJokeClient: DadJokeApiClient

  static create (sameLocationMessageWriter: SameLocationMessageWriter): DadJokeCommand {
    const dadJokeClient = new DadJokeApiClient()
    return new DadJokeCommand(sameLocationMessageWriter, dadJokeClient)
  }

  constructor (sameLocationMessageWriter: SameLocationMessageWriter, dadJokeClient: DadJokeApiClient) {
    this.sameLocationMessageWriter = sameLocationMessageWriter
    this.dadJokeClient = dadJokeClient
  }

  async executeCommand (options: CommandArgs): Promise<void> {
    if (!options.pm) {
      const joke = await this.dadJokeClient.getRandomJoke()
      await this.sameLocationMessageWriter.writeMessage(joke, options)
    }
  }

  getHelp (): string {
    return `/${this.commandName} returns a random dad joke`
  }
}
