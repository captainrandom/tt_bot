import { DefaultCommandFactory } from '../../../src/commands/command_helper/default-command-factory'
import { CommandArgs } from '../../../src/commands/command-args'

describe('searches giphy api', () => {
  it('command correctly', () => {
    const subject = new DefaultCommandFactory()
    const commandAlgo = {
      executeCommand: (x: CommandArgs) => {},
      getHelp: (commandName: string) => `this is a help message for ${commandName}`
    }

    const result = subject.getCustomCommands('custom-command', commandAlgo)
    expect(result).toStrictEqual({
      name: 'custom-command',
      command: commandAlgo.executeCommand,
      modonly: false,
      pmonly: false,
      hide: false,
      help: 'this is a help message for custom-command',
      acl: false
    })
  })
})
