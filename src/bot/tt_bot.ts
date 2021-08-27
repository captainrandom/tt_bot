import { BotAuth } from '../bot-configs'
import { CommandAlgo } from '../commands/command_algos/command-algo'

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

  constructor (botAuth: BotAuth, bot: any, commandHelper: CommandHelper, commands: CommandAlgo[]) {
    this.botAuth = botAuth
    this.bot = bot
    this.commandsHelper = commandHelper
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

  onChat (data: ChatResponse) {
    console.log(data)
    const words: string[] = data.text.split(' ')
    const firstWord = words[0]
    console.log(firstWord)

    if (this.commandsMap.has(firstWord)) {
      this.handleCommand(firstWord, words, data)
      // todo complete this
      // also turn this into a generator -> sync and remove the messanger form all the commands?
    } else if (this.commandsHelper.isHelpCommand(words)) {
      const helpMessages = this.commandsHelper.getHelpMessage(words)
      for(const messsage of helpMessages) {

      }
    }
    else if (firstWord === '@popsicle' && (words[1] === 'help' || words[1] === 'commands')) {
      // don't have args, thus we want to show everything
      if (words.length === 2) {
        const commandNames = Array.of(this.commandsMap.keys()).sort()

      }
    }
  }

  private handleCommand (firstWord: string, words: string[], data: ChatResponse) {
    // TODO: clean up the bot parts
    words.shift()
    this.commandsMap.get(firstWord)!.executeCommand({
      cmbot: {
        bot: this.bot
      },
      pm: false,
      userid: data.name,
      arg: words.join(' ')
    })
  }
}
