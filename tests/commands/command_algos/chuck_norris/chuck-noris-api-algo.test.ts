import { ChuckNorisApiAlgo } from '../../../../src/commands/command_algos/chuck_norris/chuck-noris-api-algo'

describe('test chuck noris joke', () => {
  let subject: ChuckNorisApiAlgo
  beforeEach(async () => {
    subject = await ChuckNorisApiAlgo.create()
  })

  it('test command name is correct', () => {
    expect(subject.commandName).toBe('chuckfacts')
  })

  it('when no args & public message', async () => {
    const messages = await subject.executeCommand({
      pm: false,
      userid: '1234',
      arg: ''
    })

    expect(messages).toBe([{
      text: 'no gifs found for adfinw',
      pm: false
    }])
  })

  it('when you pass category & public message', async () => {
    const messages = await subject.executeCommand({
      pm: false,
      userid: '1234',
      arg: ''
    })

    expect(messages).toBe([{
      text: 'no gifs found for adfinw',
      pm: false
    }])
  })

  it('call help message with command name', () => {
    const helpMsg = subject.getHelp()
    expect(helpMsg).toBe('/chuckfacts returns chuck norris facts')
  })
})
