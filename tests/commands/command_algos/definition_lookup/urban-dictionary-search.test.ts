import { UrbanDictionaryDefinitionLookup } from '../../../../src/commands/command_algos/definition_lookup/urban-dictionary-search'
import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

jest.mock('axios')

describe('test chuck noris joke', () => {
  let subject: UrbanDictionaryDefinitionLookup
  beforeEach(async () => {
    subject = new UrbanDictionaryDefinitionLookup()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const urbanDictionaryDataDir = path.join(__dirname, 'urban_dictionary_data')

  function readResultsJson (filename: string) {
    const resultsFilePath = path.join(urbanDictionaryDataDir, filename)
    return JSON.parse(fs.readFileSync(resultsFilePath, 'utf-8'))
  }

  it('check spelling of command name', () => {
    expect(subject.commandName).toBe('urbandict')
  })

  it('looks up definition with no search term', async () => {
    const term = ''
    const messages = await subject.executeCommand({
      pm: false,
      userid: '1234',
      arg: term
    })

    expect(axios.get.mock.calls).toHaveLength(0)
    expect(messages).toStrictEqual([{
      text: 'looks up first definition on urban dictionary using /urbandict <search terms>',
      pm: false
    }])
  })

  it('looks up definition raises exception on call', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(new Error('I like to throw')))

    const term = 'a'
    const messages = await subject.executeCommand({
      pm: false,
      userid: '1234',
      arg: term
    })

    expect(messages).toStrictEqual([{
      text: 'caught error while calling a',
      pm: false
    }])
  })

  it('looks up definition', async () => {
    const deendaResults = readResultsJson('deenda_results.json')
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: deendaResults }))

    const term = 'deenda'
    const messages = await subject.executeCommand({
      pm: false,
      userid: '1234',
      arg: term
    })

    expect(axios.get).toHaveBeenCalledWith('http://api.urbandictionary.com/v0/define', { params: { term: term } })
    expect(messages).toStrictEqual([
      {
        text: 'Definition: The word that comes after "of this dick"',
        pm: false
      },
      {
        text: 'Example: Me: Hey Daquan sit at deenda\n\nDaquan : deenda what?\r\nMe : deenda of this dick',
        pm: false
      },
      {
        text: 'http://deenda.urbanup.com/10559627',
        pm: false
      }
    ])
  })

  it('looks up definition when there are no results', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { list: [] } }))

    const term = 'something'
    const messages = await subject.executeCommand({
      pm: false,
      userid: '1234',
      arg: term
    })

    expect(axios.get).toHaveBeenCalledWith('http://api.urbandictionary.com/v0/define', { params: { term: term } })
    expect(messages).toStrictEqual([{
      text: `could not find any definitions for ${term}`,
      pm: false
    }])
  })

  it('when looking up definition calls correct url', async () => {
    const term = 'deenda'
    await subject.executeCommand({
      pm: false,
      userid: '1234',
      arg: term
    })

    expect(axios.get.mock.calls).toHaveLength(1)
    expect(axios.get).toHaveBeenCalledWith('http://api.urbandictionary.com/v0/define', { params: { term: term } })
  })

  it('help message', () => {
    const helpMessage = subject.getHelp()
    expect(helpMessage).toBe('looks up first definition on urban dictionary using /urbandict <search terms>')
  })
})
