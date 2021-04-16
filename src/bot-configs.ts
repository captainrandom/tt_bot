import * as fs from 'fs'
import * as path from 'path'

export interface BotAuth {
    auth: string;
    userid: string;
    roomid: string;
}

interface BotJsonConfig {
    botAuth: BotAuth;
    masterUserIds: [string];
}

export class BotConfigs {
    private readonly botDir: string;
    private readonly botConfig: BotJsonConfig;

    constructor (botDir: string) {
      if (!fs.existsSync(botDir)) {
        throw new Error(botDir + ' does not exist!')
      }
      this.botDir = botDir
      this.botConfig = this.loadConfig(this.botDir)
    }

    private loadConfig (botDir: string): BotJsonConfig {
      const authFile = path.join(this.botDir, 'bot-config.json')
      const authFileContents = fs.readFileSync(authFile)
      return JSON.parse(authFileContents.toString())
    }

    botAuth (): BotAuth {
      return this.botConfig.botAuth
    }

    getSettingsFilePath (): string {
      return path.join(this.botDir, 'settings.json')
    }

    getDjFilePath (): string {
      return path.join(this.botDir, 'djs.json')
    }

    getBotDbFilePath (): string {
      return path.join(this.botDir, 'mybot.db')
    }

    getMasterUserIds (): [string] {
      return this.botConfig.masterUserIds
    }
}
