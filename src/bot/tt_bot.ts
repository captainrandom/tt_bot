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

  constructor (botAuth: BotAuth, bot: any, commands: CommandAlgo[]) {
    this.botAuth = botAuth
    this.bot = bot
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
    this.handleCommand(words, data)
  }

  private handleCommand (words: string[], data: ChatResponse) {
    const firstWord = words[0]
    console.log(firstWord)
    if (this.commandsMap.has(firstWord)) {
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
}
