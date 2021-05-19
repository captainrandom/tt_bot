import {SameLocationMessageWriter} from "../message_writer/same-location-message-writer";
import {DefaultCommandFactory} from "../commands/command_helper/default-command-factory";
import {UrbanDictionaryDefinitionLookup} from "../commands/command_algos/definition_lookup/urban-dictionary-search";

const commandAlgo = new UrbanDictionaryDefinitionLookup(new SameLocationMessageWriter())

const commandFactory = new DefaultCommandFactory()
exports.customCommands = commandFactory.getCustomCommands('urbandict', commandAlgo)
