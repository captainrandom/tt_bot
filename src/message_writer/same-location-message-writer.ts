import { Bot } from '../commands/command-args'
import { Message, MessageWriter } from './message-writer'

export class SameLocationMessageWriter implements MessageWriter {
  private nextSleepTime: number = Date.now()
  private readonly sleepTimeBetweenMessages = 500
  private readonly bot: Bot

  constructor (bot: Bot) {
    this.bot = bot
  }

  // TODO: finish testing this
  async writeMessages (messages: Message[]): Promise<void> {
    for (const msg of messages) {
      await this.writeMessage(msg)
    }
  }

  async writeMessage (msg: Message): Promise<void> {
    await this.sleepBetweenMessages()
    if (msg.pm) {
      this.bot.pm(msg.text)
    } else {
      this.bot.speak(msg.text)
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
