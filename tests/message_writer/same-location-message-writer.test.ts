import { SameLocationMessageWriter } from '../../src/message_writer/same-location-message-writer'

describe('searches giphy api', () => {
  let subject
  beforeEach(() => {
    subject = new SameLocationMessageWriter()
  })

  const msg = 'some-message'

  it('send private message', async () => {
    let pmMsg: string
    let speakMsg: string
    await subject.writeMessage(msg, {
      cmbot: {
        bot: {
          pm: (msg: string) => { pmMsg = msg },
          speak: (msg: string) => { speakMsg = msg }
        }
      },
      pm: true,
      userid: '1234',
      arg: 'adfinw'
    })
    expect(pmMsg).toBe(msg)
    expect(speakMsg).toBeUndefined()
  })

  it('send chat message', async () => {
    let pmMsg: string
    let speakMsg: string
    await subject.writeMessage(msg, {
      cmbot: {
        bot: {
          pm: (msg: string) => { pmMsg = msg },
          speak: (msg: string) => { speakMsg = msg }
        }
      },
      pm: false,
      userid: '1234',
      arg: 'adfinw'
    })
    expect(pmMsg).toBeUndefined()
    expect(speakMsg).toBe(msg)
  })
})
