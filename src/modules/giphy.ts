import { DefaultCommandFactory } from '../commands/command_helper/default-command-factory'
import { GiphySearchAlgo } from '../commands/command_algos/meme_search/giphy-search-algo'
import { SameLocationMessageWriter } from '../message_writer/same-location-message-writer'
import { GiphyFetch } from '@giphy/js-fetch-api'
import * as path from 'path'
import * as fs from 'fs'

const commandFactory = new DefaultCommandFactory()

const giphyKeyFile = path.join(__dirname, '../../giphy_key')
const giphyClient = new GiphyFetch(fs.readFileSync(giphyKeyFile, 'utf8'))

const messageWriter = new SameLocationMessageWriter()
const commandAlgo = new GiphySearchAlgo(giphyClient, messageWriter)
exports.customCommands = commandFactory.getCustomCommands('giphy', commandAlgo)
