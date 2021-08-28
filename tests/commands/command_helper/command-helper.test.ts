import { CommandHelper } from '../../../src/commands/command_helper/command-helper'
import { UrbanDictionaryDefinitionLookup } from '../../../src/commands/command_algos/definition_lookup/urban-dictionary-search'
import { DadJokeCommand } from '../../../src/commands/command_algos/dad_joke/dad-joke-command'
import { CommandAlgo } from '../../../src/commands/command_algos/command-algo'

describe('test command helper', () => {
  let subject: CommandHelper
  beforeEach(() => {
    const urbandDictCmd = new UrbanDictionaryDefinitionLookup()
    const dadJokeCmd = DadJokeCommand.create()
    const commandsByKey = new Map<string, CommandAlgo>()
    commandsByKey.set(`/${urbandDictCmd.commandName}`, urbandDictCmd)
    commandsByKey.set(`/${dadJokeCmd.commandName}`, dadJokeCmd)
    subject = new CommandHelper(commandsByKey)
  })

  it('help message for dadjoke', () => {
    const words = '@popsicle help dadjoke'.split(' ')
    const options = { pm: false, userName: 'whocares' }
    expect(subject.getHelpMessage(words, options)).toEqual([{
      text: '/dadjoke returns a random dad joke',
      pm: false
    }])
  })

  it('list commands', () => {
    const words = '@popsicle help'.split(' ')
    const options = { pm: false, userName: 'whocares' }
    expect(subject.getHelpMessage(words, options)).toEqual([{
      text: '/dadjoke',
      pm: false
    },
    {
      text: '/urbandict',
      pm: false
    }
    ])
  })

  it('determine if help called', () => {
    const words = '@popsicle help'.split(' ')
    expect(subject.isHelpCommand(words)).toBe(true)
  })

  it('determine if help when empty message', () => {
    const words = ''.split(' ')
    expect(subject.isHelpCommand(words)).toBe(false)
  })

  it('determine if help called with commands', () => {
    const words = '@popsicle commands'.split(' ')
    expect(subject.isHelpCommand(words)).toEqual(true)
  })

  it('not help called when proper command not specified', () => {
    const words = '@popsicle yo'.split(' ')
    expect(subject.isHelpCommand(words)).toEqual(false)
  })
})
