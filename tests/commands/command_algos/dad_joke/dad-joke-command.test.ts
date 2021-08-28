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

    subject = new DadJokeCommand(instance(dadJokeClientMock))
  })

  afterEach(() => {
    resetCalls(dadJokeClientMock)
  })

  it('test command name is correct', () => {
    expect(subject.commandName).toBe('dadjoke')
  })

  it('when no args & public message', async () => {
    const messages = await subject.executeCommand({
      pm: false,
      userid: '1234',
      arg: ''
    })

    expect(messages).toStrictEqual([{
      text: 'I gave all my dead batteries away today, free of charge.',
      pm: false
    }])
  })

  it('do nothing when private message', async () => {
    const messages = await subject.executeCommand({
      pm: true,
      userid: '1234',
      arg: ''
    })

    expect(messages).toStrictEqual([])
  })

  it('call help message with command name', () => {
    const helpMsg = subject.getHelp()
    expect(helpMsg).toBe('/dadjoke returns a random dad joke')
  })
})
