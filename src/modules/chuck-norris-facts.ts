import { DefaultCommandFactory } from '../commands/command_helper/default-command-factory'
import { SameLocationMessageWriter } from '../message_writer/same-location-message-writer'
import { ChuckNorisApiAlgo } from '../commands/command_algos/chuck_norris/chuck-noris-api-algo'
import { ChuckNorrisClient } from '../commands/command_algos/chuck_norris/chuck-norris-client'

const messageWriter = new SameLocationMessageWriter()
const commandAlgo = new ChuckNorisApiAlgo(new ChuckNorrisClient(), messageWriter)

const commandFactory = new DefaultCommandFactory()
exports.customCommands = commandFactory.getCustomCommands('chuckfacts', commandAlgo)
