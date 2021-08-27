import { BotAuth } from '../bot-configs'
import { CommandAlgo } from '../commands/command_algos/command-algo'
import { CommandHelper } from '../commands/command_helper/command-helper'
import { Message, MessageWriter } from '../message_writer/message-writer'

interface ChatResponse {
  command: string
  userid: string
  name: string
  roomid: string
  text: string
}

export class TTBotHandler {
  private readonly bot;
  private readonly botAuth: BotAuth;
  private readonly commandsMap: Map<string, CommandAlgo> = new Map()
  private readonly commandsHelper: CommandHelper
  private readonly messageWriter: MessageWriter

  constructor (botAuth: BotAuth, bot: any, commandHelper: CommandHelper, commands: CommandAlgo[], messageWriter: MessageWriter) {
    this.botAuth = botAuth
    this.bot = bot
    this.commandsHelper = commandHelper
    this.messageWriter = messageWriter
    this.updateCommandMap(commands)
  }

  private updateCommandMap (commands: CommandAlgo[]) {
    for (const cmd of commands) {
      const wakeCmd = `/${cmd.commandName}`
      if (this.commandsMap.has(wakeCmd)) {
        throw new Error(`already have ${wakeCmd}`)
      }
      this.commandsMap.set(wakeCmd, cmd)
    }
  }

  onReady (data) {
    const bot = this.bot
    this.bot.roomRegister(this.botAuth.roomid, function () {
      bot.setAsBot()
    })
    this.bot.bop()
  }

  onNewSong (data) {
    this.bot.bop()
  }

  async onChat (data: ChatResponse) {
    console.log(data)
    const messages = await this.generateMessages(data)
    this.messageWriter.writeMessages(messages)
  }

  private async generateMessages (data: ChatResponse): Promise<Message[]> {
    const words: string[] = data.text.split(' ')
    if (this.commandsMap.has(words[0])) {
      return this.handleCommand(words[0], words, data)
    } else if (this.commandsHelper.isHelpCommand(words)) {
      return this.commandsHelper.getHelpMessage(words)
    } else {
      return []
    }
  }

  private async handleCommand (firstWord: string, words: string[], data: ChatResponse): Promise<Message[]> {
    words.shift()
    return await this.commandsMap.get(firstWord)!
      .executeCommand({
        pm: false,
        userid: data.name,
        arg: words.join(' ')
      }) ?? []
  }
}
