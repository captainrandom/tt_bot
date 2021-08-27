import { ChuckNorisApiAlgo } from '../../../../src/commands/command_algos/chuck_norris/chuck-noris-api-algo'
import { SameLocationMessageWriter } from '../../../../src/message_writer/same-location-message-writer'

describe('test chuck noris joke', () => {
  let subject: ChuckNorisApiAlgo
  beforeEach(async () => {
    subject = await ChuckNorisApiAlgo.create(new SameLocationMessageWriter())
  })

  it('test command name is correct', () => {
    expect(subject.commandName).toBe('chuckfacts')
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
    await expect(speakMsg).toBe('no gifs found for adfinw')
  })

  it('when you pass category & public message', async () => {
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
    await expect(speakMsg).toBe('no gifs found for adfinw')
  })

  it('call help message with command name', () => {
    const helpMsg = subject.getHelp()
    expect(helpMsg).toBe('/chuckfacts returns chuck norris facts')
  })
})
