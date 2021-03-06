import path from 'path'
import { BotConfigs } from './src/bot-configs'
import { TTBotHandler } from './src/bot/tt_bot'
import { DefaultCommandFactory } from './src/commands/command_helper/default-command-factory'
import { SameLocationMessageWriter } from './src/message_writer/same-location-message-writer'
import { CommandHelper } from './src/commands/command_helper/command-helper'

var Bot = require('ttapi')

const botName = process.env.BOTNAME
if (botName === undefined || botName === '') {
  throw new Error('BOTNAME cannot be empty')
}

const botDir = path.join(__dirname, 'bots', botName)
const botHelper = new BotConfigs(botDir)

// these are the two things needed for configuring stuff rn
const botAuth = botHelper.botAuth()
const giphyKeyFile = path.join(__dirname, 'giphy_api_key')

function setupBot () {
  const bot = new Bot(botAuth.auth, botAuth.userid, botAuth.roomid)
  const commandsByKey = DefaultCommandFactory.getCommands(giphyKeyFile)
  const ttBotHandler = new TTBotHandler(
    botAuth,
    bot,
    new CommandHelper(commandsByKey),
    commandsByKey,
    new SameLocationMessageWriter(bot)
  )

  bot.on('ready', function (data) {
    ttBotHandler.onReady(data)
  })
  bot.on('newsong', function (data) {
    ttBotHandler.onNewSong(data)
  })
  bot.on('speak', function (data) {
    ttBotHandler.onChat(data)
  })
}

setupBot()
