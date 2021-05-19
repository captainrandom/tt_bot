import {SameLocationMessageWriter} from "../../../../src/message_writer/same-location-message-writer";
import {UrbanDictionaryDefinitionLookup} from "../../../../src/commands/command_algos/definition_lookup/urban-dictionary-search";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";

jest.mock('axios')

describe('test chuck noris joke', () => {
    let subject: UrbanDictionaryDefinitionLookup
    beforeEach(async () => {
        subject = new UrbanDictionaryDefinitionLookup(new SameLocationMessageWriter())
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const urbanDictionaryDataDir = path.join(__dirname, 'urban_dictionary_data')

    function readResultsJson(filename: string) {
        const resultsFilePath = path.join(urbanDictionaryDataDir, filename)
        return JSON.parse(fs.readFileSync(resultsFilePath, 'utf-8'))
    }


    it('looks up definition with no search term', async () => {
        let pmMsg: string
        let speakMsg: string

        const term = ''
        await subject.executeCommand({
            cmbot: {
                bot: {
                    pm: (msg: string) => { pmMsg = msg },
                    speak: (msg: string) => { speakMsg = msg }
                }
            },
            pm: false,
            userid: '1234',
            arg: term
        });

        expect(axios.get.mock.calls.length).toBe(0);
        await expect(pmMsg).toBeUndefined()
        await expect(speakMsg).toBe('looks up first definition on urban dictionary using /urbandict <search terms>')
    });

    it('looks up definition raises exception on call', async () => {
        let pmMsg: string
        let speakMsg: string

        axios.get.mockImplementationOnce(() => Promise.resolve(new Error('I like to throw')));

        const term = 'a'
        await subject.executeCommand({
            cmbot: {
                bot: {
                    pm: (msg: string) => { pmMsg = msg },
                    speak: (msg: string) => { speakMsg = msg }
                }
            },
            pm: false,
            userid: '1234',
            arg: term
        });

        await expect(pmMsg).toBeUndefined()
        await expect(speakMsg).toBe('caught error while calling a')
    });

    it('looks up definition', async () => {
        let pmMsg: [string]
        let speakMsg: [string] = []

        const deendaResults = readResultsJson('deenda_results.json')
        axios.get.mockImplementationOnce(() => Promise.resolve({data: deendaResults}));

        const term = 'deenda'
        await subject.executeCommand({
            cmbot: {
                bot: {
                    pm: (msg: string) => { pmMsg.push(msg) },
                    speak: (msg: string) => { speakMsg.push(msg) }
                }
            },
            pm: false,
            userid: '1234',
            arg: term
        });

        await expect(pmMsg).toBeUndefined()
        await expect(speakMsg).toEqual([
            "Definition: [The word] that comes after \"of [this dick]\"",
            "Example: Me: Hey [Daquan] [sit] at deenda\n\nDaquan : deenda what?\r\nMe : deenda of [this dick]"
        ])
        expect(axios.get).toHaveBeenCalledWith('http://api.urbandictionary.com/v0/define', { params: { term: term} });
    });


    it('looks up definition when there are no results', async () => {
        let pmMsg: string
        let speakMsg: string

        axios.get.mockImplementationOnce(() => Promise.resolve({data: { list: []}}));

        const term = 'something'
        await subject.executeCommand({
            cmbot: {
                bot: {
                    pm: (msg: string) => { pmMsg = msg },
                    speak: (msg: string) => { speakMsg = msg }
                }
            },
            pm: false,
            userid: '1234',
            arg: term
        });

        await expect(pmMsg).toBeUndefined()
        await expect(speakMsg).toBe(`could not find any definitions for ${term}`)
        expect(axios.get).toHaveBeenCalledWith('http://api.urbandictionary.com/v0/define', { params: { term: term} });
    });

    it('when looking up definition calls correct url', async () => {
        const term = 'deenda'
        await subject.executeCommand({
            cmbot: {
                bot: {
                    pm: (msg: string) => { },
                    speak: (msg: string) => { }
                }
            },
            pm: false,
            userid: '1234',
            arg: term
        });

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get).toHaveBeenCalledWith('http://api.urbandictionary.com/v0/define', { params: { term: term} });
    });

    it('help message', () => {
        const helpMessage = subject.getHelp('urbandict');
        expect(helpMessage).toBe('looks up first definition on urban dictionary using /urbandict <search terms>')
    })
})