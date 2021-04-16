import {
  GiphySearchAlgo,
  SameLocationMessageWriter
} from '../../../../src/commands/command_algos/meme_search/giphy-search-algo'
import { GiphyFetch } from '@giphy/js-fetch-api'
import path from 'path'
import fs from 'fs'

const giphyKeyFile = path.join(__dirname, '../../../../giphy_api_key')
const giphApiKey = fs.readFileSync(giphyKeyFile, 'utf8')

describe('searches giphy api', () => {
  let subject
  beforeEach(() => {
    const giphy = new GiphyFetch(giphApiKey)
    subject = new GiphySearchAlgo(giphy, new SameLocationMessageWriter())
  })

  it('returns no gifs for random search query', async () => {
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
      arg: 'adfinw'
    })

    await expect(pmMsg).toBeUndefined()
    await expect(speakMsg).toBe('no gifs found for adfinw')
  })

  it('returns gifs', async () => {
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
      arg: 'dog'
    })

    await expect(pmMsg).toBeUndefined()
    await expect(speakMsg).toBe('no gifs found for adfinw')
  })

  it('makes useful help text', () => {
    const result = subject.getHelp('custom-command')
    expect(result).toBe('queries a random gif by typing /custom-command')
  })
})
