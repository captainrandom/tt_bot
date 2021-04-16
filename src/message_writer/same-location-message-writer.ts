import { CommandArgs } from '../commands/command-args'
import { MessageWriter } from './message-writer'

export class SameLocationMessageWriter implements MessageWriter {
  writeMessage (msg: string, options: CommandArgs): void {
    if (options.pm) {
      options.cmbot.bot.pm(msg)
    } else {
      options.cmbot.bot.speak(msg)
    }
  }
}
