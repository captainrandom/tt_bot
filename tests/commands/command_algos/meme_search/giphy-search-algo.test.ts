import { GiphySearchAlgo } from '../../../../src/commands/command_algos/meme_search/giphy-search-algo'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { SameLocationMessageWriter } from '../../../../src/message_writer/same-location-message-writer'
import { anything, instance, mock, when } from 'ts-mockito'

var sinon = require("sinon");


describe('searches giphy api', () => {
  const giphyMock: GiphyFetch = mock(GiphyFetch)
  sinon.stub(Math, 'random').returns(0.1);

  let subject
  beforeEach(() => {
    subject = new GiphySearchAlgo(instance(giphyMock), new SameLocationMessageWriter())
  })

  it('check spelling of command name', () => {
    expect(subject.commandName).toBe('giphy')
  })

  it('returns no gifs for random search query', async () => {
    let pmMsg: string
    let speakMsg: string
    const arg = 'adfinw'
    when(giphyMock.search(arg, anything())).thenResolve({
      data: []
    })

    await subject.executeCommand({
      cmbot: {
        bot: {
          pm: (msg: string) => {
            pmMsg = msg
          },
          speak: (msg: string) => {
            speakMsg = msg
          }
        }
      },
      pm: false,
      userid: '1234',
      arg
    })

    await expect(pmMsg).toBeUndefined()
    await expect(speakMsg).toBe('no gifs found for adfinw')
  })

  it('returns gifs', async () => {
    let pmMsg: string
    let speakMsg: string

    const arg = 'dog'
    when(giphyMock.search(arg, anything())).thenResolve({
      data: [
        {
          id: 'abcde'
        }
      ]
    })

    await subject.executeCommand({
      cmbot: {
        bot: {
          pm: (msg: string) => {
            pmMsg = msg
          },
          speak: (msg: string) => {
            speakMsg = msg
          }
        }
      },
      pm: false,
      userid: '1234',
      arg
    })

    await expect(pmMsg).toBeUndefined()
    await expect(speakMsg).toBe('https://media.giphy.com/media/abcde/giphy.gif')
  })

  it('makes useful help text', () => {
    const result = subject.getHelp()
    expect(result).toBe('queries a random gif by typing /giphy')
  })
})
