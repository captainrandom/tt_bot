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
  private readonly commandsByName: Map<string, CommandAlgo>
  private readonly commandsHelper: CommandHelper
  private readonly messageWriter: MessageWriter

  constructor (
    botAuth: BotAuth,
    bot: any,
    commandHelper: CommandHelper,
    commandsByName: Map<string, CommandAlgo>,
    messageWriter: MessageWriter)
  {
    this.botAuth = botAuth
    this.bot = bot
    this.commandsHelper = commandHelper
    this.messageWriter = messageWriter
    this.commandsByName = commandsByName
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
    if (this.commandsByName.has(words[0])) {
      return this.handleCommand(words, data)
    } else if (this.commandsHelper.isHelpCommand(words)) {
      return this.commandsHelper.getHelpMessage(words, {
        pm: this.isMessagePm(data),
        userName: data.name
      })
    } else {
      return []
    }
  }

  private async handleCommand (words: string[], data: ChatResponse): Promise<Message[]> {
    const command = words[0]
    words.shift()
    return await this.commandsByName.get(command)!
      .executeCommand({
        pm: this.isMessagePm(data),
        userid: data.name,
        arg: words.join(' ')
      }) ?? []
  }

  private isMessagePm (data: ChatResponse): boolean {
    return data.command !== 'speak'
  }
}
