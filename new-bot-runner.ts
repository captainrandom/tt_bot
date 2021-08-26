import path from 'path'
import { BotAuth, BotConfigs } from './src/bot-configs'
import { TTBotHandler } from './src/bot/tt_bot'
import { UrbanDictionaryDefinitionLookup } from './src/commands/command_algos/definition_lookup/urban-dictionary-search'
import { SameLocationMessageWriter } from './src/message_writer/same-location-message-writer'
import { GiphyFetch } from '@giphy/js-fetch-api'
import fs from 'fs'
import { GiphySearchAlgo } from './src/commands/command_algos/meme_search/giphy-search-algo'
var Bot = require('ttapi');

const botName = process.env.BOTNAME
if (botName === undefined || botName === '') {
  throw new Error('BOTNAME cannot be empty')
}

const botDir = path.join(__dirname, 'bots', botName)
const botHelper = new BotConfigs(botDir)
const botAuth = botHelper.botAuth()

const giphyKeyFile = path.join(__dirname, 'giphy_api_key')
const giphyKey = fs.readFileSync(giphyKeyFile, 'utf8').trim()
console.log(giphyKey)
const giphyClient = new GiphyFetch(giphyKey)

const messageWriter = new SameLocationMessageWriter()
const bot = new Bot(botAuth.auth, botAuth.userid, botAuth.roomid)
const ttBotHandler = new TTBotHandler(botAuth, bot, [
  {
    commandAlgo: new UrbanDictionaryDefinitionLookup(messageWriter),
    commandWord: 'urbandict'
  },
  {
    commandAlgo: new GiphySearchAlgo(giphyClient, messageWriter),
    commandWord: 'giphy'
  }
])

bot.on('ready', function (data) { ttBotHandler.onReady(data) })
bot.on('newsong', function (data) { ttBotHandler.onNewSong(data) })
bot.on('speak', function (data) { ttBotHandler.onChat(data) })
