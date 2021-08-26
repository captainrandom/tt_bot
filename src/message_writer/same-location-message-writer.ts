import { CommandArgs } from '../commands/command-args'
import { MessageWriter } from './message-writer'

export class SameLocationMessageWriter implements MessageWriter {
  private nextSleepTime: number = Date.now()
  private readonly sleepTimeBetweenMessages = 500

  async writeMessage (msg: string, options: CommandArgs): Promise<void> {
    await this.sleepBetweenMessages()
    if (options.pm) {
      options.cmbot.bot.pm(msg)
    } else {
      options.cmbot.bot.speak(msg)
    }
    // update the last sent message time!
    this.nextSleepTime = Date.now() + this.sleepTimeBetweenMessages
  }

  private async sleepBetweenMessages () {
    // if it has been less than 500 ms since the last message sleep
    // until the 500 ms is up
    const currentTime = Date.now()
    if (this.nextSleepTime > currentTime) {
      await new Promise(r => setTimeout(r, this.nextSleepTime - currentTime))
    }
  }
}
