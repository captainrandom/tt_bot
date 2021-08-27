import { SameLocationMessageWriter } from '../../../../src/message_writer/same-location-message-writer'
import { DadJokeCommand } from '../../../../src/commands/command_algos/dad_joke/dad-joke-command'
import { DadJokeApiClient } from '../../../../src/commands/command_algos/dad_joke/dad-joke-api-client'
import { instance, mock, resetCalls, when } from 'ts-mockito'

describe('test dad joke command', () => {
  const dadJokeClientMock: DadJokeApiClient = mock(DadJokeApiClient)
  let subject: DadJokeCommand
  beforeEach(async () => {
    when(dadJokeClientMock.getRandomJoke())
      .thenReturn(
        Promise.resolve('I gave all my dead batteries away today, free of charge.')
      )

    subject = new DadJokeCommand(new SameLocationMessageWriter(), instance(dadJokeClientMock))
  })

  afterEach(() => {
    resetCalls(dadJokeClientMock)
  })

  it('test command name is correct', () => {
    expect(subject.commandName).toBe('dadjoke')
  })

  it('when no args & public message', async () => {
    let pmMsg: string
    let speakMsg: string

    await subject.executeCommand({
      cmbot: {
        bot: {
          pm: (msg: string) => { pmMsg = msg },
          speak: (msg: string) => { speakMsg = msg }
        }
      },
      pm: false,
      userid: '1234',
      arg: ''
    })

    await expect(pmMsg).toBeUndefined()
    await expect(speakMsg).toBe('I gave all my dead batteries away today, free of charge.')
  })

  it('do nothing when private message', async () => {
    let pmMsg: string
    let speakMsg: string

    await subject.executeCommand({
      cmbot: {
        bot: {
          pm: (msg: string) => { pmMsg = msg },
          speak: (msg: string) => { speakMsg = msg }
        }
      },
      pm: true,
      userid: '1234',
      arg: ''
    })

    await expect(pmMsg).toBeUndefined()
    await expect(speakMsg).toBeUndefined()
  })

  it('call help message with command name', () => {
    const helpMsg = subject.getHelp()
    expect(helpMsg).toBe('/dadjoke returns a random dad joke')
  })
})
