import { GiphySearchAlgo } from '../../../../src/commands/command_algos/meme_search/giphy-search-algo'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { anything, instance, mock, when } from 'ts-mockito'

var sinon = require("sinon");

describe('searches giphy api', () => {
  const giphyMock: GiphyFetch = mock(GiphyFetch)
  sinon.stub(Math, 'random').returns(0.1);

  let subject
  beforeEach(() => {
    subject = new GiphySearchAlgo(instance(giphyMock))
  })

  it('check spelling of command name', () => {
    expect(subject.commandName).toBe('giphy')
  })

  it('returns no gifs for random search query', async () => {
    const arg = 'adfinw'
    when(giphyMock.search(arg, anything())).thenResolve({
      data: []
    })

    const messages = await subject.executeCommand({
      pm: false,
      userid: '1234',
      arg
    })

    expect(messages).toStrictEqual([{
      text: 'no gifs found for adfinw',
      pm: false
    }])
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

    const messages = await subject.executeCommand({
      pm: false,
      userid: '1234',
      arg
    })

    expect(messages).toStrictEqual([{
      text: 'https://media.giphy.com/media/abcde/giphy.gif',
      pm: false
    }])
  })

  it('makes useful help text', () => {
    const result = subject.getHelp()
    expect(result).toBe('queries a random gif by typing /giphy <search terms>')
  })
})
