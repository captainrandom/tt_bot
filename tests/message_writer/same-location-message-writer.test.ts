import { SameLocationMessageWriter } from '../../src/message_writer/same-location-message-writer'
import { Bot } from '../../src/commands/command-args'

describe('searches giphy api', () => {
  let subject
  let pmMsg: string | undefined
  let speakMsg: string | undefined
  const bot: Bot = {
    pm: (msg: string) => { pmMsg = msg },
    speak: (msg: string) => { speakMsg = msg }
  }
  beforeEach(() => {
    pmMsg = speakMsg = undefined
    subject = new SameLocationMessageWriter(bot)
  })

  const message = 'some-message'

  it('send private message', async () => {
    await subject.writeMessage({
      text: message,
      pm: true
    })
    expect(pmMsg).toBe(message)
    expect(speakMsg).toBeUndefined()
  })

  it('send chat message', async () => {
    await subject.writeMessage({
      text: message,
      pm: false
    })
    expect(pmMsg).toBeUndefined()
    expect(speakMsg).toBe(message)
  })
})
