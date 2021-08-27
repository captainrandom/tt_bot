import { CommandHelper } from '../../../src/commands/command_helper/command-helper'
import { SameLocationMessageWriter } from '../../../src/message_writer/same-location-message-writer'
import { DefaultCommandFactory } from '../../../src/commands/command_helper/default-command-factory'
import path from 'path'

describe('test command helper', () => {
  let subject: CommandHelper
  beforeEach(() => {
    // const messageWriter = new SameLocationMessageWriter()
    const giphyKeyFile = __dirname.split('tt_bot')[0] + 'tt_bot/giphy_api_key'
    subject = new CommandHelper(DefaultCommandFactory.getCommands(giphyKeyFile))
  })
  it('list commands', () => {
    expect(subject.listCommands()).toEqual([
      'stuff',
      'bla'
    ])
  })

  it('help for giphy', () => {
    expect(subject.commandHelp('/giphy')).toBe('bla')
  })

  it('determine if help called', () => {
    const words = '@popsicle help'
    expect(subject.isHelpCommand(words)).toEqual(true)
  })

  it('determine if help called with commands', () => {
    const words = '@popsicle commands'
    expect(subject.isHelpCommand(words)).toEqual(true)
  })

  it('not help called when proper command not specified', () => {
    const words = '@popsicle yo'
    expect(subject.isHelpCommand(words)).toEqual(false)
  })
})
